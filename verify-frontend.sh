#!/bin/bash

# Frontend Verification Script
# This script helps verify that the frontend exists and is properly set up

echo "🔍 ASM App - Frontend Verification Script"
echo "=========================================="
echo ""

# Check current branch
echo "📌 Current branch:"
CURRENT_BRANCH=$(git branch --show-current)
echo "   $CURRENT_BRANCH"
echo ""

# Check if we're on the right branch
if [ "$CURRENT_BRANCH" = "copilot/create-advanced-asm-dashboard-ui" ]; then
    echo "✅ You're on the correct branch!"
else
    echo "⚠️  You're NOT on the frontend branch!"
    echo "   Switch to it with: git checkout copilot/create-advanced-asm-dashboard-ui"
    echo ""
fi

# Check if frontend directory exists
if [ -d "frontend" ]; then
    echo "✅ Frontend directory exists"
    echo ""
    
    # List frontend structure
    echo "📁 Frontend structure:"
    tree -L 2 frontend/ 2>/dev/null || ls -la frontend/
    echo ""
    
    # Check key files
    echo "📄 Key files check:"
    [ -f "frontend/package.json" ] && echo "   ✅ package.json" || echo "   ❌ package.json missing"
    [ -f "frontend/vite.config.ts" ] && echo "   ✅ vite.config.ts" || echo "   ❌ vite.config.ts missing"
    [ -f "frontend/src/App.tsx" ] && echo "   ✅ src/App.tsx" || echo "   ❌ src/App.tsx missing"
    [ -f "frontend/src/main.tsx" ] && echo "   ✅ src/main.tsx" || echo "   ❌ src/main.tsx missing"
    [ -f "frontend/src/index.css" ] && echo "   ✅ src/index.css" || echo "   ❌ src/index.css missing"
    echo ""
    
    # Check if dependencies are installed
    if [ -d "frontend/node_modules" ]; then
        echo "✅ Dependencies are installed"
    else
        echo "⚠️  Dependencies not installed"
        echo "   Run: npm install"
    fi
    echo ""
    
    # Check if can build
    echo "🔨 Build status:"
    if [ -d "frontend/dist" ]; then
        echo "   ✅ Build output exists (dist/)"
        echo "   To rebuild: npm run build -w frontend"
    else
        echo "   ℹ️  No build output found"
        echo "   To build: npm run build -w frontend"
    fi
    echo ""
    
    # Success message
    echo "🎉 Frontend is properly set up!"
    echo ""
    echo "📚 Next steps:"
    echo "   1. Install dependencies: npm install"
    echo "   2. Start dev server: npm run dev -w frontend"
    echo "   3. Open browser: http://localhost:3000"
    echo ""
    echo "📖 For more info, see:"
    echo "   - README.md (root)"
    echo "   - frontend/README.md"
    echo "   - BRANCH_INFO.md"
    
else
    echo "❌ Frontend directory NOT found!"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   1. Check your current branch:"
    echo "      git branch"
    echo ""
    echo "   2. Switch to the frontend branch:"
    echo "      git checkout copilot/create-advanced-asm-dashboard-ui"
    echo ""
    echo "   3. If that doesn't work, fetch from remote:"
    echo "      git fetch --all"
    echo "      git checkout copilot/create-advanced-asm-dashboard-ui"
    echo ""
    echo "   4. List all branches to verify:"
    echo "      git branch -a"
    echo ""
    echo "📖 See BRANCH_INFO.md for more details"
fi

echo ""
echo "=========================================="
