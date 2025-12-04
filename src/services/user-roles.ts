import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { UserRole, DEFAULT_ROLE, EmailRoleMapping, getRoleFromEmail } from "@/types/roles";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_ROLES_TABLE || "genius-labs-user-roles";

/**
 * Get user role by email
 * First checks DynamoDB, then falls back to email-based detection
 */
export async function getUserRole(email: string): Promise<UserRole> {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { email }
    });

    const response = await docClient.send(command);

    if (response.Item) {
      return response.Item.role as UserRole;
    }

    // If not in database, determine role from email and auto-assign
    const detectedRole = getRoleFromEmail(email);

    // Auto-assign the detected role
    await assignUserRole(email, detectedRole, 'system-auto-assignment');

    return detectedRole;
  } catch (error) {
    console.error("Error getting user role:", error);
    // Fallback to email-based detection if DB fails
    return getRoleFromEmail(email);
  }
}

/**
 * Assign role to user
 */
export async function assignUserRole(
  email: string,
  role: UserRole,
  assignedBy?: string,
  cohortIds?: string[]
): Promise<EmailRoleMapping> {
  try {
    const mapping: EmailRoleMapping = {
      email,
      role,
      assignedBy,
      assignedAt: new Date().toISOString(),
      cohortIds
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: mapping
    });

    await docClient.send(command);
    return mapping;
  } catch (error) {
    console.error("Error assigning user role:", error);
    throw error;
  }
}

/**
 * Get all users with a specific role
 */
export async function getUsersByRole(role: UserRole): Promise<EmailRoleMapping[]> {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "RoleIndex",
      KeyConditionExpression: "#role = :role",
      ExpressionAttributeNames: {
        "#role": "role"
      },
      ExpressionAttributeValues: {
        ":role": role
      }
    });

    const response = await docClient.send(command);
    return (response.Items || []) as EmailRoleMapping[];
  } catch (error) {
    console.error("Error getting users by role:", error);
    return [];
  }
}

/**
 * Get all role mappings
 */
export async function getAllRoleMappings(): Promise<EmailRoleMapping[]> {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME
    });

    const response = await docClient.send(command);
    return (response.Items || []) as EmailRoleMapping[];
  } catch (error) {
    console.error("Error getting all role mappings:", error);
    return [];
  }
}

/**
 * Check if email has a specific role
 */
export async function hasRole(email: string, role: UserRole): Promise<boolean> {
  const userRole = await getUserRole(email);
  return userRole === role;
}

/**
 * Check if email is admin
 */
export async function isAdmin(email: string): Promise<boolean> {
  return await hasRole(email, 'admin');
}

/**
 * Check if email is educator
 */
export async function isEducator(email: string): Promise<boolean> {
  return await hasRole(email, 'educator');
}

/**
 * Get cohorts managed by an educator
 */
export async function getEducatorCohorts(email: string): Promise<string[]> {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { email }
    });

    const response = await docClient.send(command);

    if (response.Item && response.Item.cohortIds) {
      return response.Item.cohortIds as string[];
    }

    return [];
  } catch (error) {
    console.error("Error getting educator cohorts:", error);
    return [];
  }
}
