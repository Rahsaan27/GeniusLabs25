# DynamoDB Setup Guide

## Creating the UserProgress Table

You can create your own table in the shared DynamoDB instance. Follow these steps:

### 1. Create Table via AWS Console

1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Click **"Create table"**
3. Configure the table:
   - **Table name**: `genius-labs-user-progress` (or any name you prefer)
   - **Partition key**: `userId` (String)
   - **Sort key**: `moduleId` (String)
   - **Table settings**: Use default settings or customize as needed
   - **Read/Write capacity**: On-demand (recommended) or Provisioned
4. Click **"Create table"**

### 2. Environment Variables

Create or update your `.env.local` file:

```env
# AWS Configuration
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# DynamoDB Tables
DYNAMODB_USER_PROGRESS_TABLE=genius-labs-user-progress
DYNAMODB_MESSAGES_TABLE=genius-labs-messages
```

### 3. Table Schema

**Table Name**: `genius-labs-user-progress`

**Primary Key**:
- Partition Key: `userId` (String) - User's email or unique ID
- Sort Key: `moduleId` (String) - Module identifier

**Attributes** (all optional, DynamoDB is schemaless):
- `lessonsCompleted`: List of String - Array of completed lesson IDs
- `currentLesson`: String - Current lesson in progress
- `moduleProgress`: Number - Percentage completion (0-100)
- `isCompleted`: Boolean - Whether module is completed
- `completedAt`: String - ISO timestamp of completion
- `quizScores`: Map - Quiz ID to score mapping
- `exercisesCompleted`: Map - Exercise ID to completion status
- `startedAt`: String - ISO timestamp when started
- `lastAccessedAt`: String - ISO timestamp of last access
- `updatedAt`: String - ISO timestamp of last update
- `timeSpent`: Number - Total time spent in minutes
- `notes`: String - User's personal notes

## API Endpoints

### 1. Get All User Progress
```http
GET /api/user-progress?userId=user@example.com
```

### 2. Create Progress Record
```http
POST /api/user-progress
Content-Type: application/json

{
  "userId": "user@example.com",
  "moduleId": "javascript-basics",
  "currentLesson": "lesson-1"
}
```

### 3. Get Module Progress
```http
GET /api/user-progress/javascript-basics?userId=user@example.com
```

### 4. Update Module Progress
```http
PATCH /api/user-progress/javascript-basics
Content-Type: application/json

{
  "userId": "user@example.com",
  "moduleProgress": 50,
  "currentLesson": "lesson-5",
  "lessonsCompleted": ["lesson-1", "lesson-2", "lesson-3", "lesson-4"]
}
```

### 5. Mark Lesson as Completed
```http
POST /api/user-progress/javascript-basics/lesson
Content-Type: application/json

{
  "userId": "user@example.com",
  "lessonId": "lesson-1"
}
```

### 6. Update Quiz Score
```http
POST /api/user-progress/javascript-basics/quiz
Content-Type: application/json

{
  "userId": "user@example.com",
  "quizId": "quiz-1",
  "score": 85
}
```

## Example Usage in Frontend

```typescript
// Create progress when user starts a module
const createProgress = async (userId: string, moduleId: string) => {
  const response = await fetch('/api/user-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, moduleId })
  });
  return response.json();
};

// Get user's progress for a module
const getModuleProgress = async (userId: string, moduleId: string) => {
  const response = await fetch(
    `/api/user-progress/${moduleId}?userId=${userId}`
  );
  return response.json();
};

// Mark lesson as completed
const completeLesson = async (userId: string, moduleId: string, lessonId: string) => {
  const response = await fetch(`/api/user-progress/${moduleId}/lesson`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, lessonId })
  });
  return response.json();
};

// Update quiz score
const submitQuizScore = async (
  userId: string,
  moduleId: string,
  quizId: string,
  score: number
) => {
  const response = await fetch(`/api/user-progress/${moduleId}/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, quizId, score })
  });
  return response.json();
};
```

## Testing the API

You can test the API using curl:

```bash
# Create progress
curl -X POST http://localhost:3001/api/user-progress \
  -H "Content-Type: application/json" \
  -d '{"userId":"test@example.com","moduleId":"javascript-basics"}'

# Get progress
curl "http://localhost:3001/api/user-progress?userId=test@example.com"

# Mark lesson completed
curl -X POST http://localhost:3001/api/user-progress/javascript-basics/lesson \
  -H "Content-Type: application/json" \
  -d '{"userId":"test@example.com","lessonId":"lesson-1"}'
```

## Notes

- Yes, you can create your own tables in the shared DynamoDB instance - each developer can have their own tables
- Make sure your AWS credentials have the necessary DynamoDB permissions
- The table uses on-demand billing by default (pay per request)
- All timestamps are stored in ISO 8601 format
- The API automatically updates `lastAccessedAt` and `updatedAt` on every update
