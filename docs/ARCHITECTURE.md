# GeniusLabs Platform - Complete Architecture Documentation

## Table of Contents
1. [High-Level Overview](#high-level-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Systems](#core-systems)
5. [Data Flow](#data-flow)
6. [Key Components](#key-components)
7. [Backend Services](#backend-services)
8. [External Dependencies](#external-dependencies)
9. [Authentication & Authorization](#authentication--authorization)
10. [Database Architecture](#database-architecture)

---

## High-Level Overview

GeniusLabs is a full-stack interactive learning platform built on Next.js 15, enabling students to learn programming through hands-on coding exercises with real-time feedback. The platform supports multiple programming languages (Python, JavaScript, HTML/CSS) with an integrated IDE, progress tracking, achievements, cohort collaboration, and role-based access control.

### Architecture Pattern
**Three-Tier Architecture:**
```
Frontend (React/Next.js)
    ↓
API Layer (Next.js API Routes)
    ↓
Backend Services (DynamoDB + AWS Cognito)
```

### Key Features
- 🎓 Multi-language learning (Python, JavaScript, HTML/CSS)
- 💻 Browser-based IDE with code execution
- 📊 Real-time progress tracking
- 🏆 Achievement system with gamification
- 👥 Cohort-based learning with chat
- 🔐 Role-based access control (Student/Educator/Admin)
- 📱 Responsive design for all devices
- ☁️ Cloud-native with AWS infrastructure

---

## Technology Stack

### Frontend Framework
**Next.js 15.4.1** (React 19)
- **Why:** Server-side rendering, API routes, file-based routing, excellent developer experience
- **App Router:** Modern routing with React Server Components
- **TypeScript:** Full type safety across the application

### UI & Styling
**Tailwind CSS 3.4.17**
- **Why:** Utility-first CSS, rapid UI development, consistent design system
- **Configuration:** Custom color palette (green/black theme)
- **Responsive:** Mobile-first design approach

**Lucide React** (Icons)
- Beautiful, consistent icon set
- Tree-shakeable for optimal bundle size

### State Management
**React Hooks + Context API**
- `useState`, `useEffect`, `useContext` for local state
- Custom hooks for reusable logic (`useAuth`, `useRole`, `useProfile`, `useAchievements`)
- No external state management library needed (Redux, Zustand, etc.)

### Code Execution
**Pyodide 0.24.1**
- Python interpreter compiled to WebAssembly
- Runs Python code entirely in the browser
- No backend execution needed for Python

**Native JavaScript Engine**
- Direct code execution via `eval()` with safety measures
- Immediate feedback for JavaScript exercises

### Authentication
**AWS Amplify 6.11.4**
- **AWS Cognito** for user authentication
- OAuth 2.0 / OpenID Connect
- Hosted UI for login/signup
- Secure token management

### Database
**AWS DynamoDB**
- NoSQL database for scalability
- Tables:
  - `genius-labs-user-progress` - Learning progress
  - `genius-labs-messages` - Cohort chat messages
  - `genius-labs-user-roles` - User role assignments
  - `genius-labs-user-profiles` - User profile data
  - `genius-labs-user-achievements` - Achievement tracking

**AWS SDK for JavaScript v3**
- `@aws-sdk/client-dynamodb` - Low-level DynamoDB client
- `@aws-sdk/lib-dynamodb` - High-level Document Client with type safety

### Development Tools
- **TypeScript 5.x** - Type safety
- **ESLint** - Code linting
- **npm** - Package management

---

## Project Structure

```
genius-labs/
│
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout with nav
│   │   ├── login/page.tsx            # Login page
│   │   ├── signup/page.tsx           # Signup page
│   │   ├── callback/page.tsx         # OAuth callback handler
│   │   ├── modules/                  # Module pages
│   │   │   ├── page.tsx              # Module list view
│   │   │   └── [moduleId]/page.tsx   # Individual module detail
│   │   ├── lesson/                   # Lesson pages
│   │   │   ├── [id]/page.tsx         # Standard lesson view
│   │   │   └── ide-test/page.tsx     # IDE testing page
│   │   ├── short-form/               # Short-form lessons
│   │   │   └── [moduleId]/page.tsx   # TikTok-style lesson view
│   │   ├── activity/page.tsx         # Activity feed
│   │   ├── profile/page.tsx          # User profile
│   │   ├── cohort/page.tsx           # Cohort collaboration
│   │   └── api/                      # API routes
│   │       ├── messages/route.ts     # Chat messages API
│   │       ├── user-progress/        # Progress tracking APIs
│   │       │   ├── route.ts          # Create/get progress
│   │       │   └── [moduleId]/
│   │       │       ├── route.ts      # Module progress
│   │       │       ├── lesson/route.ts   # Mark lesson complete
│   │       │       └── quiz/route.ts     # Quiz completion
│   │       ├── roles/route.ts        # Role management API
│   │       ├── profile/route.ts      # User profile API
│   │       └── achievements/route.ts # Achievement API
│   │
│   ├── components/                   # React components
│   │   ├── AmplifyProvider.tsx       # Auth context provider
│   │   ├── Navigation.tsx            # Top navigation bar
│   │   ├── AdminPanel.tsx            # Admin dashboard
│   │   ├── RoleManagement.tsx        # Role assignment UI
│   │   ├── ShortFormLesson.tsx       # Swipeable lesson component
│   │   └── IDE/                      # Code editor components
│   │       ├── InteractiveIDE.tsx    # Main IDE container
│   │       ├── CodeEditor.tsx        # Monaco-like editor
│   │       └── OutputConsole.tsx     # Code execution output
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts                # Authentication state
│   │   ├── useRole.ts                # User role & permissions
│   │   ├── useProfile.ts             # User profile management
│   │   └── useAchievements.ts        # Achievement tracking
│   │
│   ├── services/                     # Backend service layer
│   │   ├── user-progress.ts          # DynamoDB progress operations
│   │   ├── messages.ts               # DynamoDB chat operations
│   │   ├── user-roles.ts             # DynamoDB role operations
│   │   └── profile.ts                # DynamoDB profile operations
│   │
│   ├── data/                         # Static data & content
│   │   ├── lessons.ts                # All lesson definitions
│   │   ├── pythonFundamentals.ts     # Python curriculum
│   │   ├── modernJavascript.ts       # JavaScript curriculum
│   │   ├── htmlLessons.ts            # HTML/CSS curriculum
│   │   ├── entrepreneurship.ts       # Business lessons
│   │   └── cohorts.ts                # Cohort definitions
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── lesson.ts                 # Lesson types
│   │   ├── roles.ts                  # Role & permission types
│   │   └── profile.ts                # User profile types
│   │
│   ├── utils/                        # Utility functions
│   │   ├── progress.ts               # Progress calculations
│   │   ├── lessonTemplates.ts        # Lesson generation helpers
│   │   └── codeExecution.ts          # Code execution utilities
│   │
│   └── app/
│       └── globals.css               # Global styles
│
├── scripts/                          # Database setup scripts
│   ├── create-tables.ts              # Create progress tables
│   ├── create-roles-table.ts         # Create roles table
│   └── create-profile-tables.ts      # Create profile tables
│
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md               # This file
│   └── ROLES_SYSTEM.md               # Roles documentation
│
├── public/                           # Static assets
│   ├── images/                       # Images & icons
│   └── favicon.ico                   # Site icon
│
├── .env.local                        # Environment variables (not in git)
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies
```

---

## Core Systems

### 1. Authentication System

**Flow:**
```
User clicks "Login"
    → Redirected to AWS Cognito Hosted UI
    → User authenticates (email/password or social login)
    → Cognito redirects to /callback with auth code
    → App exchanges code for tokens
    → User session established
    → Access tokens stored in memory
```

**Components:**
- **AmplifyProvider** (`src/components/AmplifyProvider.tsx`)
  - Wraps entire app
  - Initializes Amplify with Cognito config
  - Provides authentication context

- **useAuth Hook** (`src/hooks/useAuth.ts`)
  - Returns: `{ user, isAuthenticated, login, logout, signUp }`
  - Manages authentication state
  - Provides login/logout functions

**Configuration:**
```typescript
// Cognito User Pool settings in AmplifyProvider.tsx
userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID
userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
oauth: {
  domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN
  redirectSignIn: 'http://localhost:3000/callback'
  redirectSignOut: 'http://localhost:3000/'
}
```

---

### 2. Learning Content System

**Content Structure:**
```typescript
Module {
  id: string
  title: string
  description: string
  language: 'python' | 'javascript' | 'html'
  lessons: Lesson[]
}

Lesson {
  id: string
  title: string
  content: {
    theory: string          // Educational content
    instructions: string    // Task description
    starterCode: string     // Initial code
  }
  testCases: TestCase[]     // Validation tests
  activities: Activity[]    // code, quiz, docs, videos
}
```

**Content Files:**
- `src/data/pythonFundamentals.ts` - 15+ Python lessons
- `src/data/modernJavascript.ts` - JavaScript curriculum
- `src/data/htmlLessons.ts` - HTML/CSS lessons
- `src/data/entrepreneurship.ts` - Business content

**Lesson Types:**

1. **Standard Lessons** (`/lesson/[id]`)
   - Full-screen IDE experience
   - Theory, instructions, code editor, tests
   - Linear progression

2. **Module Detail View** (`/modules/[moduleId]`)
   - Tabbed interface (Videos, Docs, Code, Quiz)
   - Activity-based progression
   - Unlock system (complete one to unlock next)

3. **Short-Form Lessons** (`/short-form/[moduleId]`)
   - TikTok-style vertical scrolling
   - One concept per "slide"
   - Quick micro-learning
   - Swipe gestures for navigation

---

### 3. Interactive IDE System

**Architecture:**
```
InteractiveIDE (Container)
    ├─ CodeEditor (Monaco-like syntax highlighting)
    └─ OutputConsole (Execution results)
```

**Code Execution Pipeline:**

**For Python:**
```
User writes code
    → Click "Run Code"
    → Load Pyodide (if not loaded)
    → Execute code in WebAssembly
    → Capture stdout/stderr
    → Display in OutputConsole
    → Run test cases
    → Show pass/fail results
```

**For JavaScript:**
```
User writes code
    → Click "Run Code"
    → Wrap code in try-catch
    → Execute with eval()
    → Capture console.log output
    → Display in OutputConsole
    → Run test cases
```

**For HTML:**
```
User writes HTML
    → Click "Run Code"
    → Render in iframe
    → Display as "fake browser"
    → Browser chrome UI (address bar, buttons)
    → Live preview
```

**Key Files:**
- `src/components/IDE/InteractiveIDE.tsx` - Main container
- `src/components/IDE/CodeEditor.tsx` - Syntax highlighting editor
- `src/components/IDE/OutputConsole.tsx` - Output display

**Features:**
- Syntax highlighting for all languages
- Line numbers
- Auto-indentation
- Tab support
- Real-time feedback
- Test case validation
- Error highlighting

---

### 4. Progress Tracking System

**Data Model:**
```typescript
UserProgress {
  userId: string              // User's email
  moduleId: string            // Module identifier
  lessonsCompleted: string[]  // Array of completed lesson IDs
  isCompleted: boolean        // Module fully completed
  moduleProgress: number      // Percentage (0-100)
  startedAt: string          // ISO timestamp
  lastAccessedAt: string     // ISO timestamp
  updatedAt: string          // ISO timestamp
}
```

**Flow:**
```
User completes lesson
    → Frontend calls POST /api/user-progress/[moduleId]/lesson
    → API validates user authentication
    → Check if progress record exists
        → If not, create new record
    → Add lessonId to lessonsCompleted array
    → Check if all lessons complete
        → If yes, set isCompleted = true
    → Update profile stats (totalLessonsCompleted)
    → Check for new achievements
    → Return updated progress
```

**API Endpoints:**

1. **GET /api/user-progress?userId={email}**
   - Get all progress across all modules
   - Returns array of progress objects

2. **POST /api/user-progress**
   - Create new progress record
   - Body: `{ userId, moduleId }`

3. **GET /api/user-progress/[moduleId]?userId={email}**
   - Get progress for specific module

4. **POST /api/user-progress/[moduleId]/lesson**
   - Mark lesson as completed
   - Body: `{ userId, lessonId }`

5. **POST /api/user-progress/[moduleId]/quiz**
   - Record quiz completion
   - Body: `{ userId, score }`

**Service Layer:**
```typescript
// src/services/user-progress.ts

getUserProgress(userId, moduleId)
createUserProgress(userId, moduleId)
updateModuleProgress(userId, moduleId, updates)
markLessonCompleted(userId, moduleId, lessonId)
markQuizCompleted(userId, moduleId, score)
```

**Local Utilities:**
```typescript
// src/utils/progress.ts
// Used for client-side calculations, NOT persistence

getModuleProgress(moduleId, lessonIds)
  → Returns: { completed, total, percentage }

getUserProgress(lessonId)
  → Fallback to localStorage for demo mode
```

---

### 5. User Profile System

**Data Model:**
```typescript
UserProfile {
  email: string                    // Primary key
  displayName?: string             // User's chosen name
  avatarUrl?: string              // Profile picture
  bio?: string                    // About me

  // Learning Stats
  totalLessonsCompleted: number
  totalModulesCompleted: number
  totalTimeSpent: number          // minutes
  totalScore: number
  currentStreak: number           // days
  longestStreak: number
  lastActivityDate: string

  // Settings
  emailNotifications: boolean
  dailyReminders: boolean

  // Metadata
  createdAt: string
  updatedAt: string
}
```

**Profile Features:**
- **Overview Tab:** Display stats cards
- **Achievements Tab:** Show unlocked/locked achievements
- **Progress Tab:** Module completion breakdown
- **Settings Tab:** Profile editing, notification preferences

**Profile-Progress Sync:**
When a lesson is completed:
1. Progress service updates `lessonsCompleted` array
2. Calculates total lessons across all modules
3. Calls `updateUserStats()` to update profile
4. Profile stats automatically stay in sync

**API:**
- `GET /api/profile?email={email}` - Fetch profile
- `POST /api/profile` - Create/update profile info
- `PATCH /api/profile` - Update settings

---

### 6. Achievement System

**Achievement Types:**
- Lessons (complete N lessons)
- Modules (complete N modules)
- Score (earn N total points)
- Streak (maintain N day streak)

**Achievement Definitions:**
```typescript
// src/types/profile.ts
ACHIEVEMENTS = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Completed your first 5 lessons',
    icon: '🎯',
    category: 'lessons',
    requirement: { type: 'lessons_completed', value: 5 }
  },
  // ... 6 more achievements
]
```

**Auto-Check System:**
```
User completes lesson
    → Progress service updates stats
    → Profile service updates totalLessonsCompleted
    → Achievement service calls checkAndUnlockAchievements()
    → Loop through all achievements
        → Check if requirement met
        → If yes and not already unlocked
            → Unlock achievement
            → Save to DynamoDB
    → Return newly unlocked achievements
```

**API:**
- `GET /api/achievements?email={email}` - Get all achievements with unlock status
- `POST /api/achievements` - Manually unlock achievement
- `PUT /api/achievements` - Check and auto-unlock eligible achievements

---

### 7. Role-Based Access Control (RBAC)

**Role Hierarchy:**
```
Admin (full access)
    ↓
Educator (cohort management + all Genius features)
    ↓
Genius (student - learning only)
```

**Permission System:**
13 granular permissions control feature access:
```typescript
canAccessLearningMaterial
canAccessCohort
canChatInCohort
canMakeAnnouncements
canEditUserList
canAccessAllCohorts        // Admin only
canEditLessons            // Admin only
canEditModules            // Admin only
canManageContent          // Admin only
canManageUsers            // Admin only
canAssignRoles            // Admin only
canAccessAdminPanel       // Admin only
canViewAnalytics          // Admin only
```

**Role Usage in Components:**
```typescript
import { useRole } from '@/hooks/useRole';

function MyComponent() {
  const { permissions, isAdmin, hasPermission } = useRole();

  if (!permissions?.canMakeAnnouncements) {
    return null; // Hide feature
  }

  return <AnnouncementButton />;
}
```

**Role Assignment:**
- Admins assign roles via Admin Panel → Roles tab
- Stored in `genius-labs-user-roles` DynamoDB table
- Educators can be assigned to specific cohort IDs
- Roles are email-based (tied to Cognito identity)

---

### 8. Cohort System

**Cohort Structure:**
```typescript
Cohort {
  id: string
  name: string
  description: string
  instructor: string
  students: string[]
  startDate: string
  endDate?: string
}
```

**Cohort Features:**
- **Real-time Chat:** Messages stored in DynamoDB
- **Announcements:** Educator broadcasts to entire cohort
- **Member Management:** Educators add/remove students
- **Activity Feed:** See cohort member progress

**Chat System:**
```
User types message
    → POST /api/messages
    → Save to genius-labs-messages table
    → Attributes: { messageId, cohortId, userId, text, timestamp }
    → Frontend polls /api/messages?cohortId={id}
    → Display messages in chronological order
```

**Message Data Model:**
```typescript
Message {
  messageId: string       // UUID
  cohortId: string       // Partition key
  timestamp: string      // Sort key (ISO format)
  userId: string         // Sender email
  userName: string       // Display name
  text: string           // Message content
  type: 'chat' | 'announcement'
}
```

---

## Data Flow

### Complete User Journey - Learning a Lesson

```
1. USER AUTHENTICATION
   User → Login page → AWS Cognito → Callback → Session created

2. MODULE SELECTION
   User → /modules page
        → Display all available modules
        → Load progress from DynamoDB
        → Show completion percentages

3. LESSON ACCESS
   User clicks module
        → /modules/[moduleId] page loads
        → Fetch module lessons from src/data/lessons.ts
        → Load user progress via GET /api/user-progress/[moduleId]
        → Display lessons with lock/unlock status

4. CODING ACTIVITY
   User selects lesson
        → InteractiveIDE renders
        → Load starter code
        → User writes code
        → Click "Run Code"
        → Execute code (Pyodide or eval)
        → Display output
        → Run test cases
        → Show pass/fail results

5. LESSON COMPLETION
   All activities complete
        → POST /api/user-progress/[moduleId]/lesson
        → DynamoDB: Add to lessonsCompleted array
        → Update profile: totalLessonsCompleted++
        → Check achievements: checkAndUnlockAchievements()
        → If achievement unlocked: Show celebration UI
        → Redirect to module view with updated progress

6. PROFILE UPDATE
   Background sync
        → Profile stats updated in real-time
        → Achievement progress calculated
        → Streak tracking updated
        → User can view in /profile page
```

---

## Key Components

### Navigation Component
**File:** `src/components/Navigation.tsx`

**Purpose:** Top navigation bar across all pages

**Features:**
- Logo with link to home
- Navigation links (Home, Modules, Cohort)
- User menu (Profile, Admin Panel, Logout)
- Responsive mobile menu
- Authentication-aware (show different links based on login state)

**State Management:**
```typescript
const { user, isAuthenticated, logout } = useAuth();
const { isAdmin } = useRole();
```

---

### InteractiveIDE Component
**File:** `src/components/IDE/InteractiveIDE.tsx`

**Purpose:** Main code editor container

**Props:**
```typescript
{
  language: 'python' | 'javascript' | 'html'
  initialCode?: string
  onCodeChange?: (code: string) => void
  className?: string
}
```

**State:**
- `code` - Current code in editor
- `output` - Execution output
- `isRunning` - Execution in progress
- `testResults` - Test case pass/fail status

**Key Methods:**
- `runCode()` - Execute code based on language
- `runTests()` - Validate code against test cases
- `handleCodeChange()` - Update code state

---

### CodeEditor Component
**File:** `src/components/IDE/CodeEditor.tsx`

**Purpose:** Syntax-highlighted code input

**Features:**
- Custom tokenizer for Python, JavaScript, HTML
- Color-coded syntax (keywords, strings, comments, functions)
- Line numbers
- Tab character support (4 spaces)
- Auto-indentation
- Cursor tracking
- Textarea-based (lightweight, no heavy dependencies)

**Tokenization:**
```typescript
Keywords → Blue
Strings → Green
Comments → Gray
Functions → Yellow
Numbers → Orange
Operators → White
```

---

### OutputConsole Component
**File:** `src/components/IDE/OutputConsole.tsx`

**Purpose:** Display code execution results

**Modes:**

1. **Python/JavaScript Output:**
   - stdout/stderr messages
   - Error messages with stack traces
   - Test results (✓ Pass / ✗ Fail)

2. **HTML Preview:**
   - Fake browser chrome (address bar, buttons)
   - iframe rendering
   - Live preview of HTML/CSS

---

### ShortFormLesson Component
**File:** `src/components/ShortFormLesson.tsx`

**Purpose:** TikTok-style vertical lesson format

**Features:**
- Snap-scroll between "slides"
- Each slide = one concept
- Touch gestures (swipe up/down)
- Progress dots at bottom
- Mini code editor
- Quick "Run" and "Next" buttons
- Completion celebration

**Slide Types:**
1. **Theory Slide** - Educational content
2. **Code Slide** - Interactive coding
3. **Quiz Slide** - Multiple choice
4. **Completion Slide** - Celebration + navigation

---

### AdminPanel Component
**File:** `src/components/AdminPanel.tsx`

**Purpose:** Admin dashboard

**Tabs:**
1. **Overview** - Platform stats
2. **Announcements** - Broadcast messages
3. **Assignments** - Manage exercises
4. **Students** - User management
5. **Roles** - Role assignment interface

**Access Control:**
```typescript
const { isAdmin } = useRole();

if (!isAdmin) {
  return <AccessDenied />;
}
```

---

### RoleManagement Component
**File:** `src/components/RoleManagement.tsx`

**Purpose:** UI for assigning user roles

**Features:**
- Email input field
- Role dropdown (Genius, Educator, Admin)
- Cohort assignment (for Educators)
- Current role mappings display
- Role definition reference cards

**Form Handling:**
```typescript
const handleAssignRole = async () => {
  await fetch('/api/roles', {
    method: 'POST',
    body: JSON.stringify({ email, role, cohortIds })
  });
  // Refresh list
};
```

---

## Backend Services

### User Progress Service
**File:** `src/services/user-progress.ts`

**Key Functions:**

```typescript
getUserProgress(userId: string, moduleId: string)
  → Fetch progress from DynamoDB
  → Returns: UserProgress or null

createUserProgress(userId: string, moduleId: string)
  → Create new progress record
  → Initialize with empty lessonsCompleted array
  → Returns: UserProgress

updateModuleProgress(userId, moduleId, updates)
  → Update specific fields
  → Auto-update lastAccessedAt timestamp
  → Returns: Updated UserProgress

markLessonCompleted(userId, moduleId, lessonId)
  → Add lesson to lessonsCompleted array
  → Check for duplicates
  → Update profile stats
  → Check achievements
  → Returns: Updated progress

markQuizCompleted(userId, moduleId, score)
  → Record quiz score
  → Update progress
  → Returns: Updated progress
```

**DynamoDB Operations:**
- Uses `@aws-sdk/lib-dynamodb` DocumentClient
- GetCommand, PutCommand, UpdateCommand
- Handles errors gracefully

---

### Profile Service
**File:** `src/services/profile.ts`

**Key Functions:**

```typescript
getUserProfile(email: string)
  → Fetch profile from DynamoDB
  → Returns: UserProfile or null

createUserProfile(email, displayName?)
  → Initialize profile with defaults
  → totalLessonsCompleted = 0
  → emailNotifications = true
  → Returns: UserProfile

updateUserProfile(email, updates)
  → Partial update of profile fields
  → Auto-update updatedAt timestamp
  → Returns: Updated profile

updateUserStats(email, stats)
  → Update learning statistics
  → { lessonsCompleted, score, streak, etc. }
  → Auto-update longestStreak if needed
  → Returns: Updated profile

checkAndUnlockAchievements(email, profile)
  → Loop through all achievements
  → Check requirements against profile stats
  → Unlock eligible achievements
  → Returns: Array of newly unlocked achievements
```

---

### User Roles Service
**File:** `src/services/user-roles.ts`

**Key Functions:**

```typescript
getUserRole(email: string)
  → Fetch role from DynamoDB
  → Returns: 'genius' | 'educator' | 'admin'
  → Default: 'genius' if not found

assignUserRole(email, role, assignedBy?, cohortIds?)
  → Create/update role mapping
  → Store cohortIds for educators
  → Returns: EmailRoleMapping

getUsersByRole(role: UserRole)
  → Query all users with specific role
  → Uses RoleIndex GSI
  → Returns: EmailRoleMapping[]

isAdmin(email: string)
  → Check if user is admin
  → Returns: boolean

getEducatorCohorts(email: string)
  → Get cohort assignments for educator
  → Returns: string[] (cohort IDs)
```

---

### Messages Service
**File:** `src/services/messages.ts`

**Key Functions:**

```typescript
getMessages(cohortId: string, limit?)
  → Fetch recent messages from DynamoDB
  → Sorted by timestamp (newest first)
  → Returns: Message[]

sendMessage(cohortId, userId, userName, text, type?)
  → Create new message
  → Generate messageId (UUID)
  → Store in DynamoDB
  → Returns: Message

deleteMessage(messageId: string, cohortId: string)
  → Remove message from DynamoDB
  → Returns: success boolean
```

---

## External Dependencies

### Core Dependencies

**Production:**
```json
{
  "next": "15.4.1",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "typescript": "5.x",
  "tailwindcss": "3.4.17",
  "lucide-react": "^0.263.1",
  "aws-amplify": "6.11.4",
  "@aws-sdk/client-dynamodb": "3.x",
  "@aws-sdk/lib-dynamodb": "3.x",
  "uuid": "^10.0.0"
}
```

**Why Each Dependency:**

1. **Next.js 15** - React framework with:
   - App Router for modern routing
   - API routes for backend endpoints
   - Server-side rendering for performance
   - Built-in optimization (image, font, bundle)

2. **React 19** - UI library with:
   - Server Components
   - Concurrent rendering
   - Automatic batching
   - Modern hooks

3. **TypeScript** - Type safety:
   - Catch errors at compile time
   - Better IDE support
   - Self-documenting code
   - Refactoring confidence

4. **Tailwind CSS** - Styling:
   - Utility-first approach
   - No CSS files to manage
   - Consistent design system
   - Responsive by default
   - Smaller bundle size (purges unused)

5. **Lucide React** - Icons:
   - 1000+ SVG icons
   - Tree-shakeable
   - Customizable size/color
   - Consistent design

6. **AWS Amplify** - Authentication:
   - Pre-built Cognito integration
   - OAuth flow handling
   - Token management
   - Session persistence

7. **AWS SDK** - Database:
   - DynamoDB client
   - Type-safe operations
   - Error handling
   - Retry logic

8. **UUID** - Unique identifiers:
   - Generate message IDs
   - Collision-free
   - Industry standard

---

### External Services

**AWS Cognito**
- User authentication
- OAuth 2.0 provider
- User pool management
- Multi-factor authentication support
- Social login integration (future)

**AWS DynamoDB**
- NoSQL database
- Serverless scaling
- Single-digit millisecond latency
- Global tables support (future)
- Point-in-time recovery
- On-demand pricing

**Pyodide CDN**
- Python in browser
- NumPy, Pandas support (if needed)
- No server-side execution
- Secure sandbox
- WebAssembly performance

---

## Authentication & Authorization

### Authentication Flow (Detailed)

```
1. USER CLICKS "LOGIN"
   → Navigate to /login page
   → Click "Sign in with AWS Cognito"

2. AMPLIFY REDIRECT
   → signIn() function called from useAuth hook
   → Redirects to Cognito Hosted UI
   → URL: https://{domain}.auth.{region}.amazoncognito.com/login

3. USER AUTHENTICATES
   → Enter email/password
   → Cognito validates credentials
   → Generates authorization code

4. COGNITO CALLBACK
   → Redirect to /callback?code={authCode}
   → Callback page handles OAuth flow
   → Exchange code for tokens

5. TOKEN STORAGE
   → Access token, ID token, refresh token received
   → Stored securely in memory (not localStorage)
   → Session cookie set

6. USER SESSION
   → isAuthenticated = true
   → user object populated with email, name
   → Navigate to /modules (home for logged-in users)

7. TOKEN REFRESH
   → Access tokens expire after 1 hour
   → Amplify auto-refreshes using refresh token
   → Seamless user experience
```

### Authorization Flow

```
1. PAGE LOAD
   → useAuth hook checks authentication
   → useRole hook fetches user role from DynamoDB
   → Permissions object built from ROLE_DEFINITIONS

2. COMPONENT RENDER
   → Components check permissions
   → if (!permissions?.canAccessFeature) return null
   → Feature shows/hides based on role

3. API REQUEST
   → Frontend includes auth headers
   → Backend validates tokens (future enhancement)
   → Check user role from DynamoDB
   → Verify permission for action
   → Allow or deny request

4. ROUTE PROTECTION
   → useEffect checks isAuthenticated
   → if (!isAuthenticated) router.push('/login')
   → Prevents unauthorized access
```

---

## Database Architecture

### DynamoDB Table Design

#### 1. genius-labs-user-progress
**Purpose:** Track learning progress

**Keys:**
- **Partition Key:** `userId` (String) - User's email
- **Sort Key:** `moduleId` (String) - Module identifier

**Attributes:**
- `lessonsCompleted` (List) - Array of completed lesson IDs
- `isCompleted` (Boolean) - Module fully completed
- `moduleProgress` (Number) - Percentage 0-100
- `startedAt` (String) - ISO timestamp
- `lastAccessedAt` (String) - ISO timestamp
- `updatedAt` (String) - ISO timestamp

**Access Patterns:**
- Get all progress for user: Query by userId
- Get specific module progress: Get item by userId + moduleId

---

#### 2. genius-labs-messages
**Purpose:** Store cohort chat messages

**Keys:**
- **Partition Key:** `cohortId` (String)
- **Sort Key:** `timestamp` (String) - ISO format for chronological sorting

**Attributes:**
- `messageId` (String) - UUID
- `userId` (String) - Sender email
- `userName` (String) - Display name
- `text` (String) - Message content
- `type` (String) - 'chat' or 'announcement'

**Access Patterns:**
- Get recent messages for cohort: Query by cohortId, sort by timestamp DESC
- Delete specific message: Delete by messageId

---

#### 3. genius-labs-user-roles
**Purpose:** Role assignments

**Keys:**
- **Partition Key:** `email` (String)

**Global Secondary Index:**
- **RoleIndex:** Partition key = `role`

**Attributes:**
- `role` (String) - 'genius', 'educator', or 'admin'
- `cohortIds` (List) - Array of assigned cohorts (educators only)
- `assignedBy` (String) - Admin who assigned role
- `assignedAt` (String) - ISO timestamp

**Access Patterns:**
- Get user's role: Get item by email
- Get all users with role X: Query RoleIndex by role

---

#### 4. genius-labs-user-profiles
**Purpose:** User profile data

**Keys:**
- **Partition Key:** `email` (String)

**Attributes:**
- `displayName` (String)
- `avatarUrl` (String)
- `bio` (String)
- `totalLessonsCompleted` (Number)
- `totalModulesCompleted` (Number)
- `totalTimeSpent` (Number)
- `totalScore` (Number)
- `currentStreak` (Number)
- `longestStreak` (Number)
- `lastActivityDate` (String)
- `emailNotifications` (Boolean)
- `dailyReminders` (Boolean)
- `createdAt` (String)
- `updatedAt` (String)

**Access Patterns:**
- Get user profile: Get item by email
- Update profile: Update item by email

---

#### 5. genius-labs-user-achievements
**Purpose:** Track unlocked achievements

**Keys:**
- **Partition Key:** `email` (String)
- **Sort Key:** `achievementId` (String)

**Attributes:**
- `unlockedAt` (String) - ISO timestamp
- `progress` (Number) - Optional progress tracking

**Access Patterns:**
- Get all achievements for user: Query by email
- Check if achievement unlocked: Get item by email + achievementId

---

## Performance Considerations

### Code Splitting
- Next.js automatic code splitting per route
- Dynamic imports for heavy components
- Pyodide loaded on-demand (only when needed)

### Caching
- Static assets cached in browser
- DynamoDB results cached in React state
- API responses cached briefly (SWR pattern possible future enhancement)

### Optimization
- Image optimization via Next.js Image component
- Font optimization with next/font
- CSS purging via Tailwind (removes unused styles)
- Tree shaking for minimal bundle size

### Scalability
- Serverless architecture (Next.js + DynamoDB)
- Auto-scaling with traffic
- No server management needed
- Global CDN via Vercel/AWS CloudFront

---

## Future Enhancements

### Planned Features
1. **Real-time Collaboration**
   - WebSockets for live coding
   - Pair programming mode
   - Screen sharing

2. **AI Tutor**
   - GPT-4 integration
   - Code review assistance
   - Personalized hints

3. **Mobile App**
   - React Native version
   - Offline mode
   - Push notifications

4. **Analytics Dashboard**
   - Learning metrics
   - Time-on-task tracking
   - Cohort performance comparison

5. **Advanced Testing**
   - Performance tests
   - Memory usage checks
   - Code quality metrics

6. **Content CMS**
   - Admin interface for lesson creation
   - WYSIWYG editor
   - Version control for lessons

---

## Deployment

### Production Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment variables in Vercel dashboard:
NEXT_PUBLIC_USER_POOL_ID
NEXT_PUBLIC_USER_POOL_CLIENT_ID
NEXT_PUBLIC_OAUTH_DOMAIN
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DYNAMODB_USER_PROGRESS_TABLE
DYNAMODB_MESSAGES_TABLE
DYNAMODB_USER_ROLES_TABLE
DYNAMODB_USER_PROFILES_TABLE
DYNAMODB_USER_ACHIEVEMENTS_TABLE
```

### Database Setup

```bash
# Create all tables
npm run db:setup

# Or individually:
npx tsx scripts/create-tables.ts
npx tsx scripts/create-roles-table.ts
npx tsx scripts/create-profile-tables.ts
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

### Adding New Lessons

1. Create lesson object in appropriate file:
   - Python: `src/data/pythonFundamentals.ts`
   - JavaScript: `src/data/modernJavascript.ts`
   - HTML: `src/data/htmlLessons.ts`

2. Lesson structure:
```typescript
{
  id: 'unique-lesson-id',
  title: 'Lesson Title',
  description: 'Brief description',
  language: 'python',
  content: {
    theory: 'Educational content...',
    instructions: 'What to build...',
    starterCode: 'print("Hello")'
  },
  testCases: [
    {
      id: 'test-1',
      input: '',
      expectedOutput: 'Hello',
      description: 'Should print Hello'
    }
  ],
  activities: ['code', 'quiz']
}
```

3. Add to module in `src/data/lessons.ts`

4. Test in browser

---

## Troubleshooting

### Common Issues

**Issue:** Pyodide not loading
- **Solution:** Check CDN connection, wait for full load

**Issue:** Progress not saving
- **Solution:** Check authentication, verify DynamoDB table exists, check API logs

**Issue:** Role not reflecting
- **Solution:** Refresh page, check DynamoDB record, verify role assignment

**Issue:** Build errors
- **Solution:** Clear `.next` folder, reinstall dependencies

**Issue:** API 500 errors
- **Solution:** Check AWS credentials, verify table names, check CloudWatch logs

---

## Conclusion

GeniusLabs is a modern, scalable learning platform built with industry-standard technologies. The architecture separates concerns clearly (frontend/API/services), uses cloud-native infrastructure (DynamoDB, Cognito), and provides an excellent developer experience (TypeScript, Next.js, Tailwind).

The codebase is organized for growth, with clear patterns for adding new features, lessons, and capabilities. The role system enables multi-tenant usage, while the progress tracking and achievements provide engagement and motivation for learners.

**Key Strengths:**
- ✅ Type-safe end-to-end
- ✅ Serverless and scalable
- ✅ Real browser-based coding
- ✅ Clean architecture
- ✅ Comprehensive progress tracking
- ✅ Role-based access control
- ✅ Mobile-responsive design

**Next Steps:**
- Add more lessons and modules
- Implement AI tutor integration
- Build analytics dashboard
- Create mobile app
- Expand achievement system
