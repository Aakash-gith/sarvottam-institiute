# Admin Panel - Complete API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 🔓 Public Endpoints (No Authentication Required)

### 1. Request Admin Access
Submit a new admin access request.

**Endpoint:** `POST /admin/request-access`

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "reason": "I want to manage study materials and help students learn better"
}
```

**Validation:**
- `email`: Required, valid email format, unique
- `fullName`: Required, string
- `reason`: Required, string (min 20 characters for production)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin access request submitted. Please wait for approval.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullName": "John Doe",
    "reason": "...",
    "status": "pending",
    "requestDate": "2025-12-02T10:30:00Z"
  }
}
```

**Error Responses:**
```json
// 400 - Missing fields
{
  "success": false,
  "message": "Email, fullName, and reason are required"
}

// 400 - Already requested
{
  "success": false,
  "message": "Your request is already pending"
}

// 400 - Already approved
{
  "success": false,
  "message": "You already have admin access"
}

// 400 - Duplicate email
{
  "success": false,
  "message": "Email must be unique"
}
```

---

### 2. Get Admin Request Status
Check the status of an admin access request.

**Endpoint:** `GET /admin/request-status?email=user@example.com`

**Query Parameters:**
- `email`: Required, email address to check

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullName": "John Doe",
    "reason": "...",
    "status": "pending",
    "requestDate": "2025-12-02T10:30:00Z",
    "approvedBy": null,
    "approvedDate": null,
    "rejectionReason": null
  }
}
```

**Pending Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "pending",
    "requestDate": "2025-12-02T10:30:00Z"
  }
}
```

**Approved Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "approved",
    "approvedDate": "2025-12-02T15:45:00Z"
  }
}
```

**Rejected Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "rejected",
    "rejectionReason": "Insufficient experience"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "No request found"
}
```

---

### 3. Admin Login
Verify admin email and get access token.

**Endpoint:** `POST /admin/login`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin verified",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439010",
    "email": "user@example.com",
    "role": "admin",
    "permissions": {
      "uploadNotes": true,
      "uploadPYQ": true,
      "manageEvents": true,
      "sendNotifications": true,
      "manageAdmins": false
    },
    "isActive": true
  }
}
```

**Pending Response (403):**
```json
{
  "success": false,
  "message": "pending",
  "data": {
    "requestDate": "2025-12-02T10:30:00Z",
    "masterAdminEmail": "arsir.personal@gmail.com"
  }
}
```

**Rejected Response (403):**
```json
{
  "success": false,
  "message": "rejected",
  "data": {
    "rejectionReason": "Insufficient experience",
    "masterAdminEmail": "arsir.personal@gmail.com"
  }
}
```

**Not Found Response (403):**
```json
{
  "success": false,
  "message": "notfound",
  "data": {
    "masterAdminEmail": "arsir.personal@gmail.com"
  }
}
```

---

## 🔒 Protected Endpoints (Authentication Required)

All protected endpoints require authentication token. Include in headers:
```
Authorization: Bearer <token>
```

### 4. Get Admin Info
Get current authenticated admin's information.

**Endpoint:** `GET /admin/info`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": {
      "_id": "507f1f77bcf86cd799439010",
      "email": "user@example.com",
      "name": "John Doe",
      "class": 10
    },
    "email": "user@example.com",
    "role": "admin",
    "permissions": {
      "uploadNotes": true,
      "uploadPYQ": true,
      "manageEvents": true,
      "sendNotifications": true,
      "manageAdmins": false
    },
    "approvalDate": "2025-12-02T15:45:00Z",
    "isActive": true
  }
}
```

**Error Responses:**
```json
// 401 - No token
{
  "success": false,
  "message": "Authentication required"
}

// 404 - Admin not found
{
  "success": false,
  "message": "Admin user not found"
}
```

---

## 👑 Master Admin Endpoints

### 5. Get Pending Admin Requests
Get all pending admin access requests (Master Admin only).

**Endpoint:** `GET /admin/pending-requests`

**Headers:**
```
Authorization: Bearer <master-admin-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user1@example.com",
      "fullName": "John Doe",
      "reason": "I want to manage content...",
      "status": "pending",
      "requestDate": "2025-12-02T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "email": "user2@example.com",
      "fullName": "Jane Smith",
      "reason": "I can help with PYQ...",
      "status": "pending",
      "requestDate": "2025-12-02T11:00:00Z"
    }
  ]
}
```

**Error Responses:**
```json
// 403 - Not master admin
{
  "success": false,
  "message": "Unauthorized - Only master admin can access this"
}

// 401 - Not authenticated
{
  "success": false,
  "message": "Authentication required"
}
```

---

### 6. Approve Admin Request
Approve an admin access request (Master Admin only).

**Endpoint:** `PUT /admin/approve/:requestId`

**URL Parameters:**
- `requestId`: MongoDB ObjectId of the request to approve

**Headers:**
```
Authorization: Bearer <master-admin-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin request approved",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439010",
    "email": "user@example.com",
    "role": "admin",
    "permissions": {
      "uploadNotes": true,
      "uploadPYQ": true,
      "manageEvents": true,
      "sendNotifications": true,
      "manageAdmins": false
    },
    "approvalDate": "2025-12-02T15:45:00Z",
    "isActive": true
  }
}
```

**Error Responses:**
```json
// 403 - Not master admin
{
  "success": false,
  "message": "Unauthorized - Only master admin can approve requests"
}

// 404 - Request not found
{
  "success": false,
  "message": "Request not found"
}

// 400 - Already approved
{
  "success": false,
  "message": "This request is already approved"
}
```

---

### 7. Reject Admin Request
Reject an admin access request with reason (Master Admin only).

**Endpoint:** `PUT /admin/reject/:requestId`

**URL Parameters:**
- `requestId`: MongoDB ObjectId of the request to reject

**Headers:**
```
Authorization: Bearer <master-admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rejectionReason": "Insufficient experience with managing educational content"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin request rejected"
}
```

**Error Responses:**
```json
// 400 - Missing reason
{
  "success": false,
  "message": "Rejection reason is required"
}

// 403 - Not master admin
{
  "success": false,
  "message": "Unauthorized - Only master admin can reject requests"
}

// 404 - Request not found
{
  "success": false,
  "message": "Request not found"
}
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Bad request / Invalid input |
| 401 | Unauthorized / Not authenticated |
| 403 | Forbidden / Insufficient permissions |
| 404 | Not found |
| 500 | Server error |

---

## 🔑 Status Values

### Request Status
- `"pending"` - Awaiting master admin review
- `"approved"` - Approved and admin user created
- `"rejected"` - Rejected with reason

### Admin Role
- `"admin"` - Regular admin with limited permissions
- `"master_admin"` - Full access including admin management

### Permissions
- `uploadNotes` - Can upload study notes
- `uploadPYQ` - Can upload PYQ papers
- `manageEvents` - Can create/edit/delete events
- `sendNotifications` - Can send notifications
- `manageAdmins` - Can approve/reject admin requests

---

## 📧 Email Notifications

The system automatically sends emails:

### Email 1: New Request Notification
**To:** arsir.personal@gmail.com  
**Trigger:** When user submits admin request  
**Contains:** User details, reason, link to review

### Email 2: Approval Notification
**To:** Requesting user email  
**Trigger:** When master admin approves request  
**Contains:** Approval confirmation, login link

### Email 3: Rejection Notification
**To:** Requesting user email  
**Trigger:** When master admin rejects request  
**Contains:** Rejection reason, contact info

---

## 🧪 Example Requests (cURL)

### Request Admin Access
```bash
curl -X POST http://localhost:3000/api/admin/request-access \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "fullName": "John Doe",
    "reason": "I want to manage study materials and help students"
  }'
```

### Check Request Status
```bash
curl -X GET "http://localhost:3000/api/admin/request-status?email=user@example.com"
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Get Admin Info
```bash
curl -X GET http://localhost:3000/api/admin/info \
  -H "Authorization: Bearer your-token-here"
```

### Get Pending Requests (Master Admin)
```bash
curl -X GET http://localhost:3000/api/admin/pending-requests \
  -H "Authorization: Bearer master-admin-token"
```

### Approve Request (Master Admin)
```bash
curl -X PUT http://localhost:3000/api/admin/approve/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer master-admin-token" \
  -H "Content-Type: application/json"
```

### Reject Request (Master Admin)
```bash
curl -X PUT http://localhost:3000/api/admin/reject/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer master-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "rejectionReason": "Insufficient experience"
  }'
```

---

## 🔐 Authentication Flow

1. **User submits request** → POST /admin/request-access
2. **User checks status** → GET /admin/request-status
3. **Master admin reviews** → GET /admin/pending-requests
4. **Master admin approves/rejects** → PUT /admin/approve or /admin/reject
5. **Admin logs in** → POST /admin/login
6. **Admin gets info** → GET /admin/info (with token)

---

## 📝 Notes

- All endpoints return `{ success: boolean, message: string, data: object }`
- Timestamps are in ISO 8601 format
- MongoDB ObjectId format: 507f1f77bcf86cd799439011
- Email is case-insensitive (stored as lowercase)
- Reason must be meaningful (production will validate length)
- Files and other CRUD operations can be added similarly

---

## 🚀 Future API Endpoints

These endpoints are ready for implementation:
- `POST /api/admin/upload-notes` - Upload study notes
- `POST /api/admin/upload-pyq` - Upload PYQ papers
- `POST /api/admin/create-event` - Create event
- `POST /api/admin/send-notification` - Send notification

