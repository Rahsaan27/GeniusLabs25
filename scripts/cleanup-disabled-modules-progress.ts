import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
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

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_USER_PROGRESS_TABLE || "genius-labs-user-progress";

// List of disabled (comingSoon) module IDs
const DISABLED_MODULES = [
  "python-basics",
  "html-css-basics",
  "social-entrepreneurship"
];

async function cleanupDisabledModulesProgress() {
  try {
    console.log("Scanning for progress records with disabled modules...");

    // Scan the table to find all progress records
    const scanResult = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    const items = scanResult.Items || [];
    console.log(`Found ${items.length} total progress records`);

    // Filter for disabled modules
    const itemsToDelete = items.filter(item =>
      DISABLED_MODULES.includes(item.moduleId)
    );

    console.log(`Found ${itemsToDelete.length} progress records for disabled modules`);

    if (itemsToDelete.length === 0) {
      console.log("No progress records to delete");
      return;
    }

    // Delete each record
    let deletedCount = 0;
    for (const item of itemsToDelete) {
      try {
        await docClient.send(
          new DeleteCommand({
            TableName: TABLE_NAME,
            Key: {
              userId: item.userId,
              moduleId: item.moduleId,
            },
          })
        );
        deletedCount++;
        console.log(`Deleted progress for user ${item.userId}, module ${item.moduleId}`);
      } catch (error) {
        console.error(`Error deleting progress for user ${item.userId}, module ${item.moduleId}:`, error);
      }
    }

    console.log(`\nCleanup complete!`);
    console.log(`Deleted ${deletedCount} out of ${itemsToDelete.length} progress records`);
  } catch (error) {
    console.error("Error during cleanup:", error);
    throw error;
  }
}

if (require.main === module) {
  cleanupDisabledModulesProgress()
    .then(() => {
      console.log("\nScript completed successfully");
      process.exit(0);
    })
    .catch(error => {
      console.error("\nScript failed:", error);
      process.exit(1);
    });
}

export { cleanupDisabledModulesProgress };
