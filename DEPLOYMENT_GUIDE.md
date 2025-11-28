# Sarvottam Institute - Deployment Guide

## Project Overview
- **Frontend**: React with Vite (port 5173/5176)
- **Backend**: Express.js (port 3000)
- **Database**: MongoDB Atlas (Cloud)
- **Email**: Gmail SMTP
- **Storage**: Multer for file uploads

---

## Deployment Options

### **Option 1: RECOMMENDED - Vercel (Frontend) + Railway/Render (Backend)**

#### Frontend Deployment on Vercel (FREE)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/EduGenie.git
   git push -u origin main
   ```

2. **Deploy Frontend on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` folder as root directory
   - Environment Variables: Add if needed
   - Deploy!

3. **Update API URL in Frontend**
   - In `frontend/src/api/axios.js`, update API base URL to your backend URL

#### Backend Deployment on Railway (FREE tier available)

1. **Push code to GitHub** (if not already done)

2. **Deploy on Railway**
   - Go to https://railway.app
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's a Node.js project
   - Add environment variables from your `.env`:
     ```
     MONGO_URI=your_mongodb_connection_string
     MAIL_USER=arsir.personal@gmail.com
     MAIL_PASS=your_app_password
     JWT_SECRET=your_jwt_secret
     CORS_ORIGIN=https://your-vercel-url.vercel.app
     ```
   - Deploy!

3. **Get Backend URL**
   - Railway will provide a public URL (e.g., `https://edugenie-prod.railway.app`)
   - Update this in your frontend's `axios.js`

---

### **Option 2: Netlify (Frontend) + Heroku/Railway (Backend)**

#### Frontend Deployment on Netlify

1. **Build frontend locally**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy on Netlify**
   - Go to https://netlify.com
   - Drag and drop the `frontend/dist` folder
   - Or connect GitHub for automatic deployments

3. **Add build command in Netlify settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Backend Deployment (Same as Option 1 with Railway)

---

### **Option 3: Full Stack on Single Server (AWS/DigitalOcean)**

#### Using DigitalOcean Droplet (Most affordable)

1. **Create DigitalOcean Account**
   - Go to https://digitalocean.com
   - Create a new Droplet (Ubuntu 22.04, 1GB RAM minimum)

2. **SSH into your Droplet**
   ```bash
   ssh root@your_droplet_ip
   ```

3. **Install Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y nginx
   sudo apt-get install -y certbot python3-certbot-nginx
   ```

4. **Clone Your Repository**
   ```bash
   cd /home
   git clone https://github.com/yourusername/EduGenie.git
   cd EduGenie
   ```

5. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

6. **Install Frontend Dependencies and Build**
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

7. **Setup Environment Variables**
   ```bash
   nano backend/.env
   # Add your environment variables
   ```

8. **Setup PM2 for Backend (Process Manager)**
   ```bash
   sudo npm install -g pm2
   cd backend
   pm2 start index.js --name "edugenie-backend"
   pm2 startup
   pm2 save
   ```

9. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Replace with:
   ```nginx
   upstream backend {
       server localhost:3000;
   }

   server {
       listen 80 default_server;
       listen [::]:80 default_server;
       server_name _;

       # Frontend
       location / {
           root /home/EduGenie/frontend/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api/ {
           proxy_pass http://backend;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. **Enable SSL Certificate (HTTPS)**
    ```bash
    sudo certbot --nginx -d yourdomain.com
    ```

11. **Restart Nginx**
    ```bash
    sudo systemctl restart nginx
    ```

---

### **Option 4: Docker + Cloud Run (Google Cloud)**

1. **Create Dockerfile for Backend**
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY backend/package*.json ./
   RUN npm install
   COPY backend/ ./
   EXPOSE 3000
   CMD ["node", "index.js"]
   ```

2. **Create Dockerfile for Frontend**
   ```dockerfile
   FROM node:18 as build
   WORKDIR /app
   COPY frontend/package*.json ./
   RUN npm install
   COPY frontend/ ./
   RUN npm run build

   FROM nginx:latest
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. **Deploy to Google Cloud Run**
   - Enable Cloud Run API
   - Deploy using Cloud Console or `gcloud` CLI

---

## Step-by-Step Recommended Deployment (Option 1)

### Prerequisites:
- GitHub Account
- Vercel Account (Free)
- Railway Account (Free)

### Steps:

**Step 1: Prepare Backend for Production**
```bash
cd backend
# Update .env with production values
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
```

**Step 2: Deploy Backend to Railway**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
- Go to railway.app → New Project → Deploy from GitHub
- Select your repo and connect

**Step 3: Deploy Frontend to Vercel**
- Go to vercel.com → New Project
- Import GitHub repo
- Set root directory: `frontend`
- Add environment variable:
  ```
  VITE_API_URL=https://your-railway-backend-url
  ```
- Deploy!

**Step 4: Update Frontend API Calls**
- Update `frontend/src/api/axios.js`:
  ```javascript
  const API = axios.create({
    baseURL: process.env.VITE_API_URL || 'http://localhost:3000'
  });
  ```

**Step 5: Test Everything**
- Visit your Vercel frontend URL
- Test login/signup
- Test all features

---

## Cost Breakdown

| Service | Free Tier | Paid Starting |
|---------|-----------|----------------|
| MongoDB Atlas | 512MB | $57/month |
| Vercel | Unlimited | $20/month |
| Railway | $5 credits/month | Pay as you go |
| Render | Limited | $7/month |
| DigitalOcean | - | $4/month |

**Estimated Monthly Cost (Free Tier)**: $0
**Estimated Monthly Cost (Production)**: $10-20

---

## Post-Deployment Checklist

- [ ] Verify CORS is configured correctly
- [ ] Test all authentication flows
- [ ] Test email OTP delivery
- [ ] Test protected routes
- [ ] Check console for errors
- [ ] Setup custom domain
- [ ] Enable HTTPS
- [ ] Setup CI/CD for automatic deployments
- [ ] Monitor performance
- [ ] Setup error logging
- [ ] Backup database regularly

---

## Troubleshooting

### CORS Errors
Update `backend/index.js`:
```javascript
const corsOptions = {
  origin: "https://your-frontend-url.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));
```

### Environment Variables Not Loading
Ensure `.env` is NOT in `.gitignore` for production secrets - use platform's secret management instead.

### MongoDB Connection Issues
- Verify IP whitelist in MongoDB Atlas
- Add `0.0.0.0/0` for development or specific server IP for production
- Check connection string format

### Email Delivery Issues
- Verify Gmail app password is correct
- Enable "Less secure app access" if needed
- Check spam folder

---

## Support & Resources
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com

---

## Quick Deploy Command (If using Railway CLI)

```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway up
```

---

**Ready to deploy? Choose Option 1 (Vercel + Railway) for the best beginner experience!**
