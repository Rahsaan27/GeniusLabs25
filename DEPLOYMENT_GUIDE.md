# GeniusLabs AWS Deployment Guide

This guide will walk you through deploying GeniusLabs to AWS using AWS Amplify (recommended) or alternative methods.

## Prerequisites

✅ AWS Account with credentials (you already have this)
✅ DynamoDB tables created (you already have this)
✅ AWS Cognito configured for authentication
✅ Git repository (GitHub, GitLab, or Bitbucket)

---

## Option 1: AWS Amplify (Recommended) ⭐

AWS Amplify is the easiest way to deploy Next.js applications with built-in CI/CD.

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done):**
   ```bash
   cd /Users/rahsaanyj/Documents/GeniusLabs/GeniusLabs25/genius-labs
   git init
   git add .
   git commit -m "Initial commit for deployment"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Create a new repository (e.g., `GeniusLabs-App`)
   - **IMPORTANT**: Do NOT add README, .gitignore, or license (you already have these)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/GeniusLabs-App.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy with AWS Amplify

1. **Open AWS Amplify Console:**
   - Go to https://console.aws.amazon.com/amplify/
   - Click "Get Started" under "Amplify Hosting"

2. **Connect Repository:**
   - Select "GitHub" (or your git provider)
   - Click "Continue"
   - Authorize AWS Amplify to access your repositories
   - Select your repository: `GeniusLabs-App`
   - Select branch: `main`
   - Click "Next"

3. **Configure Build Settings:**
   - App name: `GeniusLabs`
   - The `amplify.yml` file is already created and will be auto-detected
   - Click "Next"

4. **Add Environment Variables:**
   Click "Advanced settings" and add these environment variables:

   ```
   AWS_REGION=us-west-2
   AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>

   DYNAMODB_USER_PROGRESS_TABLE=genius-labs-user-progress
   DYNAMODB_MESSAGES_TABLE=genius-labs-messages
   DYNAMODB_ROLES_TABLE=genius-labs-user-roles
   DYNAMODB_USER_PROFILES_TABLE=genius-labs-user-profiles
   DYNAMODB_USER_ACHIEVEMENTS_TABLE=genius-labs-user-achievements

   # Add your Cognito variables (from .env.local)
   NEXT_PUBLIC_COGNITO_DOMAIN=your-cognito-domain
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
   NEXT_PUBLIC_COGNITO_REDIRECT_URI=https://main.YOUR_AMPLIFY_URL.amplifyapp.com/callback
   NEXT_PUBLIC_COGNITO_LOGOUT_URI=https://main.YOUR_AMPLIFY_URL.amplifyapp.com
   ```

   **⚠️ IMPORTANT**: You'll need to update the redirect URIs after deployment!

5. **Review and Deploy:**
   - Review all settings
   - Click "Save and Deploy"
   - Wait 5-10 minutes for initial deployment

### Step 3: Configure Cognito Redirect URLs

After deployment, you'll get a URL like: `https://main.d1234567890.amplifyapp.com`

1. **Update Cognito App Client:**
   - Go to AWS Cognito Console
   - Select your User Pool
   - Go to "App integration" → "App clients"
   - Select your app client
   - Update "Allowed callback URLs":
     ```
     https://main.YOUR_AMPLIFY_URL.amplifyapp.com/callback
     ```
   - Update "Allowed sign-out URLs":
     ```
     https://main.YOUR_AMPLIFY_URL.amplifyapp.com
     ```
   - Save changes

2. **Update Environment Variables in Amplify:**
   - Go back to Amplify Console
   - Click "Environment variables"
   - Update `NEXT_PUBLIC_COGNITO_REDIRECT_URI` and `NEXT_PUBLIC_COGNITO_LOGOUT_URI` with your actual Amplify URL
   - Save and redeploy

### Step 4: Set Up Custom Domain (Optional)

1. In Amplify Console, click "Domain management"
2. Click "Add domain"
3. Enter your domain (e.g., `geniuslabs.com`)
4. Follow the DNS configuration instructions
5. Wait for SSL certificate provisioning (~15 minutes)

---

## Option 2: AWS EC2 with Docker (Advanced)

If you prefer more control, you can deploy to EC2.

### Prerequisites:
- Docker installed on EC2 instance
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

### Quick Steps:

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Launch EC2 Instance:**
   - AMI: Amazon Linux 2023
   - Instance type: t3.small or larger
   - Security group: Allow ports 80, 443, 22

3. **Install Docker and Deploy:**
   ```bash
   # SSH into EC2
   ssh -i your-key.pem ec2-user@your-ec2-ip

   # Install Docker
   sudo yum update -y
   sudo yum install docker -y
   sudo service docker start
   sudo usermod -a -G docker ec2-user

   # Clone and build
   git clone https://github.com/YOUR_USERNAME/GeniusLabs-App.git
   cd GeniusLabs-App
   docker build -t geniuslabs .
   docker run -d -p 3000:3000 --env-file .env.production geniuslabs
   ```

4. **Set up Nginx reverse proxy with SSL**

---

## Option 3: AWS Elastic Beanstalk

Good middle ground between Amplify and EC2.

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize and Deploy:**
   ```bash
   eb init -p "Node.js 20" geniuslabs --region us-west-2
   eb create geniuslabs-prod
   eb setenv AWS_REGION=us-west-2 ... (all your env vars)
   eb deploy
   ```

---

## Environment Variables Checklist

Make sure ALL these are set in production:

### AWS Infrastructure:
- ✅ `AWS_REGION`
- ✅ `AWS_ACCESS_KEY_ID`
- ✅ `AWS_SECRET_ACCESS_KEY`

### DynamoDB Tables:
- ✅ `DYNAMODB_USER_PROGRESS_TABLE`
- ✅ `DYNAMODB_MESSAGES_TABLE`
- ✅ `DYNAMODB_ROLES_TABLE`
- ✅ `DYNAMODB_USER_PROFILES_TABLE`
- ✅ `DYNAMODB_USER_ACHIEVEMENTS_TABLE`

### Cognito Authentication:
- ⚠️ `NEXT_PUBLIC_COGNITO_DOMAIN`
- ⚠️ `NEXT_PUBLIC_COGNITO_CLIENT_ID`
- ⚠️ `NEXT_PUBLIC_COGNITO_REDIRECT_URI` (update after deployment!)
- ⚠️ `NEXT_PUBLIC_COGNITO_LOGOUT_URI` (update after deployment!)

---

## Post-Deployment Checklist

After deploying:

1. ✅ **Test Authentication Flow**
   - Try logging in
   - Try signing up
   - Verify redirects work

2. ✅ **Test DynamoDB Connections**
   - Complete a lesson
   - Check profile stats
   - Send a message in cohort chat

3. ✅ **Check All Routes**
   - /modules
   - /profile
   - /cohort
   - All lesson pages

4. ✅ **Monitor Logs**
   - Check CloudWatch logs for errors
   - Monitor API response times

5. ✅ **Set Up Monitoring**
   - CloudWatch alarms for errors
   - DynamoDB capacity monitoring

---

## Troubleshooting

### Build Fails
- Check Node.js version (should be 20+)
- Verify all dependencies in package.json
- Check build logs in Amplify console

### Authentication Not Working
- Verify Cognito redirect URLs match your deployment URL
- Check environment variables are set correctly
- Ensure Cognito app client has correct settings

### DynamoDB Connection Errors
- Verify IAM permissions for AWS credentials
- Check table names match environment variables
- Ensure region is correct (us-west-2)

### 500 Errors
- Check CloudWatch logs
- Verify all environment variables are set
- Check API route error handling

---

## Recommended: AWS Amplify

For GeniusLabs, I **strongly recommend AWS Amplify** because:

✅ **Easiest Setup**: Connect GitHub and deploy in minutes
✅ **Auto CI/CD**: Automatic deployments on git push
✅ **Built for Next.js**: Optimized for Next.js SSR and API routes
✅ **SSL Included**: Free SSL certificates
✅ **Custom Domains**: Easy domain configuration
✅ **Environment Variables**: Secure variable management
✅ **Preview Deployments**: Test branches before merging
✅ **Scalable**: Auto-scaling built-in
✅ **Cost-Effective**: Pay only for what you use

---

## Next Steps

1. Choose your deployment method (Amplify recommended)
2. Follow the step-by-step guide above
3. Update Cognito redirect URLs after deployment
4. Test all functionality
5. Set up custom domain (optional)
6. Monitor and optimize

Your app is production-ready! 🚀
