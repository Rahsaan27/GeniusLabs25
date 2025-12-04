import { GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAMES } from "@/lib/dynamodb";
import { UserProgress, CreateUserProgressInput, UpdateUserProgressInput } from "@/types/user-progress";

/**
 * Create new user progress record for a module
 */
export async function createUserProgress(input: CreateUserProgressInput): Promise<UserProgress> {
  const now = new Date().toISOString();

  const userProgress: UserProgress = {
    userId: input.userId,
    moduleId: input.moduleId,
    lessonsCompleted: [],
    currentLesson: input.currentLesson,
    moduleProgress: 0,
    isCompleted: false,
    startedAt: now,
    lastAccessedAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAMES.USER_PROGRESS,
      Item: userProgress,
    })
  );

  return userProgress;
}

/**
 * Get user's progress for a specific module
 */
export async function getUserProgress(userId: string, moduleId: string): Promise<UserProgress | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAMES.USER_PROGRESS,
      Key: {
        userId,
        moduleId,
      },
    })
  );

  return result.Item as UserProgress || null;
}

/**
 * Get all progress for a user across all modules
 */
export async function getAllUserProgress(userId: string): Promise<UserProgress[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAMES.USER_PROGRESS,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );

  return (result.Items as UserProgress[]) || [];
}

/**
 * Update user's progress for a module
 */
export async function updateUserProgress(input: UpdateUserProgressInput): Promise<UserProgress> {
  const now = new Date().toISOString();

  // Build update expression dynamically
  const updateExpressions: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, any> = {
    ":lastAccessedAt": now,
    ":updatedAt": now,
  };

  updateExpressions.push("#lastAccessedAt = :lastAccessedAt");
  updateExpressions.push("#updatedAt = :updatedAt");
  expressionAttributeNames["#lastAccessedAt"] = "lastAccessedAt";
  expressionAttributeNames["#updatedAt"] = "updatedAt";

  if (input.lessonsCompleted !== undefined) {
    updateExpressions.push("#lessonsCompleted = :lessonsCompleted");
    expressionAttributeNames["#lessonsCompleted"] = "lessonsCompleted";
    expressionAttributeValues[":lessonsCompleted"] = input.lessonsCompleted;
  }

  if (input.currentLesson !== undefined) {
    updateExpressions.push("#currentLesson = :currentLesson");
    expressionAttributeNames["#currentLesson"] = "currentLesson";
    expressionAttributeValues[":currentLesson"] = input.currentLesson;
  }

  if (input.moduleProgress !== undefined) {
    updateExpressions.push("#moduleProgress = :moduleProgress");
    expressionAttributeNames["#moduleProgress"] = "moduleProgress";
    expressionAttributeValues[":moduleProgress"] = input.moduleProgress;
  }

  if (input.isCompleted !== undefined) {
    updateExpressions.push("#isCompleted = :isCompleted");
    expressionAttributeNames["#isCompleted"] = "isCompleted";
    expressionAttributeValues[":isCompleted"] = input.isCompleted;

    if (input.isCompleted) {
      updateExpressions.push("#completedAt = :completedAt");
      expressionAttributeNames["#completedAt"] = "completedAt";
      expressionAttributeValues[":completedAt"] = now;
    }
  }

  if (input.quizScores !== undefined) {
    updateExpressions.push("#quizScores = :quizScores");
    expressionAttributeNames["#quizScores"] = "quizScores";
    expressionAttributeValues[":quizScores"] = input.quizScores;
  }

  if (input.exercisesCompleted !== undefined) {
    updateExpressions.push("#exercisesCompleted = :exercisesCompleted");
    expressionAttributeNames["#exercisesCompleted"] = "exercisesCompleted";
    expressionAttributeValues[":exercisesCompleted"] = input.exercisesCompleted;
  }

  if (input.timeSpent !== undefined) {
    updateExpressions.push("#timeSpent = :timeSpent");
    expressionAttributeNames["#timeSpent"] = "timeSpent";
    expressionAttributeValues[":timeSpent"] = input.timeSpent;
  }

  if (input.notes !== undefined) {
    updateExpressions.push("#notes = :notes");
    expressionAttributeNames["#notes"] = "notes";
    expressionAttributeValues[":notes"] = input.notes;
  }

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAMES.USER_PROGRESS,
      Key: {
        userId: input.userId,
        moduleId: input.moduleId,
      },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as UserProgress;
}

/**
 * Mark a lesson as completed
 */
export async function markLessonCompleted(
  userId: string,
  moduleId: string,
  lessonId: string
): Promise<UserProgress> {
  const currentProgress = await getUserProgress(userId, moduleId);

  if (!currentProgress) {
    throw new Error("User progress not found. Create progress record first.");
  }

  const lessonsCompleted = currentProgress.lessonsCompleted || [];

  // Only add if not already completed
  if (!lessonsCompleted.includes(lessonId)) {
    lessonsCompleted.push(lessonId);
  }

  return updateUserProgress({
    userId,
    moduleId,
    lessonsCompleted,
  });
}

/**
 * Update quiz score
 */
export async function updateQuizScore(
  userId: string,
  moduleId: string,
  quizId: string,
  score: number
): Promise<UserProgress> {
  const currentProgress = await getUserProgress(userId, moduleId);

  if (!currentProgress) {
    throw new Error("User progress not found. Create progress record first.");
  }

  const quizScores = currentProgress.quizScores || {};
  quizScores[quizId] = score;

  return updateUserProgress({
    userId,
    moduleId,
    quizScores,
  });
}

/**
 * Delete user's progress for a specific module
 */
export async function deleteUserProgress(userId: string, moduleId: string): Promise<void> {
  const { DeleteCommand } = await import("@aws-sdk/lib-dynamodb");

  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAMES.USER_PROGRESS,
      Key: {
        userId,
        moduleId,
      },
    })
  );
}
