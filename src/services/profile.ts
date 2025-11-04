import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { UserProfile, UserAchievement, ACHIEVEMENTS } from "@/types/profile";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const PROFILES_TABLE = process.env.DYNAMODB_USER_PROFILES_TABLE || "genius-labs-user-profiles";
const ACHIEVEMENTS_TABLE = process.env.DYNAMODB_USER_ACHIEVEMENTS_TABLE || "genius-labs-user-achievements";

// ==================== Profile Functions ====================

export async function getUserProfile(email: string): Promise<UserProfile | null> {
  try {
    const command = new GetCommand({
      TableName: PROFILES_TABLE,
      Key: { email },
    });

    const response = await docClient.send(command);
    return (response.Item as UserProfile) || null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
}

export async function createUserProfile(email: string, displayName?: string): Promise<UserProfile> {
  const now = new Date().toISOString();
  const profile: UserProfile = {
    email,
    displayName,
    totalLessonsCompleted: 0,
    totalModulesCompleted: 0,
    totalTimeSpent: 0,
    totalScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    emailNotifications: true,
    dailyReminders: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const command = new PutCommand({
      TableName: PROFILES_TABLE,
      Item: profile,
    });

    await docClient.send(command);
    return profile;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(
  email: string,
  updates: Partial<Omit<UserProfile, 'email' | 'createdAt'>>
): Promise<UserProfile> {
  try {
    // Build update expression
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updates).forEach(([key, value]) => {
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = value;
    });

    // Always update the updatedAt timestamp
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const command = new UpdateCommand({
      TableName: PROFILES_TABLE,
      Key: { email },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    return response.Attributes as UserProfile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function updateUserStats(
  email: string,
  stats: {
    lessonsCompleted?: number;
    modulesCompleted?: number;
    timeSpent?: number;
    score?: number;
    streak?: number;
  }
): Promise<UserProfile> {
  const updates: Partial<UserProfile> = {};

  if (stats.lessonsCompleted !== undefined) {
    updates.totalLessonsCompleted = stats.lessonsCompleted;
  }
  if (stats.modulesCompleted !== undefined) {
    updates.totalModulesCompleted = stats.modulesCompleted;
  }
  if (stats.timeSpent !== undefined) {
    updates.totalTimeSpent = stats.timeSpent;
  }
  if (stats.score !== undefined) {
    updates.totalScore = stats.score;
  }
  if (stats.streak !== undefined) {
    updates.currentStreak = stats.streak;
    // Update longest streak if current is higher
    const profile = await getUserProfile(email);
    if (profile && stats.streak > profile.longestStreak) {
      updates.longestStreak = stats.streak;
    }
  }

  updates.lastActivityDate = new Date().toISOString();

  return updateUserProfile(email, updates);
}

// ==================== Achievement Functions ====================

export async function getUserAchievements(email: string): Promise<UserAchievement[]> {
  try {
    const command = new QueryCommand({
      TableName: ACHIEVEMENTS_TABLE,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    });

    const response = await docClient.send(command);
    return (response.Items as UserAchievement[]) || [];
  } catch (error) {
    console.error("Error getting user achievements:", error);
    throw error;
  }
}

export async function unlockAchievement(
  email: string,
  achievementId: string
): Promise<UserAchievement> {
  const now = new Date().toISOString();
  const userAchievement: UserAchievement = {
    email,
    achievementId,
    unlockedAt: now,
  };

  try {
    const command = new PutCommand({
      TableName: ACHIEVEMENTS_TABLE,
      Item: userAchievement,
      ConditionExpression: "attribute_not_exists(achievementId)", // Don't unlock twice
    });

    await docClient.send(command);
    return userAchievement;
  } catch (error: any) {
    if (error.name === 'ConditionalCheckFailedException') {
      // Achievement already unlocked, return existing
      return userAchievement;
    }
    console.error("Error unlocking achievement:", error);
    throw error;
  }
}

export async function checkAndUnlockAchievements(
  email: string,
  profile: UserProfile
): Promise<UserAchievement[]> {
  const unlockedAchievements: UserAchievement[] = [];
  const existingAchievements = await getUserAchievements(email);
  const existingIds = new Set(existingAchievements.map(a => a.achievementId));

  for (const achievement of ACHIEVEMENTS) {
    // Skip if already unlocked
    if (existingIds.has(achievement.id)) {
      continue;
    }

    let shouldUnlock = false;

    switch (achievement.requirement.type) {
      case 'lessons_completed':
        shouldUnlock = profile.totalLessonsCompleted >= achievement.requirement.value;
        break;
      case 'modules_completed':
        shouldUnlock = profile.totalModulesCompleted >= achievement.requirement.value;
        break;
      case 'score':
        shouldUnlock = profile.totalScore >= achievement.requirement.value;
        break;
      case 'streak':
        shouldUnlock = profile.currentStreak >= achievement.requirement.value;
        break;
    }

    if (shouldUnlock) {
      try {
        const unlockedAchievement = await unlockAchievement(email, achievement.id);
        unlockedAchievements.push(unlockedAchievement);
      } catch (error) {
        console.error(`Error unlocking achievement ${achievement.id}:`, error);
      }
    }
  }

  return unlockedAchievements;
}

export async function getAchievementsWithStatus(email: string) {
  const userAchievements = await getUserAchievements(email);
  const unlockedIds = new Set(userAchievements.map(a => a.achievementId));

  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: unlockedIds.has(achievement.id),
    unlockedAt: userAchievements.find(a => a.achievementId === achievement.id)?.unlockedAt,
  }));
}
