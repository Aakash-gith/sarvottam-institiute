# 🎓 Sarvottam Institute - Complete Deployment Guide

## Quick Summary

Your Sarvottam Institute LMS is ready to deploy! Here's what you need to know:

### Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│                    Deployment: Vercel                        │
│                    URL: your-domain.vercel.app               │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express.js)                        │
│                  Deployment: Railway                         │
│                  URL: backend-xyz.railway.app                │
│                  Port: 3000 (internal)                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
        ┌─────────────────┐         ┌──────────────────┐
        │  MongoDB Atlas  │         │   Gmail SMTP     │
        │   (Database)    │         │   (Email/OTP)    │
        └─────────────────┘         └──────────────────┘
```

---

## 🚀 The Easiest Way to Deploy (Recommended)

### **Option 1: Vercel (Frontend) + Railway (Backend)** ⭐ BEST FOR BEGINNERS

This is the recommended approach because:
- ✅ Both have generous free tiers
- ✅ Easy to set up (no command line needed)
- ✅ Automatic deployments from GitHub
- ✅ SSL/HTTPS included
- ✅ Great for small to medium projects

**Estimated Time: 20 minutes**

#### Step 1: Push to GitHub

```bash
# From your project root
git init
git add .
git commit -m "Initial commit - Sarvottam Institute LMS"
git remote add origin https://github.com/YOUR_USERNAME/EduGenie.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy Backend on Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your EduGenie repository
6. Click "Add variables" and add these environment variables:

```
MONGO_URI=mongodb+srv://arsirpersonal_db_user:DbEngineer@aakash20.bmnyus7.mongodb.net/SarvottamDB
MAIL_USER=arsir.personal@gmail.com
MAIL_PASS=nciomyennwisbepq
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=https://your-frontend-will-be-deployed-here.vercel.app
NODE_ENV=production
PORT=3000
```

7. Railway will auto-detect it's Node.js and deploy automatically
8. Once deployed, you'll get a URL like: `https://edugenie-prod-xyz.railway.app`
9. Note this URL - you'll need it in the next step!

#### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the root directory to `frontend`
5. Click "Environment Variables" and add:

```
VITE_API_URL=https://edugenie-prod-xyz.railway.app
```
(Replace with your actual Railway backend URL from Step 2)

6. Click "Deploy"
7. Wait for deployment to complete
8. You'll get a URL like: `https://edugenie.vercel.app`
9. **Your website is now live!** 🎉

#### Step 4: Update Backend CORS

Go back to Railway and update the `CORS_ORIGIN` variable to your new Vercel URL:
```
CORS_ORIGIN=https://edugenie.vercel.app
```

---

## 📋 All Deployment Options

### Option 2: Netlify (Frontend) + Railway (Backend)

Similar to Option 1, but uses Netlify instead of Vercel:

1. Deploy backend same as Option 1
2. Go to https://netlify.com
3. Connect GitHub repository
4. Set build command: `cd frontend && npm run build`
5. Set publish directory: `frontend/dist`
6. Add environment variable: `VITE_API_URL=your_railway_url`
7. Deploy!

### Option 3: DigitalOcean Single Droplet

Best for full control and using your own domain:

1. Create DigitalOcean Droplet ($5-6/month)
2. SSH into server
3. Install Node.js and Nginx
4. Clone repository
5. Setup PM2 for backend
6. Configure Nginx as reverse proxy
7. Setup SSL with Let's Encrypt

[See detailed instructions in DEPLOYMENT_GUIDE.md]

### Option 4: Docker + Google Cloud Run

Best for scalability:

1. Create Docker images
2. Push to Google Container Registry
3. Deploy to Cloud Run

---

## 🔧 Environment Variables Explained

### Backend (.env)
```env
# MongoDB Connection
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/SarvottamDB

# Email Configuration (Gmail)
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password

# JWT Secret (Generate: require('crypto').randomBytes(32).toString('hex'))
JWT_SECRET=generate-a-random-secret-key

# Frontend URL (for CORS)
CORS_ORIGIN=https://your-frontend-url.vercel.app

# Environment
NODE_ENV=production
PORT=3000

# Optional: AI APIs (if using features)
GEMINI_API_KEY=your-key
OPENAI_API_KEY=your-key
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app
```

---

## ✅ Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] MongoDB connection string verified
- [ ] Gmail app password generated
- [ ] JWT secret generated (random string)
- [ ] Frontend builds successfully: `cd frontend && npm run build`
- [ ] No console errors in development mode
- [ ] All auth features tested (login, signup, OTP)
- [ ] Email OTP delivery tested
- [ ] Protected routes working

---

## 🧪 Testing Your Deployment

After deployment:

1. **Visit your frontend URL**
   ```
   https://your-app.vercel.app
   ```

2. **Test Authentication**
   - Try signing up with a valid email
   - Check if OTP is received
   - Verify account creation

3. **Check Console for Errors**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed API calls

4. **Verify API Connection**
   - Open DevTools → Network
   - Try login/signup
   - Check if requests go to your Railway backend URL

---

## 🆘 Common Issues & Solutions

### Issue: "CORS Error" or "Request blocked"
**Solution**: 
- Backend CORS_ORIGIN must match your frontend URL exactly
- Update in Railway dashboard
- Wait 2-3 minutes for changes to propagate

### Issue: "OTP not received"
**Solution**:
- Gmail app password may be incorrect
- Regenerate app password in Gmail settings
- Check spam folder
- Verify MAIL_USER and MAIL_PASS in .env

### Issue: "Cannot connect to MongoDB"
**Solution**:
- Verify MongoDB connection string is correct
- Add server IP to MongoDB Atlas whitelist: 0.0.0.0/0
- Check if database exists

### Issue: "Login fails but signup works"
**Solution**:
- Verify user was actually created in database
- Check MongoDB collection names
- Ensure JWT secret is the same in production

---

## 📊 Monitoring & Analytics

After deployment, monitor:

### Vercel Dashboard
- Go to vercel.com → Your Project
- View deployments, logs, and performance
- Enable analytics

### Railway Dashboard
- Go to railway.app → Your Project
- View logs and resource usage
- Check for crashes

---

## 🔄 Automatic Deployments

Both Vercel and Railway automatically redeploy when you push to GitHub:

```bash
# Any push to main branch triggers automatic deployment
git add .
git commit -m "Update: Fixed login bug"
git push origin main

# Wait 2-3 minutes for automatic deployment
```

---

## 💾 Backup & Data Safety

**MongoDB:**
- Atlas automatically backs up data
- Enable automated backups in Atlas settings
- Download backups monthly

**Code:**
- Stored safely on GitHub
- Branch protection recommended
- Use main/production branches carefully

---

## 🎯 Next Steps After Deployment

1. **Setup Custom Domain**
   - Buy domain from Namecheap, GoDaddy, etc.
   - Vercel: Add domain in project settings
   - Update Railway CORS_ORIGIN with new domain

2. **Enable Analytics**
   - Vercel Analytics (free tier available)
   - Google Analytics for frontend
   - Server logging for backend

3. **Setup Error Tracking**
   - Sentry for frontend errors
   - LogRocket for session replay

4. **Optimize Performance**
   - Enable caching
   - Image optimization
   - Database indexing

5. **Security Hardening**
   - Regular security updates
   - Rate limiting
   - Input validation

---

## 📞 Getting Help

If you encounter issues:

1. **Check logs**: Vercel and Railway dashboards
2. **Read error messages**: They usually tell you what's wrong
3. **Google the error**: Most issues have solutions online
4. **Community**: Railway and Vercel have active communities

---

## 🎉 Congratulations!

Your Sarvottam Institute is now live and accessible to students worldwide! 

**Your Site**: https://your-domain.vercel.app
**Admin Access**: Log in with your account

Start sharing with students and gathering feedback!

---

## 📚 Useful Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

**Questions? Check DEPLOYMENT_GUIDE.md for more detailed instructions!**
