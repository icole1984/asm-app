# 🚀 ASM App - Quick Start Guide

## ❓ "Why can I not find frontend?"

### Answer: You need to switch branches!

The frontend is in the `copilot/create-advanced-asm-dashboard-ui` branch.

---

## ⚡ Quick Fix (30 seconds)

Copy and paste these commands:

```bash
# 1. Switch to the correct branch
git checkout copilot/create-advanced-asm-dashboard-ui

# 2. Verify frontend exists
ls -la frontend/

# 3. Install dependencies
npm install

# 4. Start the frontend
npm run dev -w frontend
```

**Then open**: http://localhost:3000

---

## 🔍 Understanding the Issue

### Your Current Situation
```
You cloned the repository
     ↓
You're on the 'main' branch
     ↓
The 'main' branch has NO frontend
     ↓
You ask: "why can i not find frontend?"
```

### The Solution
```
Switch to 'copilot/create-advanced-asm-dashboard-ui' branch
     ↓
This branch HAS the frontend
     ↓
Frontend found! 🎉
```

---

## 📊 Branch Comparison

| What                | Main Branch | Feature Branch |
|---------------------|-------------|----------------|
| Backend             | ✅ Yes      | ✅ Yes (updated)|
| Frontend            | ❌ No       | ✅ **YES!**    |
| Documentation       | ❌ Limited  | ✅ Complete    |
| Security Updates    | ❌ No       | ✅ Yes         |

**You want**: Feature Branch (`copilot/create-advanced-asm-dashboard-ui`)

---

## 🎯 Step-by-Step Solution

### Step 1: Check Where You Are
```bash
git branch --show-current
```

**Expected Output:**
- ❌ If it says `main` or `master` → You're in the WRONG place
- ✅ If it says `copilot/create-advanced-asm-dashboard-ui` → You're in the RIGHT place!

### Step 2: Go to the Right Place
```bash
git checkout copilot/create-advanced-asm-dashboard-ui
```

**Expected Output:**
```
Switched to branch 'copilot/create-advanced-asm-dashboard-ui'
```

### Step 3: Confirm Frontend Exists
```bash
ls frontend/
```

**Expected Output:**
```
README.md  index.html  package.json  src  tsconfig.json  vite.config.ts
```

✅ If you see these files, you found it!

### Step 4: Run the Frontend
```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev -w frontend
```

**Expected Output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
```

### Step 5: Open in Browser
Visit: **http://localhost:3000**

You should see:
- Beautiful dashboard with dark sidebar
- Charts and statistics
- Sites, Operations, Documents, Checklists pages

---

## 🛠️ Troubleshooting

### Problem: "fatal: pathspec 'copilot/create-advanced-asm-dashboard-ui' did not match"

**Solution:**
```bash
# Fetch all branches from remote
git fetch --all

# Try again
git checkout copilot/create-advanced-asm-dashboard-ui
```

### Problem: "Frontend directory still not visible"

**Solution:**
```bash
# Verify you switched branches
git branch --show-current

# Should output: copilot/create-advanced-asm-dashboard-ui
# If not, run the checkout command again
```

### Problem: "Port 3000 is already in use"

**Solution:**
```bash
# Find what's using port 3000
lsof -i :3000

# Change the port in frontend/vite.config.ts to a different port
# Or stop the other process
```

---

## 📚 More Information

Once you've found the frontend, explore these docs:

1. **`README.md`** → Complete project overview
2. **`BRANCH_INFO.md`** → Detailed branch explanation
3. **`frontend/README.md`** → Frontend-specific guide
4. **`verify-frontend.sh`** → Run this script to auto-check everything

---

## 🎉 Success Checklist

- [ ] Switched to `copilot/create-advanced-asm-dashboard-ui` branch
- [ ] Can see `frontend/` directory with `ls`
- [ ] Installed dependencies with `npm install`
- [ ] Started dev server with `npm run dev -w frontend`
- [ ] Opened http://localhost:3000 in browser
- [ ] Can see the ASM Dashboard UI

If all boxes are checked, you're all set! 🚀

---

## 💡 Remember

**Frontend Location**: `copilot/create-advanced-asm-dashboard-ui` branch  
**Quick Switch**: `git checkout copilot/create-advanced-asm-dashboard-ui`  
**Verify**: `./verify-frontend.sh`  
**Run**: `npm run dev -w frontend`  

**Bookmark this file for quick reference!**
