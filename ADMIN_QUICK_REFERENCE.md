# Admin Panel - Quick Reference

## Access Points

### For Regular Users
1. Go to `/auth/login` (student login)
2. Click **"Admin Login"** button at the bottom
3. Choose to login or request access

### For Admins
- **Login**: `/admin/login`
- **Request Access**: `/admin/signup`
- **Check Status**: `/admin/request-status`
- **Dashboard**: `/admin/dashboard`

---

## User Roles

### Regular Admin
- ✅ Upload Notes
- ✅ Upload PYQ
- ✅ Manage Events
- ✅ Send Notifications
- ❌ Manage Admin Requests

### Master Admin (`arsir.personal@gmail.com`)
- ✅ Upload Notes
- ✅ Upload PYQ
- ✅ Manage Events
- ✅ Send Notifications
- ✅ **Manage Admin Requests**
- ✅ Approve/Reject admins

---

## Admin Request Workflow

```
User Requests Access
        ↓
Email sent to Master Admin
        ↓
Master Admin Reviews
        ↓
        ├→ Approve → Instant Access (User gets email)
        └→ Reject → Access Denied (User gets reason)
```

---

## Key API Endpoints

### Public
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/admin/request-access` | Submit admin request |
| GET | `/api/admin/request-status` | Check request status |
| POST | `/api/admin/login` | Verify admin email |

### Protected (Auth + Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/info` | Get admin info |
| GET | `/api/admin/pending-requests` | List pending (Master only) |
| PUT | `/api/admin/approve/:id` | Approve request (Master only) |
| PUT | `/api/admin/reject/:id` | Reject request (Master only) |

---

## Environment Variables

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5174
```

---

## Database Quick Commands

### Create Master Admin
```javascript
db.adminusers.insertOne({
  userId: ObjectId("user-id"),
  email: "arsir.personal@gmail.com",
  role: "master_admin",
  permissions: {
    uploadNotes: true,
    uploadPYQ: true,
    manageEvents: true,
    sendNotifications: true,
    manageAdmins: true
  },
  isActive: true
})
```

### Check Pending Requests
```javascript
db.adminrequests.find({ status: "pending" })
```

### View All Admins
```javascript
db.adminusers.find({})
```

---

## Frontend Component Structure

```
AdminLogin.jsx
  ↓
  ├→ Request Access → AdminSignup.jsx
  ├→ Check Status → AdminRequestStatus.jsx
  └→ Dashboard → AdminDashboard.jsx
              ├→ NotesUpload.jsx
              ├→ PYQUpload.jsx
              ├→ EventsManager.jsx
              ├→ NotificationsManager.jsx
              └→ AdminRequests.jsx (Master only)
```

---

## Common Tasks

### How to Request Admin Access
1. Go to `/admin/login`
2. Click "Request Admin Access"
3. Fill in name, email, reason
4. Submit and wait for email

### How to Check Request Status
1. Go to `/admin/request-status`
2. Your status auto-loads if email is stored
3. See "Pending", "Approved", or "Rejected"

### How to Approve Admin (Master Admin)
1. Log in as master admin
2. Go to "Admin Requests" tab
3. Click "Approve" button
4. Admin receives email and can now log in

### How to Reject Admin (Master Admin)
1. Go to "Admin Requests" tab
2. Click "Reject" button
3. Enter rejection reason
4. Admin receives email with reason

### How to Upload Notes
1. Log in to admin dashboard
2. Go to "Upload Notes" tab
3. Select subject, class, add title
4. Upload PDF/image file
5. Submit

### How to Upload PYQ
1. Go to "Upload PYQ" tab
2. Select subject, class, year, exam type
3. Upload file
4. Submit

### How to Create Event
1. Go to "Manage Events" tab
2. Click "Create New Event"
3. Fill title, date, time, location
4. Submit

### How to Send Notification
1. Go to "Send Notifications" tab
2. Add title and message
3. Choose target audience (all or specific class)
4. Set priority level
5. Send

---

## Permissions Matrix

| Feature | Admin | Master Admin |
|---------|:-----:|:------------:|
| Upload Notes | ✓ | ✓ |
| Upload PYQ | ✓ | ✓ |
| Manage Events | ✓ | ✓ |
| Send Notifications | ✓ | ✓ |
| View Requests | ✗ | ✓ |
| Approve Admins | ✗ | ✓ |
| Reject Admins | ✗ | ✓ |
| Manage Permissions | ✗ | ✓ |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Email not sending | Check `EMAIL_USER` and `EMAIL_PASSWORD` in .env |
| Can't log in | Ensure email exists in AdminUser collection |
| Request not showing | Check AdminRequest collection in MongoDB |
| Admin panel is blank | Check browser console for errors |
| Can't upload files | Verify file size < 50MB and format is PDF/image |

---

## Master Admin Email
**`arsir.personal@gmail.com`**

All admin requests go here for review and approval.

---

## Files at a Glance

### Backend
- Models: `AdminRequest.js`, `AdminUser.js`
- Controller: `admin.controller.js`
- Middleware: `admin.middleware.js`
- Routes: `admin.routes.js`

### Frontend
- Pages: `Admin/AdminLogin.jsx`, `Admin/AdminSignup.jsx`, `Admin/AdminRequestStatus.jsx`, `Admin/AdminDashboard.jsx`
- Components: `admin/NotesUpload.jsx`, `admin/PYQUpload.jsx`, `admin/EventsManager.jsx`, `admin/NotificationsManager.jsx`, `admin/AdminRequests.jsx`

---

## Quick Test Checklist

- [ ] Access `/admin/login` without errors
- [ ] Can submit admin access request
- [ ] Master admin receives email
- [ ] Can approve request from dashboard
- [ ] Approved admin can log in
- [ ] Upload notes works
- [ ] Upload PYQ works
- [ ] Create events works
- [ ] Send notifications works
- [ ] Admin request dashboard shows history

---

## Performance Tips

1. **Database Indexes**: Run migrations for better performance
2. **File Upload**: Optimize file size limits based on server capacity
3. **Email Queue**: Consider adding email queue for bulk operations
4. **Caching**: Cache admin permissions after login

---

## Security Reminders

- 🔒 Always verify user is authenticated
- 🔒 Check role before granting access
- 🔒 Validate all file uploads
- 🔒 Sanitize user inputs
- 🔒 Use environment variables for secrets
- 🔒 Log all admin activities

---

## Contact

**Master Admin Email**: arsir.personal@gmail.com

