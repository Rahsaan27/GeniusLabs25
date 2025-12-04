import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const TABLE_NAME = process.env.DYNAMODB_ANNOUNCEMENTS_TABLE || "genius-labs-announcements";

async function createAnnouncementsTable() {
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
          AttributeName: "cohortId",
          KeyType: "HASH"
        },
        {
          AttributeName: "createdAt",
          KeyType: "RANGE"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "cohortId",
          AttributeType: "S"
        },
        {
          AttributeName: "createdAt",
          AttributeType: "S"
        },
        {
          AttributeName: "id",
          AttributeType: "S"
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "AnnouncementIdIndex",
          KeySchema: [
            {
              AttributeName: "id",
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
    console.error("Error creating table:", error);
    throw error;
  }
}

if (require.main === module) {
  createAnnouncementsTable()
    .then(() => {
      console.log("Announcements table creation completed");
      process.exit(0);
    })
    .catch(error => {
      console.error("Failed to create announcements table:", error);
      process.exit(1);
    });
}

export { createAnnouncementsTable };
