# Role-Based Access Control (RBAC) Implementation

## Overview
This document describes the complete role-based access control system implemented for GeniusLabs.

## Role Types

### 1. **Student** (`student`)
- Default role for most users
- **NO cohort access** - students can only access learning modules
- Can view their own progress
- Cannot join cohorts
- Cannot make announcements
- Cannot edit content
- Limited to learning materials only

**Auto-assignment**: Emails containing "student" get this role OR default for any email

### 2. **Genius** (`genius`)
- Genius Labs student with full platform features
- Requires password to join cohorts
- Can access learning materials
- **Can access and chat in cohorts**
- Cannot make announcements
- Cannot edit content
- Same privileges as the previous student role

**Auto-assignment**: Emails containing "genius" get this role

### 3. **Educator** (`educator`)
- Can make announcements in cohorts
- Can access cohorts they manage (currently all cohorts)
- Can view analytics
- Cannot edit lessons/modules globally
- Requires password for cohorts they don't manage

**Auto-assignment**: Emails containing "educator" get this role

### 4. **Admin** (`admin`)
- Full access to all cohorts (no password required)
- Can make announcements
- Can edit lessons and modules
- Can manage users and assign roles
- Access to admin panel
- Can view all analytics

**Auto-assignment**: Emails containing "admin" get this role

### 5. **Super Admin** (`superadmin`)
- Ultimate access to everything
- Same permissions as admin
- Reserved for platform owner

**Auto-assignment**:
- Email contains "rahsaanyj"
- Email is "rahsaan@geniuslabs.com"
- You also have admin role assigned

## Key Features Implemented

### 1. Email-Based Role Detection
Location: [src/types/roles.ts](src/types/roles.ts#L196)

```typescript
function getRoleFromEmail(email: string): UserRole {
  // Checks email content to determine role
  // Priority: Superadmin > Admin > Educator > Genius > Student
}
```

### 2. Automatic Role Assignment
Location: [src/services/user-roles.ts](src/services/user-roles.ts#L20)

When a user logs in, their role is:
1. First checked in DynamoDB
2. If not found, determined from email
3. Automatically saved to DynamoDB

### 3. Cohort Access Control
Location: [src/components/Navigation.tsx](src/components/Navigation.tsx)

- **Students**: NO cohort access - cohort tab hidden from navigation
- **Genius & Educators**: Must enter cohort password
- **Admins & Superadmins**: Skip password entry, join directly
- Cohort tab only visible when logged in AND has `canAccessCohort` permission

### 4. Announcements System

#### Backend
- **Service**: [src/services/announcements.ts](src/services/announcements.ts)
- **API**: [src/app/api/announcements/route.ts](src/app/api/announcements/route.ts)
- **Table Script**: [scripts/create-announcements-table.ts](scripts/create-announcements-table.ts)

#### Frontend
- **UI**: [src/components/CohortChat.tsx](src/components/CohortChat.tsx#L252)
- Admins and educators see "📢 Make Announcement" button
- Announcements displayed with yellow highlight
- Title and content fields with priority support

### 5. Role-Based UI Elements

#### Message Badges
- Admin/Educator messages show role badge
- Announcements have special 📢 icon and yellow styling
- Different background colors for different message types

#### Permission-Based Rendering
```typescript
const { permissions, isAdmin, isEducator } = useRole();

{canMakeAnnouncements && (
  <button>Make Announcement</button>
)}
```

## Database Tables

### User Roles Table
**Name**: `genius-labs-user-roles`

**Schema**:
- `email` (Partition Key): User's email
- `role`: UserRole enum
- `assignedBy`: Who assigned the role
- `assignedAt`: Timestamp
- `cohortIds`: Array of cohort IDs (for educators)

### Announcements Table
**Name**: `genius-labs-announcements`

**Schema**:
- `cohortId` (Partition Key): Cohort identifier
- `createdAt` (Sort Key): ISO timestamp
- `id`: Unique announcement ID
- `title`: Announcement title
- `content`: Announcement content
- `createdBy`: Creator's name
- `priority`: 'low' | 'medium' | 'high'

## Setup Instructions

### 1. Create Database Tables

Run the following command to create all necessary tables:

```bash
npm run db:create-tables
```

Or create just the announcements table:

```bash
npm run db:create-announcements
```

### 2. Environment Variables

Add to `.env.local`:

```env
DYNAMODB_ANNOUNCEMENTS_TABLE=genius-labs-announcements
```

### 3. Clean Up Disabled Module Progress

Remove progress data for modules marked as "coming soon":

```bash
npm run db:cleanup-disabled-modules
```

## API Endpoints

### Roles API
**GET** `/api/roles?email={email}`
- Get user's role
- Returns auto-detected role if not in database

**POST** `/api/roles`
- Manually assign role to user
- Body: `{ email, role, assignedBy?, cohortIds? }`

### Announcements API
**GET** `/api/announcements?cohortId={cohortId}`
- Get all announcements for a cohort

**POST** `/api/announcements`
- Create new announcement (admin/educator only)
- Body: `{ cohortId, title, content, createdBy, userEmail, priority? }`

## Hooks

### useRole()
Location: [src/hooks/useRole.ts](src/hooks/useRole.ts)

```typescript
const {
  role,           // Current user's role
  permissions,    // Permission object
  loading,        // Loading state
  isAdmin,        // Boolean helpers
  isEducator,
  isStudent,
  isGenius,
  isSuperAdmin,
  hasPermission,  // Check specific permission
  refetchRole     // Manually refetch
} = useRole();
```

## Permissions Matrix

| Permission | Student | Genius | Educator | Admin | SuperAdmin |
|------------|---------|--------|----------|-------|------------|
| Access Learning Materials | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Access Cohort** | **❌** | **✅** | ✅ | ✅ | ✅ |
| Chat in Cohort | ❌ | ✅ | ✅ | ✅ | ✅ |
| Make Announcements | ❌ | ❌ | ✅ | ✅ | ✅ |
| Access All Cohorts | ❌ | ❌ | ❌ | ✅ | ✅ |
| Requires Cohort Password | N/A | ✅ | ✅ | ❌ | ❌ |
| Edit Lessons/Modules | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Access Admin Panel | ❌ | ❌ | ❌ | ✅ | ✅ |
| View Analytics | ❌ | ❌ | ✅ | ✅ | ✅ |

## Files Modified/Created

### New Files
1. `src/lib/auth-middleware.ts` - Role checking middleware
2. `src/services/announcements.ts` - Announcement service
3. `src/app/api/announcements/route.ts` - Announcements API
4. `scripts/create-announcements-table.ts` - Table creation script
5. `scripts/cleanup-disabled-modules-progress.ts` - Progress cleanup script

### Modified Files
1. `src/types/roles.ts` - Updated roles and permissions
2. `src/services/user-roles.ts` - Auto-assignment logic
3. `src/hooks/useRole.ts` - Updated for new roles
4. `src/app/api/roles/route.ts` - Updated validation
5. `src/components/CohortSelector.tsx` - Password bypass logic
6. `src/components/CohortChat.tsx` - Announcements UI
7. `src/app/modules/page.tsx` - Hide progress for disabled modules
8. `package.json` - Added database scripts

## Testing

### Test Users
Create test accounts with these email patterns:

- `student@test.com` → Student role (NO cohort access)
- `genius@test.com` → Genius role (WITH cohort access)
- `educator@test.com` → Educator role
- `admin@test.com` → Admin role
- `rahsaanyj@test.com` → Superadmin role

### Test Scenarios

1. **Student Access**
   - **NO "Cohort" tab in navigation** (hidden)
   - Can only access learning modules
   - Can view their own progress
   - Cannot join or access cohorts

2. **Genius Access**
   - **HAS "Cohort" tab in navigation** (visible when logged in)
   - Requires password to join cohort
   - Can chat in cohorts
   - Cannot see "Make Announcement" button
   - Can only send regular messages

3. **Educator Access**
   - Has "Cohort" tab in navigation
   - Requires password to join cohort
   - Can see "Make Announcement" button
   - Messages show "Educator" badge

4. **Admin Access**
   - Has "Cohort" tab in navigation
   - Joins cohort without password
   - Can make announcements
   - Messages show "Admin" badge
   - Full access to all features

5. **Unauthenticated Users**
   - NO "Cohort" tab visible
   - Can browse modules (read-only)
   - Must login to access full features

6. **Disabled Modules**
   - Progress not shown for "coming soon" modules
   - Only active modules display progress circles

## Future Enhancements

1. **Educator Cohort Assignment**
   - Link educators to specific cohorts
   - Restrict educator access to assigned cohorts only

2. **Permission Granularity**
   - Per-cohort permissions
   - Custom role creation

3. **Audit Logging**
   - Track role assignments
   - Log announcement creation/deletion

4. **Announcement Management**
   - Edit existing announcements
   - Delete announcements
   - Pin important announcements

5. **Role Management UI**
   - Admin panel for role assignment
   - Bulk role updates
   - Role history

## Support

For issues or questions about the roles system:
1. Check this documentation
2. Review the permission matrix above
3. Test with different email patterns
4. Verify database tables are created
5. Check console for role detection logs
