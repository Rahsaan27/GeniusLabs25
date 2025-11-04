# GeniusLabs Role-Based Access Control (RBAC) Documentation

## 📋 Overview

GeniusLabs uses a role-based access control system to manage user permissions across the platform. Each user is assigned one of three roles based on their email address.

---

## 👥 User Roles

### 1. **Genius** (Student Role)
The default role for learners on the platform.

#### Privileges
- ✅ **Full access to all learning materials**
  - View all modules and lessons
  - Complete coding exercises
  - Take quizzes
  - Track personal progress

- ✅ **Cohort participation**
  - Join assigned cohort(s)
  - Send messages in cohort chat
  - View cohort announcements
  - Collaborate with peers

#### Restrictions
- ❌ Cannot make announcements in cohorts
- ❌ Cannot edit cohort member lists
- ❌ Cannot access other cohorts (only assigned ones)
- ❌ Cannot edit lesson content
- ❌ Cannot access admin features

---

### 2. **Educator** (Teacher Role)
Assigned to instructors who manage cohorts and guide students.

#### Privileges
- ✅ **Everything a Genius can do, PLUS:**

- ✅ **Cohort management** (for assigned cohorts)
  - Make announcements to the cohort
  - Send priority messages
  - Edit cohort member list (add/remove students)
  - Assign students to cohorts
  - View cohort analytics

- ✅ **Enhanced communication**
  - Create announcements
  - Pin important messages
  - Direct message cohort members

- ✅ **Analytics access**
  - View student progress in their cohorts
  - Track completion rates
  - Monitor engagement metrics

#### Restrictions
- ❌ Cannot access cohorts they don't manage
- ❌ Cannot edit lesson content or modules
- ❌ Cannot manage user roles
- ❌ Cannot access admin panel

---

### 3. **Admin** (Administrator Role)
Reserved for platform administrators with full system access.

#### Privileges
- ✅ **Everything an Educator can do, PLUS:**

- ✅ **Full cohort access**
  - Access ALL cohorts across the platform
  - Manage any cohort
  - Override cohort settings

- ✅ **Content management**
  - Edit lesson content
  - Modify modules
  - Add/remove/update lessons
  - Manage curriculum structure

- ✅ **User management**
  - Assign user roles
  - Manage user accounts
  - View all user data
  - Override user permissions

- ✅ **System administration**
  - Access admin panel
  - View platform-wide analytics
  - Configure system settings
  - Manage platform features

#### Full System Access
- ✅ All learning materials
- ✅ All cohorts
- ✅ All user data
- ✅ All content
- ✅ All analytics
- ✅ All configuration

---

## 🔐 Permission Matrix

| Permission | Genius | Educator | Admin |
|-----------|--------|----------|-------|
| **Learning Materials** |
| Access learning materials | ✅ | ✅ | ✅ |
| **Cohort Access** |
| Access assigned cohort(s) | ✅ | ✅ | ✅ |
| Chat in cohort | ✅ | ✅ | ✅ |
| Make announcements | ❌ | ✅ | ✅ |
| Edit user list | ❌ | ✅ | ✅ |
| Access all cohorts | ❌ | ❌ | ✅ |
| **Content Management** |
| Edit lessons | ❌ | ❌ | ✅ |
| Edit modules | ❌ | ❌ | ✅ |
| Manage content | ❌ | ❌ | ✅ |
| **User Management** |
| Manage users | ❌ | ❌ | ✅ |
| Assign roles | ❌ | ❌ | ✅ |
| **Admin Features** |
| Access admin panel | ❌ | ❌ | ✅ |
| View analytics | ❌ | ✅* | ✅ |

*Educators can only view analytics for their assigned cohorts

---

## 🎯 Role Assignment

### How Roles Are Assigned

Roles are assigned based on **email address** through a pre-approved database.

1. **Email-to-Role Mapping**: Each user's email is mapped to a role in DynamoDB
2. **Pre-Approval Required**: All users must be pre-approved before accessing the platform
3. **Admin Assignment**: Only administrators can assign or change roles

### Database Structure

```typescript
{
  email: "student@example.com",
  role: "genius",
  assignedBy: "admin@example.com",
  assignedAt: "2024-11-03T12:00:00Z",
  cohortIds: [] // For educators, which cohorts they manage
}
```

---

## 🛠️ For Administrators: Managing Roles

### Assigning a Role

#### Via API
```bash
POST /api/roles
Content-Type: application/json

{
  "email": "user@example.com",
  "role": "genius|educator|admin",
  "assignedBy": "admin@example.com",
  "cohortIds": ["cohort-1", "cohort-2"] // Optional, for educators
}
```

#### Response
```json
{
  "success": true,
  "mapping": {
    "email": "user@example.com",
    "role": "educator",
    "assignedBy": "admin@example.com",
    "assignedAt": "2024-11-03T12:00:00Z",
    "cohortIds": ["cohort-1"]
  }
}
```

### Checking a User's Role

```bash
GET /api/roles?email=user@example.com
```

Response:
```json
{
  "email": "user@example.com",
  "role": "educator"
}
```

### Getting All Role Mappings

```bash
GET /api/roles
```

Response:
```json
{
  "mappings": [
    {
      "email": "student1@example.com",
      "role": "genius",
      "assignedAt": "2024-11-03T12:00:00Z"
    },
    {
      "email": "teacher1@example.com",
      "role": "educator",
      "assignedAt": "2024-11-03T12:00:00Z",
      "cohortIds": ["cohort-1"]
    }
  ]
}
```

---

## 💻 For Developers: Using Roles in Code

### In React Components

```typescript
import { useRole } from '@/hooks/useRole';

function MyComponent() {
  const { role, permissions, isAdmin, hasPermission } = useRole();

  // Check role
  if (isAdmin) {
    return <AdminPanel />;
  }

  // Check specific permission
  if (hasPermission('canMakeAnnouncements')) {
    return <AnnouncementForm />;
  }

  // Use permissions object
  if (permissions.canEditUserList) {
    return <UserListEditor />;
  }

  return <DefaultView />;
}
```

### In API Routes

```typescript
import { getUserRole, hasPermission } from '@/services/user-roles';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  // Get user role
  const role = await getUserRole(email);

  // Check permission
  if (!hasPermission(role, 'canManageContent')) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  // Proceed with authorized action...
}
```

### Available Helper Functions

```typescript
// From @/services/user-roles
getUserRole(email: string): Promise<UserRole>
assignUserRole(email: string, role: UserRole, assignedBy?: string, cohortIds?: string[]): Promise<EmailRoleMapping>
getUsersByRole(role: UserRole): Promise<EmailRoleMapping[]>
getAllRoleMappings(): Promise<EmailRoleMapping[]>
hasRole(email: string, role: UserRole): Promise<boolean>
isAdmin(email: string): Promise<boolean>
isEducator(email: string): Promise<boolean>
getEducatorCohorts(email: string): Promise<string[]>

// From @/types/roles
getPermissions(role: UserRole): UserPermissions
hasPermission(role: UserRole, permission: keyof UserPermissions): boolean
```

---

## 🔧 Setup Instructions

### 1. Create DynamoDB Table

Run the table creation script:

```bash
npm run create-roles-table
# or
npx tsx scripts/create-roles-table.ts
```

This creates a table named `genius-labs-user-roles` with:
- Primary key: `email`
- GSI: `RoleIndex` on `role` attribute

### 2. Set Environment Variables

Add to your `.env.local`:

```bash
DYNAMODB_ROLES_TABLE=genius-labs-user-roles
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 3. Assign Initial Admin

Use the API to assign the first admin:

```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-admin@example.com",
    "role": "admin"
  }'
```

---

## 🎓 Best Practices

### For Administrators

1. **Start with Genius**: Assign new users as "genius" by default
2. **Promote Carefully**: Only assign educator/admin roles to trusted individuals
3. **Use Cohort IDs**: When assigning educator role, specify which cohorts they manage
4. **Audit Regularly**: Review role assignments periodically
5. **Document Changes**: Keep track of who assigned roles and when

### For Developers

1. **Always Check Permissions**: Never assume a user has a permission
2. **Fail Gracefully**: Show appropriate error messages for insufficient permissions
3. **Use the Hook**: Use `useRole()` hook in frontend components
4. **Backend Validation**: Always validate permissions on the server side, not just client side
5. **Type Safety**: Use TypeScript types from `@/types/roles`

### For Educators

1. **Scope Awareness**: Remember you can only manage assigned cohorts
2. **Announcements**: Use announcements sparingly for important information
3. **User Management**: Only add/remove users from your cohorts
4. **Analytics**: Use cohort analytics to track student progress

---

## 🚨 Security Considerations

1. **Server-Side Validation**: Always validate permissions on the server
2. **Email Verification**: Ensure emails are verified before role assignment
3. **Role Changes**: Log all role changes for audit purposes
4. **Default Role**: New users default to "genius" for safety
5. **Admin Protection**: Require additional authentication for admin actions

---

## 📞 Support

For questions about roles and permissions:
- Contact your administrator to request role changes
- Administrators can assign roles via the API
- Technical issues: Refer to the technical documentation

---

## 📝 Version History

**Version 1.0** (November 2024)
- Initial role system implementation
- Three roles: Genius, Educator, Admin
- Email-based role assignment
- DynamoDB backend

---

Last Updated: November 3, 2024
