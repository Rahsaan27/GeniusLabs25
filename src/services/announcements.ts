import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { Announcement } from "@/types/cohort";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_ANNOUNCEMENTS_TABLE || "genius-labs-announcements";

export interface CreateAnnouncementInput {
  cohortId: string;
  title: string;
  content: string;
  createdBy: string;
  priority?: 'low' | 'medium' | 'high';
}

/**
 * Create a new announcement
 */
export async function createAnnouncement(input: CreateAnnouncementInput): Promise<Announcement> {
  const now = new Date().toISOString();
  const id = `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const announcement: Announcement = {
    id,
    cohortId: input.cohortId,
    title: input.title,
    content: input.content,
    createdBy: input.createdBy,
    createdAt: new Date(now),
    priority: input.priority || 'medium',
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        ...announcement,
        createdAt: now, // Store as ISO string for DynamoDB
      },
    })
  );

  return announcement;
}

/**
 * Get all announcements for a cohort
 */
export async function getAnnouncementsByCohort(
  cohortId: string,
  limit: number = 50
): Promise<Announcement[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "cohortId = :cohortId",
      ExpressionAttributeValues: {
        ":cohortId": cohortId,
      },
      Limit: limit,
      ScanIndexForward: false, // Most recent first
    })
  );

  return (result.Items || []).map(item => ({
    ...item,
    createdAt: new Date(item.createdAt),
  })) as Announcement[];
}

/**
 * Delete an announcement
 */
export async function deleteAnnouncement(
  cohortId: string,
  createdAt: string
): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        cohortId,
        createdAt,
      },
    })
  );
}
