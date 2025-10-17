import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const TABLE_NAME = process.env.DYNAMODB_MESSAGES_TABLE || "genius-labs-messages";

async function createMessagesTable() {
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
          AttributeName: "timestamp", 
          KeyType: "RANGE"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "cohortId",
          AttributeType: "S"
        },
        {
          AttributeName: "timestamp",
          AttributeType: "N"
        },
        {
          AttributeName: "userId",
          AttributeType: "S"
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "UserIndex",
          KeySchema: [
            {
              AttributeName: "userId",
              KeyType: "HASH"
            },
            {
              AttributeName: "timestamp",
              KeyType: "RANGE"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          BillingMode: "PAY_PER_REQUEST"
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
  createMessagesTable()
    .then(() => console.log("Table creation completed"))
    .catch(console.error);
}

export { createMessagesTable };