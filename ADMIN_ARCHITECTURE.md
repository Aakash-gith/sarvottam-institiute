# Admin Panel - Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
├─────────────────────────────────────────────────────────────┤
│  /auth/login → Admin Login Button                           │
│      ↓                                                      │
│  /admin/login ──→ AdminLogin Component                      │
│      ↓                                                      │
│  ├─→ /admin/signup ──→ AdminSignup Component               │
│  ├─→ /admin/request-status ──→ AdminRequestStatus Component │
│  └─→ /admin/dashboard ──→ AdminDashboard Component          │
│              ├─→ NotesUpload                               │
│              ├─→ PYQUpload                                 │
│              ├─→ EventsManager                             │
│              ├─→ NotificationsManager                      │
│              └─→ AdminRequests (Master only)               │
└─────────────────────────────────────────────────────────────┘
           │
           │ API Calls
           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js/Express)                   │
├─────────────────────────────────────────────────────────────┤
│  Routes (admin.routes.js)                                   │
│    ├─→ POST /api/admin/request-access                       │
│    ├─→ GET /api/admin/request-status                        │
│    ├─→ POST /api/admin/login                                │
│    ├─→ GET /api/admin/info                                  │
│    ├─→ GET /api/admin/pending-requests (Master)             │
│    ├─→ PUT /api/admin/approve/:id (Master)                  │
│    └─→ PUT /api/admin/reject/:id (Master)                   │
│           ↓                                                  │
│  Controllers (admin.controller.js)                          │
│    ├─→ requestAdminAccess()                                 │
│    ├─→ getAdminRequestStatus()                              │
│    ├─→ adminLogin()                                         │
│    ├─→ getPendingRequests()                                 │
│    ├─→ approveAdminRequest()                                │
│    └─→ rejectAdminRequest()                                 │
│           ↓                                                  │
│  Middleware (admin.middleware.js)                           │
│    ├─→ adminMiddleware                                      │
│    ├─→ masterAdminMiddleware                                │
│    └─→ checkPermission                                      │
│           ↓                                                  │
│  Models (MongoDB)                                           │
│    ├─→ AdminRequest                                         │
│    └─→ AdminUser                                            │
└─────────────────────────────────────────────────────────────┘
           │
           │ Email Notifications
           ↓
┌─────────────────────────────────────────────────────────────┐
│              Email Service (Nodemailer)                      │
├─────────────────────────────────────────────────────────────┤
│  New Request → Master Admin                                 │
│  Approval → User                                            │
│  Rejection → User                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Admin Request Lifecycle

```
┌──────────────────────────────────────────────────────────────┐
│                  ADMIN REQUEST PROCESS                        │
└──────────────────────────────────────────────────────────────┘

Step 1: Request Creation
  ┌─────────────────────┐
  │ User fills form:    │
  │ - Email             │
  │ - Full Name         │
  │ - Reason            │
  └──────────┬──────────┘
             ↓
  ┌─────────────────────────┐
  │ POST /api/admin/request │
  │ Creates AdminRequest    │
  │ Status: "pending"       │
  └──────────┬──────────────┘
             ↓
  ┌──────────────────────────────┐
  │ Email sent to Master Admin:  │
  │ arsir.personal@gmail.com     │
  └──────────┬───────────────────┘
             ↓
  ┌──────────────────────────┐
  │ User can check status at │
  │ /admin/request-status    │
  │ (Shows: Pending)         │
  └──────────────────────────┘

Step 2: Master Admin Review
  ┌──────────────────────────┐
  │ Master Admin views       │
  │ pending requests at      │
  │ /admin/dashboard         │
  │ → Admin Requests tab     │
  └──────────┬───────────────┘
             ↓
  ┌──────────────────────────┐
  │ Reviews request details: │
  │ - Name, Email            │
  │ - Reason for access      │
  │ - Request date           │
  └──────────┬───────────────┘
             ↓
  ┌──────────────────────────┐
  │ Two options:             │
  │                          │
  │ [✓ Approve] [✗ Reject]  │
  └──┬─────────────────────┬─┘
     │                     │
     ↓                     ↓
  APPROVED                REJECTED
     │                     │
     ↓                     ↓
  ┌────────────────┐   ┌──────────────┐
  │ Creates        │   │ Enter reason │
  │ AdminUser      │   │ for rejection│
  │ Status: active │   └──────┬───────┘
  └────────┬───────┘          ↓
           ↓          ┌──────────────────┐
  ┌─────────────────┐ │ Update status to │
  │ Email sent to   │ │ "rejected" with  │
  │ user with login │ │ rejection reason │
  │ instructions    │ └──────────┬───────┘
  └────────┬────────┘            ↓
           ↓            ┌──────────────────┐
  ┌──────────────────┐  │ Email sent to    │
  │ User can now:    │  │ user with reason │
  │ 1. Check status  │  └──────┬───────────┘
  │   (Shows Approved)│         ↓
  │ 2. Go to login   │  ┌──────────────────┐
  │ 3. Enter email   │  │ User can now:    │
  │ 4. Access full   │  │ 1. Check status  │
  │    dashboard     │  │   (Shows Rejected)
  │                  │  │ 2. Contact Master│
  │                  │  │    Admin for info│
  └──────────────────┘  └──────────────────┘
```

---

## Database Schema Relationships

```
┌─────────────────┐         ┌──────────────────┐
│   Users (OLD)   │         │ AdminRequest     │
├─────────────────┤         ├──────────────────┤
│ _id             │◄────┐   │ _id              │
│ email           │     │   │ email            │
│ name            │     │   │ fullName         │
│ ...             │     │   │ reason           │
└─────────────────┘     │   │ status (pending/ │
                        │   │  approved/reject)│
                        │   │ rejectionReason  │
                        │   │ requestDate      │
                        │   │ approvedBy (ref) │
                        │   │ approvedDate     │
                        │   └──────────────────┘
                        │
                        │
┌──────────────────┐    │
│  AdminUser       │    │
├──────────────────┤    │
│ _id              │    │
│ userId (ref) ────┼────┘
│ email            │
│ role (admin/     │
│  master_admin)   │
│ permissions {    │
│   uploadNotes    │
│   uploadPYQ      │
│   manageEvents   │
│   sendNotif...   │
│   manageAdmins   │
│ }                │
│ isActive         │
│ approvalDate     │
└──────────────────┘
```

---

## Permission Flow

```
Request comes in
       ↓
Is user authenticated?
   ├─ NO → Return 401 (auth.middleware)
   └─ YES ↓
       Is user an admin?
       (adminMiddleware)
       ├─ NO → Return 403
       └─ YES ↓
           Check specific permission
           (checkPermission)
           ├─ NO → Return 403
           └─ YES ↓
               ✓ Proceed to controller
```

---

## Frontend State Management

```
AdminDashboard.jsx
├─ adminInfo (state)
│  ├─ userId
│  ├─ email
│  ├─ role
│  └─ permissions
├─ activeTab (state)
│  ├─ "overview"
│  ├─ "notes"
│  ├─ "pyq"
│  ├─ "events"
│  ├─ "notifications"
│  └─ "admin-requests"
└─ sidebarOpen (state)

Each tab component manages:
├─ formData (state)
├─ loading (state)
├─ error (state)
└─ results (state)
```

---

## API Request/Response Flow

### Example: Request Admin Access

```
Frontend → POST /api/admin/request-access
Body: {
  email: "user@example.com",
  fullName: "John Doe",
  reason: "I want to manage content..."
}
    ↓
Backend validates input
    ↓
Check if already requested/approved
    ↓
Create AdminRequest document
    ↓
Send email to master admin
    ↓
Return 201 with success message
    ↓
Frontend redirects to /admin/request-status
    ↓
User can check status anytime
```

### Example: Approve Admin Request

```
Frontend → PUT /api/admin/approve/:requestId
Auth: Master Admin only
    ↓
Backend verifies master admin role
    ↓
Find AdminRequest by ID
    ↓
Create corresponding AdminUser
    ↓
Update AdminRequest status to "approved"
    ↓
Send approval email to user
    ↓
Return 200 with new AdminUser data
    ↓
Frontend refreshes pending list
    ↓
User receives email with login link
```

---

## Email Notification Templates

```
┌─ New Request Notification (Master Admin)
│  From: system
│  To: arsir.personal@gmail.com
│  Subject: New Admin Access Request
│  Body:
│    - User Name
│    - User Email
│    - Reason provided
│    - Link to admin panel
│
├─ Approval Notification (User)
│  From: system
│  To: user@example.com
│  Subject: Admin Access Approved!
│  Body:
│    - Congratulations message
│    - Link to login
│
└─ Rejection Notification (User)
   From: system
   To: user@example.com
   Subject: Admin Access Request Rejected
   Body:
     - Rejection reason
     - Contact info for questions
```

---

## Error Handling Flow

```
User Action
    ↓
Frontend validation
├─ Email invalid? → Show error
├─ Password too short? → Show error
└─ Required fields empty? → Show error
    ↓
Send to backend
    ↓
Backend validation
├─ Email exists? → Return 400
├─ Already requested? → Return 400
└─ Database error? → Return 500
    ↓
Frontend catches error
├─ Display toast notification
├─ Show error message
└─ Keep form data (user can retry)
    ↓
User corrects and retries
```

---

## Session & Token Management

```
User logs in with email
        ↓
Backend verifies AdminUser exists
        ↓
Return admin info + token
        ↓
Frontend stores:
├─ adminEmail (localStorage)
├─ adminToken (localStorage)
└─ adminInfo (component state)
        ↓
For subsequent requests:
├─ Include token in headers
├─ Backend verifies token
└─ Check admin permissions
        ↓
On logout:
├─ Clear localStorage
├─ Clear state
└─ Redirect to /admin/login
```

---

## Feature Access Decision Tree

```
User at /admin/dashboard
        ↓
Is token valid?
├─ NO → Redirect to /admin/login
└─ YES ↓
    Get admin info & permissions
        ↓
    Build menu based on role:
    ├─ All admins see:
    │  ├─ Overview
    │  ├─ Upload Notes (if permission)
    │  ├─ Upload PYQ (if permission)
    │  ├─ Manage Events (if permission)
    │  └─ Send Notifications (if permission)
    │
    └─ Master admin additionally sees:
       └─ Admin Requests
        ↓
    User clicks menu item
        ↓
    Check permission for feature
    ├─ NO → Disable or hide
    └─ YES → Load component
```

---

## Deployment Considerations

```
Development
├─ Frontend: localhost:5174
├─ Backend: localhost:3000
└─ Email: Gmail test account

Production
├─ Frontend: example.com
├─ Backend: api.example.com
├─ Email: business email
└─ Database: MongoDB Atlas
```

