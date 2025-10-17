import { PutCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAMES } from "./dynamodb";
import { Message, CreateMessageInput } from "@/types/message";
import { v4 as uuidv4 } from "uuid";

export class MessageService {
  static async createMessage(input: CreateMessageInput): Promise<Message> {
    const now = new Date();
    const message: Message = {
      id: uuidv4(),
      cohortId: input.cohortId,
      userId: input.userId,
      userName: input.userName,
      content: input.content,
      timestamp: Date.now(),
      createdAt: now.toISOString(),
      type: input.type || 'message',
      isAdminMessage: input.isAdminMessage || false,
    };

    const command = new PutCommand({
      TableName: TABLE_NAMES.MESSAGES,
      Item: message,
    });

    await docClient.send(command);
    return message;
  }

  static async getMessagesByCohort(cohortId: string, limit = 50): Promise<Message[]> {
    const command = new QueryCommand({
      TableName: TABLE_NAMES.MESSAGES,
      KeyConditionExpression: "cohortId = :cohortId",
      ExpressionAttributeValues: {
        ":cohortId": cohortId,
      },
      ScanIndexForward: false, // Latest messages first
      Limit: limit,
    });

    const result = await docClient.send(command);
    return (result.Items as Message[]) || [];
  }

  static async getMessagesByUser(userId: string, limit = 50): Promise<Message[]> {
    const command = new QueryCommand({
      TableName: TABLE_NAMES.MESSAGES,
      IndexName: "UserIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
      ScanIndexForward: false,
      Limit: limit,
    });

    const result = await docClient.send(command);
    return (result.Items as Message[]) || [];
  }

  static async updateMessage(
    cohortId: string,
    timestamp: number,
    content: string
  ): Promise<void> {
    const command = new UpdateCommand({
      TableName: TABLE_NAMES.MESSAGES,
      Key: {
        cohortId,
        timestamp,
      },
      UpdateExpression: "SET content = :content, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":content": content,
        ":updatedAt": new Date().toISOString(),
      },
    });

    await docClient.send(command);
  }

  static async deleteMessage(cohortId: string, timestamp: number): Promise<void> {
    const command = new DeleteCommand({
      TableName: TABLE_NAMES.MESSAGES,
      Key: {
        cohortId,
        timestamp,
      },
    });

    await docClient.send(command);
  }
}