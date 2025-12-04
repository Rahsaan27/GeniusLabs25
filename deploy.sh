#!/bin/bash

echo "🚀 GeniusLabs Deployment Helper"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo ""
    echo "⚠️  You have uncommitted changes:"
    git status -s
    echo ""
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        git add .
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    fi
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo ""
    echo "📡 No remote repository found."
    echo "Please create a repository on GitHub first, then enter the URL:"
    read -p "GitHub repository URL: " repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote added"
fi

# Push to remote
echo ""
echo "📤 Pushing to remote repository..."
git push -u origin main 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "🎉 Next Steps:"
    echo "=============="
    echo "1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/"
    echo "2. Click 'Get Started' under 'Amplify Hosting'"
    echo "3. Connect your GitHub repository"
    echo "4. Configure environment variables (see .env.production.example)"
    echo "5. Deploy!"
    echo ""
    echo "📖 Full guide: See DEPLOYMENT_GUIDE.md"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "- Make sure you've created the GitHub repository"
    echo "- Check your GitHub authentication"
    echo "- Verify the repository URL is correct"
fi
