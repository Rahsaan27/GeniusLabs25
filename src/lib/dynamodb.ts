import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export const docClient = DynamoDBDocumentClient.from(client);

export const TABLE_NAMES = {
  MESSAGES: process.env.DYNAMODB_MESSAGES_TABLE || "genius-labs-messages"
} as const;