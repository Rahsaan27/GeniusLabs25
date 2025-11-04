import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const TABLE_NAME = process.env.DYNAMODB_ROLES_TABLE || "genius-labs-user-roles";

async function createRolesTable() {
  try {
    // Check if table exists
    try {
      await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
      console.log(`Table ${TABLE_NAME} already exists`);
      return;
    } catch (error: any) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
      }
    }

    // Create table
    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        {
          AttributeName: "email",
          KeyType: "HASH" // Primary key
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "email",
          AttributeType: "S"
        },
        {
          AttributeName: "role",
          AttributeType: "S"
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "RoleIndex",
          KeySchema: [
            {
              AttributeName: "role",
              KeyType: "HASH"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          }
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    });

    const result = await client.send(command);
    console.log(`Table ${TABLE_NAME} created successfully:`, result.TableDescription?.TableArn);
  } catch (error) {
    console.error("Error creating roles table:", error);
    throw error;
  }
}

createRolesTable();
