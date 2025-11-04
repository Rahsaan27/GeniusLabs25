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

const PROFILES_TABLE = process.env.DYNAMODB_USER_PROFILES_TABLE || "genius-labs-user-profiles";
const ACHIEVEMENTS_TABLE = process.env.DYNAMODB_USER_ACHIEVEMENTS_TABLE || "genius-labs-user-achievements";

async function createProfilesTable() {
  try {
    // Check if table exists
    try {
      await client.send(new DescribeTableCommand({ TableName: PROFILES_TABLE }));
      console.log(`Table ${PROFILES_TABLE} already exists`);
      return;
    } catch (error: any) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
      }
    }

    // Create table
    const command = new CreateTableCommand({
      TableName: PROFILES_TABLE,
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
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    });

    const result = await client.send(command);
    console.log(`Table ${PROFILES_TABLE} created successfully:`, result.TableDescription?.TableArn);
  } catch (error) {
    console.error("Error creating profiles table:", error);
    throw error;
  }
}

async function createAchievementsTable() {
  try {
    // Check if table exists
    try {
      await client.send(new DescribeTableCommand({ TableName: ACHIEVEMENTS_TABLE }));
      console.log(`Table ${ACHIEVEMENTS_TABLE} already exists`);
      return;
    } catch (error: any) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
      }
    }

    // Create table with composite key
    const command = new CreateTableCommand({
      TableName: ACHIEVEMENTS_TABLE,
      KeySchema: [
        {
          AttributeName: "email",
          KeyType: "HASH" // Partition key
        },
        {
          AttributeName: "achievementId",
          KeyType: "RANGE" // Sort key
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "email",
          AttributeType: "S"
        },
        {
          AttributeName: "achievementId",
          AttributeType: "S"
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    });

    const result = await client.send(command);
    console.log(`Table ${ACHIEVEMENTS_TABLE} created successfully:`, result.TableDescription?.TableArn);
  } catch (error) {
    console.error("Error creating achievements table:", error);
    throw error;
  }
}

async function createAllTables() {
  await createProfilesTable();
  await createAchievementsTable();
  console.log("All profile tables created successfully!");
}

createAllTables();
