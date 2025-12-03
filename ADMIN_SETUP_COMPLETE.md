# Admin Panel - Complete Setup & Configuration Guide

## 📋 Pre-Setup Checklist

- [ ] Node.js v14+ installed
- [ ] MongoDB database running
- [ ] Git repository initialized
- [ ] Environment file (.env) ready
- [ ] Gmail account with 2FA enabled

---

## 🔧 Step 1: Backend Configuration

### 1.1 Install Dependencies
```bash
cd backend
npm install nodemailer  # if not already installed
```

### 1.2 Update .env File
```env
# Existing variables
MONGO_URI=mongodb://localhost:27017/sarvottam
CORS_ORIGIN=http://localhost:5174
PORT=3000

# New Admin Panel Variables
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
FRONTEND_URL=http://localhost:5174
```

### 1.3 Gmail Setup for Email Sending

**Steps to get Gmail App Password:**

1. Go to https://myaccount.google.com
2. Click **Security** in left sidebar
3. Under "How you sign in to Google", ensure **2-Step Verification** is ON
4. Go back to Security settings
5. Find **App passwords** (only visible if 2FA is enabled)
6. Select "Mail" and "Windows Computer" (or your device)
7. Google generates a 16-character password
8. Copy this and paste in `EMAIL_PASSWORD` in .env

```
Example: abcd efgh ijkl mnop (16 characters, no spaces when using)
```

### 1.4 Verify Backend Routes
Check `backend/index.js` contains:
```javascript
import adminRoutes from "./routes/admin.routes.js";
// ...
app.use("/api/admin", adminRoutes);
```

---

## 🔧 Step 2: Database Setup

### 2.1 Create Initial Collections
Run these in MongoDB:

```javascript
// Create AdminRequest collection with schema
db.createCollection("adminrequests");
db.adminrequests.createIndex({ email: 1 });
db.adminrequests.createIndex({ status: 1 });

// Create AdminUser collection with schema
db.createCollection("adminusers");
db.adminusers.createIndex({ email: 1 });
db.adminusers.createIndex({ userId: 1 });
```

### 2.2 Create Master Admin User

**First, create/identify a regular user to make master admin:**

```javascript
// Option 1: Create new user
db.users.insertOne({
  _id: ObjectId(),
  email: "arsir.personal@gmail.com",
  name: "Master Admin",
  password: "hashed-password",
  class: 10,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Then create admin user (copy the _id from above)
db.adminusers.insertOne({
  userId: ObjectId("paste-user-id-here"),
  email: "arsir.personal@gmail.com",
  role: "master_admin",
  permissions: {
    uploadNotes: true,
    uploadPYQ: true,
    manageEvents: true,
    sendNotifications: true,
    manageAdmins: true
  },
  approvalDate: new Date(),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

### 2.3 Verify Setup
```javascript
// Check collections exist
show collections;

// Verify master admin exists
db.adminusers.findOne({ role: "master_admin" });
```

---

## 🔧 Step 3: Frontend Configuration

### 3.1 Update API Base URL
Check `frontend/src/api/axios.js`:
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});
```

### 3.2 Create .env.local (if needed)
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3.3 Verify Frontend Routes
Check `frontend/src/App.jsx` contains admin routes:
- `/admin/login`
- `/admin/signup`
- `/admin/request-status`
- `/admin/dashboard`

---

## 🚀 Step 4: Running the Application

### 4.1 Start Backend
```bash
cd backend
npm start
# Should output: 🚀 Server running on http://localhost:3000
```

### 4.2 Start Frontend
```bash
cd frontend
npm run dev
# Should output: ➜ Local: http://localhost:5174
```

### 4.3 Test Backend APIs
```bash
# Test if backend is running
curl http://localhost:3000/

# Response should be JSON success message
```

---

## ✅ Step 5: Testing the Workflow

### Test Case 1: Submit Admin Request

1. Open http://localhost:5174/auth/login
2. Click **"Admin Login"** button
3. Click **"Request Admin Access"**
4. Fill form:
   - Name: Test Admin
   - Email: test@gmail.com
   - Reason: I want to manage content and help students
5. Click **Submit Request**
6. Should see success message

**Check Backend:**
```javascript
// In MongoDB
db.adminrequests.findOne({ email: "test@gmail.com" });
// Should return the request with status: "pending"
```

### Test Case 2: Check Request Status

1. Go to http://localhost:5174/admin/request-status
2. Should auto-load with the test email
3. Should show **"Request Under Review"** status

### Test Case 3: Master Admin Approval

1. Open http://localhost:5174/admin/login
2. Enter: **arsir.personal@gmail.com**
3. Should login successfully
4. Go to **"Admin Requests"** tab
5. Should see the test request
6. Click **"Approve"**
7. Should see success message

**Check Database:**
```javascript
// Request should now show approved
db.adminrequests.findOne({ email: "test@gmail.com" });

// AdminUser should be created
db.adminusers.findOne({ email: "test@gmail.com" });
```

### Test Case 4: Approved Admin Login

1. Go to http://localhost:5174/admin/login
2. Enter: **test@gmail.com**
3. Should redirect to dashboard
4. Should see admin panel with full access

### Test Case 5: Upload Notes

1. In admin dashboard, click **"Upload Notes"**
2. Fill form:
   - Subject: Maths
   - Class: 9
   - Title: Chapter 5: Quadratic Equations
   - Upload a PDF file
3. Click **Upload Notes**
4. Should see success message and file listed

### Test Case 6: Manage Events

1. Click **"Manage Events"**
2. Click **"Create New Event"**
3. Fill form:
   - Title: Science Fair 2025
   - Date: Select future date
   - Time: 10:00 AM
   - Location: School Auditorium
4. Click **Create Event**
5. Should see event in list

---

## 📧 Email Testing

### Check if Emails Are Being Sent

**Option 1: Console Logging**
Edit `backend/controllers/admin.controller.js`:
```javascript
const sendEmail = async (to, subject, html) => {
  try {
    console.log(`📧 Email: ${to}\nSubject: ${subject}`);
    // await transporter.sendMail(...);
    console.log("✅ Email would be sent");
  } catch (error) {
    console.error("Email send failed:", error);
  }
};
```

**Option 2: Use MailTrap (Testing Service)**
1. Create account at https://mailtrap.io
2. Copy SMTP credentials
3. Update `.env` with Mailtrap credentials
4. Check Mailtrap inbox for test emails

**Option 3: Gmail (Production)**
1. Update `.env` with Gmail credentials
2. Check Gmail inbox for actual emails

---

## 🔍 Debugging Common Issues

### Issue: "Cannot POST /api/admin/request-access"

**Solution:**
```bash
# 1. Check backend is running
curl http://localhost:3000/

# 2. Check admin routes are imported in index.js
grep "adminRoutes" backend/index.js

# 3. Restart backend
npm start
```

### Issue: "Email not sending"

**Solution:**
```bash
# 1. Verify Gmail credentials in .env
cat backend/.env

# 2. Check if 2FA is enabled on Gmail account
# 3. Verify app password is correct (no spaces)
# 4. Check Gmail allows "Less secure app access" (if not using app password)

# 5. Test email function directly
# Add to admin.controller.js:
console.log("Testing email with:", {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD.substring(0, 5) + "***"
});
```

### Issue: Admin request status page shows "No request found"

**Solution:**
```javascript
// Check if request exists in database
db.adminrequests.find({});

// Verify email matches exactly
db.adminrequests.findOne({ email: "exact-email@gmail.com" });
```

### Issue: Can't approve request (Master admin can't see requests)

**Solution:**
```javascript
// 1. Verify user is master admin
db.adminusers.findOne({ email: "arsir.personal@gmail.com" });

// Should show:
// role: "master_admin"
// isActive: true

// 2. If not, update user:
db.adminusers.updateOne(
  { email: "arsir.personal@gmail.com" },
  { $set: { role: "master_admin" } }
);
```

---

## 📱 Production Deployment

### Before Deploying:

1. **Update Environment Variables**
   ```env
   FRONTEND_URL=https://yourdomain.com
   EMAIL_USER=your-business-email@company.com
   EMAIL_PASSWORD=your-app-password
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/sarvottam
   CORS_ORIGIN=https://yourdomain.com
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   # Creates dist folder
   ```

3. **Test on Production Variables**
   - Use production email
   - Use production MongoDB
   - Test full workflow

4. **Security Checks**
   - [ ] No hardcoded secrets
   - [ ] All env variables set
   - [ ] CORS properly configured
   - [ ] Admin routes have auth middleware
   - [ ] File uploads validated

---

## 📊 Monitoring & Maintenance

### Regular Checks

```javascript
// Check admin user activity
db.adminusers.find({ isActive: true }).count();

// Check pending requests
db.adminrequests.find({ status: "pending" }).count();

// Check disk space for file uploads
// Monitor /uploads directory size
```

### Backup Strategy

```bash
# Backup AdminRequest collection
mongoexport --db sarvottam --collection adminrequests --out adminrequests_backup.json

# Backup AdminUser collection
mongoexport --db sarvottam --collection adminusers --out adminusers_backup.json

# Restore if needed
mongoimport --db sarvottam --collection adminrequests --file adminrequests_backup.json
```

---

## 📞 Support & Troubleshooting Contact

**Master Admin Email:** arsir.personal@gmail.com

**Common Questions:**
- Q: How do I become an admin?
  A: Request access from login page, wait for approval from master admin

- Q: How long does approval take?
  A: Master admin reviews requests regularly, typically within 24 hours

- Q: Can I use a non-Gmail account?
  A: Email system configured for Gmail, but can be adapted for other providers

- Q: What if my request is rejected?
  A: Contact master admin with the rejection reason to clarify

---

## 📝 Quick Verification Checklist

After setup, verify:

- [ ] Backend running on port 3000
- [ ] Frontend running on port 5174
- [ ] MongoDB connected and collections created
- [ ] Master admin created in database
- [ ] Email configuration working (test by submitting request)
- [ ] Admin login page accessible
- [ ] Can submit admin access request
- [ ] Admin request appears in database
- [ ] Master admin can view requests
- [ ] Can approve/reject requests
- [ ] Approved admin can log in
- [ ] Dashboard loads all features
- [ ] Upload forms work
- [ ] Events creation works
- [ ] Notifications can be sent

---

## 🎉 You're Ready!

Your admin panel is now fully set up and ready to use. Follow the Quick Reference guide for daily operations.

