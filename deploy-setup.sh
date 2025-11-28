#!/bin/bash

# Sarvottam Institute - Quick Deployment Setup Script
# This script prepares your project for deployment

echo "🚀 Sarvottam Institute - Deployment Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Initializing...${NC}"
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
fi

echo -e "${BLUE}1️⃣  Building Frontend...${NC}"
cd frontend
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend build successful!${NC}"
else
    echo -e "${RED}❌ Frontend build failed!${NC}"
    exit 1
fi
cd ..

echo ""
echo -e "${BLUE}2️⃣  Frontend build files location:${NC}"
echo "   frontend/dist/"

echo ""
echo -e "${BLUE}3️⃣  Environment Variables to Set:${NC}"
echo "   Backend (.env):"
echo "   - MONGO_URI"
echo "   - MAIL_USER"
echo "   - MAIL_PASS"
echo "   - JWT_SECRET"
echo "   - CORS_ORIGIN (your frontend URL)"
echo ""
echo "   Frontend (.env or environment variable):"
echo "   - VITE_API_URL (your backend URL)"

echo ""
echo -e "${BLUE}4️⃣  Recommended Deployment Platforms:${NC}"
echo "   Frontend: Vercel (https://vercel.com)"
echo "   Backend:  Railway (https://railway.app)"

echo ""
echo -e "${BLUE}5️⃣  Quick Deploy Steps:${NC}"
echo ""
echo "   Frontend (Vercel):"
echo "   1. Push to GitHub"
echo "   2. Go to vercel.com → Import Project"
echo "   3. Select your repository"
echo "   4. Set root directory: frontend"
echo "   5. Add environment variables"
echo "   6. Deploy!"
echo ""
echo "   Backend (Railway):"
echo "   1. Go to railway.app → New Project"
echo "   2. Connect your GitHub repository"
echo "   3. Add environment variables"
echo "   4. Deploy!"

echo ""
echo -e "${BLUE}6️⃣  To Push to GitHub:${NC}"
echo "   git remote add origin https://github.com/YOUR_USERNAME/EduGenie.git"
echo "   git branch -M main"
echo "   git push -u origin main"

echo ""
echo -e "${GREEN}✅ Setup complete! Read DEPLOYMENT_GUIDE.md for detailed instructions.${NC}"
echo ""
