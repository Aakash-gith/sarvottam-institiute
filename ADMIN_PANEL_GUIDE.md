# Admin Panel - Complete Setup Guide

## Overview
A comprehensive admin panel system for Sarvottam Institute with approval workflow, multi-admin management, and content management capabilities.

## Features Implemented

### 1. **Admin Authentication & Approval Workflow**
- Admin signup request with reason submission
- Master admin approval/rejection system
- Email notifications for all actions
- Request status tracking for pending requests
- Rejection reason communication

### 2. **Admin Dashboard**
- Clean, intuitive UI with sidebar navigation
- Role-based access control (Admin vs Master Admin)
- Permission-based feature visibility
- Quick stats and overview cards

### 3. **Content Management**
- **Upload Notes**: Share study materials by subject and class
- **Upload PYQ**: Manage previous year question papers
- **Manage Events**: Create, edit, and delete events
- **Send Notifications**: Broadcast messages to students with priority levels

### 4. **Master Admin Features**
- View all pending admin requests
- Approve or reject requests with reasons
- Manage admin permissions
- Access to all admin features plus additional controls

---

## Backend Setup

### Models Created

#### AdminRequest Model
```javascript
{
  email: String,
  fullName: String,
  reason: String,
  status: "pending" | "approved" | "rejected",
  rejectionReason: String,
  requestDate: Date,
  approvedBy: ObjectId,
  approvedDate: Date
}
```

#### AdminUser Model
```javascript
{
  userId: ObjectId,
  email: String,
  role: "admin" | "master_admin",
  permissions: {
    uploadNotes: Boolean,
    uploadPYQ: Boolean,
    manageEvents: Boolean,
    sendNotifications: Boolean,
    manageAdmins: Boolean
  },
  approvalDate: Date,
  isActive: Boolean
}
```

### API Endpoints

#### Public Endpoints
- `POST /api/admin/request-access` - Submit admin access request
- `GET /api/admin/request-status?email=...` - Check request status
- `POST /api/admin/login` - Admin login verification

#### Protected Endpoints (Auth Required)
- `GET /api/admin/info` - Get current admin info
- `GET /api/admin/pending-requests` - Get pending requests (Master Admin only)
- `PUT /api/admin/approve/:requestId` - Approve request (Master Admin only)
- `PUT /api/admin/reject/:requestId` - Reject request (Master Admin only)

### Environment Variables

Add to `.env` file:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5174
```

**Gmail Setup for Email:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `EMAIL_PASSWORD`

---

## Frontend Routes

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/signup` - Request admin access
- `/admin/request-status` - Check approval status
- `/admin/dashboard` - Main admin dashboard

### Entry Point
- **Regular Login**: Added "Admin Login" button below signup on `/auth/login`

---

## User Flow

### For New Admin:
1. Click "Admin Login" on student login page
2. Choose "Request Admin Access"
3. Fill in name, email, and reason for admin access
4. Wait for email with approval status
5. Once approved, return to `/admin/login` and log in with email
6. Access full admin dashboard

### For Master Admin:
1. Master admin credentials set up in database
2. Login with email on `/admin/login`
3. Access admin requests approval page
4. Review pending requests and approve/reject with reasons
5. Approved admins can immediately access dashboard

---

## Setting Up Master Admin

### Initial Setup (One-Time)
1. **Create the first Admin User** in MongoDB:

```javascript
// In MongoDB:
db.adminusers.insertOne({
  userId: ObjectId("user-id-here"),
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
  isActive: true
})
```

2. **Ensure user exists** in Users collection:
```javascript
// Create user if doesn't exist
db.users.insertOne({
  email: "arsir.personal@gmail.com",
  name: "Master Admin",
  // other fields...
})
```

3. **Get Auth Token**: Use the regular authentication to get a token for master admin email
4. **Access Dashboard**: Navigate to `/admin/login` and use master admin email

---

## Testing Workflow

### Test Scenario 1: Regular Admin Request
1. Go to `/admin/login`
2. Click "Request Admin Access"
3. Fill form with test data
4. Check email for confirmation
5. Master admin approves from dashboard
6. New admin can log in

### Test Scenario 2: Admin Functions
1. Log in as admin
2. Test each feature:
   - Upload Notes
   - Upload PYQ
   - Create Events
   - Send Notifications
3. Verify all data is saved/displayed

### Test Scenario 3: Master Admin Requests
1. Log in as master admin
2. Navigate to "Admin Requests"
3. Approve/Reject pending requests
4. Verify emails are sent
5. Check approved admin can now log in

---

## Database Migrations

Run these in MongoDB to create indexes for better performance:

```javascript
// AdminRequest indexes
db.adminrequests.createIndex({ email: 1 });
db.adminrequests.createIndex({ status: 1 });
db.adminrequests.createIndex({ requestDate: -1 });

// AdminUser indexes
db.adminusers.createIndex({ email: 1 });
db.adminusers.createIndex({ userId: 1 });
db.adminusers.createIndex({ role: 1 });
```

---

## File Structure

### Backend Files Created
- `models/AdminRequest.js` - Admin request schema
- `models/AdminUser.js` - Admin user schema
- `controllers/admin.controller.js` - Admin business logic
- `middleware/admin.middleware.js` - Admin authentication middleware
- `routes/admin.routes.js` - Admin API routes

### Frontend Files Created
- `pages/Admin/AdminLogin.jsx` - Admin login page
- `pages/Admin/AdminSignup.jsx` - Request admin access
- `pages/Admin/AdminRequestStatus.jsx` - Check status
- `pages/Admin/AdminDashboard.jsx` - Main dashboard
- `components/admin/NotesUpload.jsx` - Notes upload form
- `components/admin/PYQUpload.jsx` - PYQ upload form
- `components/admin/EventsManager.jsx` - Events management
- `components/admin/NotificationsManager.jsx` - Notification sender
- `components/admin/AdminRequests.jsx` - Master admin panel

---

## Security Considerations

1. **Authentication**: All admin routes require authentication token
2. **Authorization**: Permission middleware checks specific permissions
3. **Master Admin Only**: Certain routes can only be accessed by master admin
4. **Email Verification**: Admin requests verified via email
5. **Rejection Reasons**: All rejections documented with reason

---

## Future Enhancements

1. **Analytics Dashboard**: Track admin activities
2. **Bulk Upload**: CSV/Excel upload for notes and PYQ
3. **Permission Management**: Dynamic permission assignment per admin
4. **Activity Logs**: Track all admin actions
5. **Scheduled Notifications**: Queue notifications for later sending
6. **Content Moderation**: Review content before publishing

---

## Troubleshooting

### Issue: Email not sending
**Solution**: 
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- Verify Gmail App Password (not regular password)
- Ensure 2FA is enabled on Gmail

### Issue: Admin login page blank
**Solution**:
- Ensure all admin components are properly imported in App.jsx
- Check browser console for errors
- Verify routes are correctly configured

### Issue: Admin request not showing in master admin panel
**Solution**:
- Verify user is logged in as master admin
- Check database for AdminRequest document
- Ensure user has master_admin role in AdminUser collection

---

## Contact & Support

For issues or questions:
- Email Master Admin: arsir.personal@gmail.com
- Check browser console for detailed error messages
- Verify all environment variables are set correctly

