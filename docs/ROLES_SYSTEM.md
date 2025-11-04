# Roles System Documentation

## Overview

The GeniusLabs platform uses a role-based access control (RBAC) system to manage permissions across three user types: **Genius** (students), **Educator** (teachers), and **Admin** (administrators). Each role has specific permissions that control what features and content users can access.

---

## Table of Contents

1. [Role Definitions](#role-definitions)
2. [Permission System](#permission-system)
3. [Architecture](#architecture)
4. [How to Assign Roles](#how-to-assign-roles)
5. [Using Roles in Code](#using-roles-in-code)
6. [API Reference](#api-reference)
7. [Database Schema](#database-schema)

---

## Role Definitions

### 1. Genius (Student)
**Purpose:** Students learning on the platform

**Permissions:**
- ✅ Access all learning materials (modules, lessons, activities)
- ✅ Participate in cohort chat
- ✅ View their own progress
- ❌ Cannot make announcements
- ❌ Cannot edit user lists
- ❌ Cannot access admin features
- ❌ Cannot manage content

**Typical Use Cases:**
- Enrolled students in a cohort
- Individual learners
- Users following a learning path

---

### 2. Educator (Teacher/Instructor)
**Purpose:** Teachers managing cohorts and guiding students

**Permissions:**
- ✅ Everything a Genius can do
- ✅ Make announcements in their cohorts
- ✅ Edit user lists in their assigned cohorts
- ✅ Chat with students in their cohorts
- ✅ View student progress in their cohorts
- ❌ Cannot access all cohorts (only assigned ones)
- ❌ Cannot edit lesson/module content
- ❌ Cannot access admin panel
- ❌ Cannot manage system-wide settings

**Typical Use Cases:**
- Course instructors
- Teaching assistants
- Mentors assigned to specific cohorts

**Special Features:**
- Educators are assigned to specific cohorts via `cohortIds` array
- Can only interact with students in their assigned cohorts

---

### 3. Admin (Administrator)
**Purpose:** Platform administrators with full system access

**Permissions:**
- ✅ Everything an Educator can do
- ✅ Access ALL cohorts
- ✅ Edit and create lessons and modules
- ✅ Manage content throughout the platform
- ✅ Access the admin panel
- ✅ Manage users and assign roles
- ✅ View analytics across all users
- ✅ System-wide configuration

**Typical Use Cases:**
- Platform administrators
- Content creators
- System maintainers

---

## Permission System

### Complete Permission Matrix

| Permission | Genius | Educator | Admin |
|-----------|--------|----------|-------|
| `canAccessLearningMaterial` | ✅ | ✅ | ✅ |
| `canAccessCohort` | ✅ | ✅ | ✅ |
| `canChatInCohort` | ✅ | ✅ | ✅ |
| `canMakeAnnouncements` | ❌ | ✅ | ✅ |
| `canEditUserList` | ❌ | ✅ | ✅ |
| `canAccessAllCohorts` | ❌ | ❌ | ✅ |
| `canEditLessons` | ❌ | ❌ | ✅ |
| `canEditModules` | ❌ | ❌ | ✅ |
| `canManageContent` | ❌ | ❌ | ✅ |
| `canManageUsers` | ❌ | ❌ | ✅ |
| `canAssignRoles` | ❌ | ❌ | ✅ |
| `canAccessAdminPanel` | ❌ | ❌ | ✅ |
| `canViewAnalytics` | ❌ | ❌ | ✅ |

---

## Architecture

### File Structure

```
src/
├── types/
│   └── roles.ts              # Role type definitions and permissions
├── services/
│   └── user-roles.ts         # DynamoDB operations for roles
├── hooks/
│   └── useRole.ts            # React hook for role management
├── app/
│   └── api/
│       └── roles/
│           └── route.ts      # API endpoints for roles
└── components/
    └── RoleManagement.tsx    # Admin UI for managing roles
```

### Data Flow

```
User Login
    ↓
Authentication (AWS Cognito)
    ↓
Fetch User Role (from DynamoDB)
    ↓
Load Permissions (from ROLE_DEFINITIONS)
    ↓
Apply Permissions (via useRole hook)
    ↓
Render UI (show/hide features based on permissions)
```

---

## How to Assign Roles

### Method 1: Using the Admin Panel (Recommended)

1. **Login as an Admin**
   - Navigate to the Admin Panel
   - Click on the "Roles" tab

2. **Assign a Role**
   - Enter the user's email address
   - Select the role from the dropdown (Genius, Educator, or Admin)
   - *For Educators only:* Enter comma-separated cohort IDs
   - Click "Assign Role"

3. **Verify Assignment**
   - The user will appear in the "Current Role Assignments" section
   - The role will take effect immediately on their next login or page refresh

### Method 2: Using the API

**Endpoint:** `POST /api/roles`

**Request Body:**
```json
{
  "email": "user@example.com",
  "role": "educator",
  "cohortIds": ["cohort-1", "cohort-2"],  // Only for educators
  "assignedBy": "admin@example.com"       // Optional
}
```

**Response:**
```json
{
  "success": true,
  "mapping": {
    "email": "user@example.com",
    "role": "educator",
    "cohortIds": ["cohort-1", "cohort-2"],
    "assignedBy": "admin@example.com",
    "assignedAt": "2025-11-03T19:15:58.848Z"
  }
}
```

**Example with cURL:**
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@school.com",
    "role": "educator",
    "cohortIds": ["cohort-spring-2025"]
  }'
```

---

## Using Roles in Code

### In React Components

```typescript
import { useRole } from '@/hooks/useRole';

function MyComponent() {
  const { role, permissions, isAdmin, hasPermission } = useRole();

  // Check specific permission
  if (permissions?.canMakeAnnouncements) {
    return <AnnouncementButton />;
  }

  // Check if admin
  if (isAdmin) {
    return <AdminPanel />;
  }

  // Check role directly
  if (role === 'educator') {
    return <EducatorDashboard />;
  }

  // Use hasPermission helper
  if (hasPermission('canEditLessons')) {
    return <LessonEditor />;
  }

  return <StudentView />;
}
```

### Conditional Rendering Examples

**Hide feature for non-admins:**
```typescript
{isAdmin && (
  <button onClick={handleEditContent}>
    Edit Content
  </button>
)}
```

**Show different UI based on role:**
```typescript
{role === 'genius' && <StudentDashboard />}
{role === 'educator' && <EducatorDashboard />}
{role === 'admin' && <AdminDashboard />}
```

**Check specific permission:**
```typescript
{permissions?.canMakeAnnouncements && (
  <AnnouncementComposer />
)}
```

---

## API Reference

### GET /api/roles

**Description:** Get a user's role

**Query Parameters:**
- `email` (required): User's email address

**Response:**
```json
{
  "email": "user@example.com",
  "role": "genius"
}
```

**Example:**
```javascript
const response = await fetch('/api/roles?email=user@example.com');
const data = await response.json();
console.log(data.role); // "genius"
```

---

### POST /api/roles

**Description:** Assign a role to a user

**Request Body:**
```typescript
{
  email: string;           // User's email (required)
  role: UserRole;          // "genius" | "educator" | "admin" (required)
  cohortIds?: string[];    // Array of cohort IDs (only for educators)
  assignedBy?: string;     // Email of admin assigning the role
}
```

**Response:**
```json
{
  "success": true,
  "mapping": {
    "email": "user@example.com",
    "role": "educator",
    "cohortIds": ["cohort-1"],
    "assignedBy": "admin@example.com",
    "assignedAt": "2025-11-03T19:15:58.848Z"
  }
}
```

---

## Database Schema

### DynamoDB Table: `genius-labs-user-roles`

**Table Structure:**
- **Partition Key:** `email` (String)
- **Billing Mode:** Pay-per-request
- **Global Secondary Index:** `RoleIndex` on `role` attribute

**Item Structure:**
```json
{
  "email": "user@example.com",        // Primary key
  "role": "educator",                 // User's role
  "cohortIds": ["cohort-1"],          // Optional: assigned cohorts for educators
  "assignedBy": "admin@example.com",  // Optional: who assigned this role
  "assignedAt": "2025-11-03T19:15:58.848Z"  // Timestamp
}
```

**Query Examples:**

Get user's role:
```typescript
const role = await getUserRole('user@example.com');
```

Get all users with a specific role:
```typescript
const educators = await getUsersByRole('educator');
```

Get educator's cohorts:
```typescript
const cohorts = await getEducatorCohorts('teacher@example.com');
```

---

## Common Scenarios

### Scenario 1: Adding a New Student

```bash
# Assign Genius role
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newstudent@school.com",
    "role": "genius"
  }'
```

### Scenario 2: Promoting a Student to Educator

```bash
# Change role to educator and assign cohorts
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@school.com",
    "role": "educator",
    "cohortIds": ["cohort-fall-2025"],
    "assignedBy": "admin@school.com"
  }'
```

### Scenario 3: Checking Permissions in Code

```typescript
import { useRole } from '@/hooks/useRole';

function CohortPage() {
  const { permissions, role } = useRole();

  const canManage = permissions?.canEditUserList;
  const isEducator = role === 'educator';

  return (
    <div>
      <h1>Cohort Dashboard</h1>

      {/* All roles can view */}
      <StudentList />

      {/* Only educators and admins can manage */}
      {canManage && <ManageStudentsButton />}

      {/* Only educators and admins can announce */}
      {permissions?.canMakeAnnouncements && <AnnouncementForm />}
    </div>
  );
}
```

---

## Best Practices

### 1. Always Check Authentication First
```typescript
const { user, isAuthenticated } = useAuth();
const { role, permissions } = useRole();

if (!isAuthenticated) {
  return <LoginPrompt />;
}
```

### 2. Use Permission Checks, Not Role Checks
**❌ Bad:**
```typescript
if (role === 'admin' || role === 'educator') {
  // Show feature
}
```

**✅ Good:**
```typescript
if (permissions?.canMakeAnnouncements) {
  // Show feature
}
```

### 3. Handle Loading States
```typescript
const { role, permissions, loading } = useRole();

if (loading) {
  return <LoadingSpinner />;
}
```

### 4. Pre-Approve All Users
- All users should be assigned a role before they first log in
- Default behavior: Users without a role are treated as "genius"
- Admins should assign appropriate roles during user onboarding

---

## Troubleshooting

### Problem: User doesn't have a role assigned

**Solution:**
```bash
# Assign default Genius role
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "role": "genius"}'
```

### Problem: Educator can't access their cohort

**Solution:** Verify educator has cohortIds assigned
```bash
# Get current role
curl 'http://localhost:3000/api/roles?email=educator@example.com'

# Update with cohorts
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "educator@example.com",
    "role": "educator",
    "cohortIds": ["cohort-1", "cohort-2"]
  }'
```

### Problem: Role changes not reflecting immediately

**Solution:** User needs to refresh the page or log out/in again. The `useRole` hook fetches role on mount.

---

## Security Considerations

1. **Email-Based Assignment:** Roles are tied to email addresses, which must match AWS Cognito authentication
2. **Pre-Approval:** All users should be pre-approved and assigned roles before access
3. **Admin Protection:** Only admins can assign roles (enforce this in your API if needed)
4. **Cohort Isolation:** Educators can only access their assigned cohorts

---

## Future Enhancements

Potential improvements to consider:

1. **Dynamic Permissions:** Allow custom permission sets per user
2. **Role Hierarchy:** Support sub-roles (e.g., "Senior Educator", "Teaching Assistant")
3. **Temporary Roles:** Support time-limited role assignments
4. **Audit Logging:** Track all role changes with timestamps and reasons
5. **Bulk Assignment:** Import roles from CSV or integrate with student information systems

---

## Support

For questions or issues with the roles system:
- Check the [GitHub Issues](https://github.com/yourusername/geniuslabs/issues)
- Review the code in `/src/services/user-roles.ts`
- Consult the type definitions in `/src/types/roles.ts`
