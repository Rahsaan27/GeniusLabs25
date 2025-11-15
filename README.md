# GeniusLabs Platform

An interactive learning platform for programming education with real-time code execution, progress tracking, and cohort collaboration.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **npm** 9.x or later (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **AWS CLI** (optional, for database setup) ([Install Guide](https://aws.amazon.com/cli/))

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd genius-labs
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, AWS SDK, and other dependencies.

#### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables (get values from project admin):

```env
# AWS Configuration
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# DynamoDB Tables
DYNAMODB_USER_PROGRESS_TABLE=genius-labs-user-progress
DYNAMODB_MESSAGES_TABLE=genius-labs-messages
DYNAMODB_USER_ROLES_TABLE=genius-labs-user-roles
DYNAMODB_USER_PROFILES_TABLE=genius-labs-user-profiles
DYNAMODB_USER_ACHIEVEMENTS_TABLE=genius-labs-user-achievements

# AWS Cognito (for authentication)
NEXT_PUBLIC_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id
NEXT_PUBLIC_OAUTH_DOMAIN=your_cognito_domain.auth.us-west-2.amazoncognito.com
```

**⚠️ Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

#### 4. Verify Environment Variables

Contact the project admin to get the actual values for:
- AWS credentials (Access Key ID and Secret Access Key)
- Cognito User Pool ID and Client ID
- OAuth domain

#### 5. Database Setup (Optional)

If the DynamoDB tables don't exist yet, run:

```bash
# Create all tables at once
npm run db:setup

# Or create individually:
npx tsx scripts/create-tables.ts
npx tsx scripts/create-roles-table.ts
npx tsx scripts/create-profile-tables.ts
```

**Note:** You only need to do this once. If tables already exist, skip this step.

#### 6. Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 📁 Project Structure

```
genius-labs/
├── src/
│   ├── app/                    # Next.js pages (App Router)
│   │   ├── page.tsx           # Homepage
│   │   ├── modules/           # Learning modules
│   │   ├── lesson/            # Individual lessons
│   │   ├── profile/           # User profile
│   │   ├── cohort/            # Cohort collaboration
│   │   └── api/               # API routes
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # Backend services (DynamoDB)
│   ├── data/                  # Lesson content
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
├── scripts/                   # Database setup scripts
├── docs/                      # Documentation
├── public/                    # Static assets
├── .env.local                # Environment variables (create this)
└── package.json              # Dependencies
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm start            # Run production build

# Database
npm run db:setup     # Create all DynamoDB tables (run once)

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

---

## 🔑 Getting Credentials

### AWS Credentials

Contact the project admin to receive:
1. **AWS Access Key ID**
2. **AWS Secret Access Key**

These credentials allow the app to connect to DynamoDB tables.

### Cognito Setup

Contact the project admin to receive:
1. **User Pool ID** - Format: `us-west-2_XXXXXXXXX`
2. **User Pool Client ID** - Format: `xxxxxxxxxxxxxxxxxxxxxxxxxx`
3. **OAuth Domain** - Format: `your-domain.auth.us-west-2.amazoncognito.com`

These enable user authentication via AWS Cognito.

---

## 🧪 Testing the Setup

### 1. Verify Dev Server

After running `npm run dev`, you should see:

```
✓ Ready in 1000ms
- Local:        http://localhost:3000
```

### 2. Test Homepage

Visit http://localhost:3000 - you should see the GeniusLabs homepage.

### 3. Test Authentication

1. Click "Login" or "Sign Up"
2. You should be redirected to AWS Cognito Hosted UI
3. If you see a login form, authentication is configured correctly

### 4. Test API Endpoints

Open browser console and run:

```javascript
// Test progress API
fetch('/api/user-progress/python-basics?userId=test@example.com')
  .then(r => r.json())
  .then(console.log)

// Should return 404 or a progress object
```

### 5. Test Database Connection

If the APIs work without errors, DynamoDB connection is successful.

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 Already in Use

**Error:**
```
Port 3000 is in use by process XXXX, using available port 3001 instead.
```

**Solutions:**

**Option 1:** Use the suggested port (e.g., 3001)
```
http://localhost:3001
```

**Option 2:** Kill the process using port 3000
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Option 3:** Use a different port
```bash
PORT=3001 npm run dev
```

---

### Issue: Module Not Found Errors

**Error:**
```
Cannot find module 'next' or 'react'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Build Cache Errors

**Error:**
```
Error: __webpack_modules__[moduleId] is not a function
```

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

### Issue: AWS Credentials Invalid

**Error:**
```
Error: Resolved credential object is not valid
```

**Solutions:**
1. Verify `.env.local` exists and has correct credentials
2. Check no extra spaces in credential values
3. Contact admin for new credentials
4. Restart dev server after updating `.env.local`

---

### Issue: DynamoDB Table Not Found

**Error:**
```
ResourceNotFoundException: Requested resource not found
```

**Solution:**
```bash
# Create missing tables
npx tsx scripts/create-tables.ts
npx tsx scripts/create-roles-table.ts
npx tsx scripts/create-profile-tables.ts
```

---

### Issue: TypeScript Errors

**Error:**
```
Type 'X' is not assignable to type 'Y'
```

**Solutions:**
```bash
# Check TypeScript errors
npm run type-check

# Often fixed by restarting IDE
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

---

## 📚 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - Comprehensive technical documentation
- **[Roles System](docs/ROLES_SYSTEM.md)** - Role-based access control guide

---

## 🔐 Authentication Flow

1. User clicks "Login" → Redirected to AWS Cognito
2. User enters credentials
3. Cognito redirects to `/callback` with auth code
4. App exchanges code for tokens
5. User session established
6. Access granted to protected routes

---

## 🗄️ Database Tables

The platform uses 5 DynamoDB tables:

1. **genius-labs-user-progress** - Learning progress tracking
2. **genius-labs-messages** - Cohort chat messages
3. **genius-labs-user-roles** - User role assignments
4. **genius-labs-user-profiles** - User profile data
5. **genius-labs-user-achievements** - Achievement tracking

---

## 👥 User Roles

Three role types with different permissions:

- **Genius (Student)** - Access learning materials, join cohorts
- **Educator (Teacher)** - Manage cohorts, make announcements
- **Admin** - Full platform access, manage users and content

See [Roles Documentation](docs/ROLES_SYSTEM.md) for details.

---

## 🎯 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, AWS DynamoDB
- **Authentication:** AWS Cognito (via Amplify)
- **Code Execution:** Pyodide (Python in browser), Native JS
- **Deployment:** Vercel (or any Node.js host)

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy

### Other Platforms

The app works on any platform that supports Next.js:
- AWS Amplify
- Netlify
- Railway
- Self-hosted (Docker)

---

## 🤝 Contributing

### Before Making Changes

1. Pull latest changes: `git pull origin main`
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly locally
5. Commit: `git commit -m "Description of changes"`
6. Push: `git push origin feature/your-feature-name`
7. Create Pull Request on GitHub

### Code Standards

- Use TypeScript for all new files
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed
- Test on multiple browsers

---

## 📞 Getting Help

### Issues?

1. Check this README first
2. Review [Architecture Guide](docs/ARCHITECTURE.md)
3. Search existing GitHub issues
4. Ask project admin
5. Create new GitHub issue with:
   - Description of problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Need Credentials?

Contact project admin via email or Slack to receive:
- AWS credentials
- Cognito configuration
- Access to AWS Console (if needed)

---

## 🔒 Security Notes

**Never commit these files:**
- `.env.local` - Environment variables
- `node_modules/` - Dependencies
- `.next/` - Build output
- Any file containing credentials

**Best Practices:**
- Keep dependencies updated
- Use environment variables for secrets
- Validate user input in API routes
- Sanitize data before rendering
- Use HTTPS in production

---

## 📈 Next Steps

After setup, you can:

1. **Explore the codebase**
   - Read [Architecture Guide](docs/ARCHITECTURE.md)
   - Browse `src/components/` to see React components
   - Check `src/data/` for lesson content

2. **Create a test user**
   - Sign up via the app
   - Test lesson completion
   - Check progress tracking

3. **Try different roles**
   - Ask admin to assign you different roles
   - Test Educator and Admin features
   - Understand permission system

4. **Make your first change**
   - Add a new lesson to `src/data/pythonFundamentals.ts`
   - Test it in the browser
   - Create a pull request

---

## 📋 Checklist for New Developers

- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with credentials
- [ ] Dev server running (`npm run dev`)
- [ ] Can access homepage at localhost:3000
- [ ] Can login successfully
- [ ] Architecture guide reviewed
- [ ] Project structure understood
- [ ] Created first branch
- [ ] Made first commit

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [AWS DynamoDB Guide](https://docs.aws.amazon.com/dynamodb/)
- [AWS Cognito Guide](https://docs.aws.amazon.com/cognito/)

---

## 🏆 Project Status

Current version: **v1.0.0**

**Completed Features:**
- ✅ Multi-language learning (Python, JS, HTML)
- ✅ Browser-based code execution
- ✅ Progress tracking with DynamoDB
- ✅ User profiles and achievements
- ✅ Role-based access control
- ✅ Cohort collaboration
- ✅ Admin panel

**Upcoming Features:**
- 🔄 Real-time collaboration
- 🔄 AI tutor integration
- 🔄 Mobile app
- 🔄 Analytics dashboard

---

## 📄 License

[Add your license here]

---

## 👨‍💻 Team

- **Project Lead:** [Your Name]
- **Contributors:** [Team Members]

---

**Happy Coding! 🚀**

For questions or issues, contact the project admin or create a GitHub issue.
