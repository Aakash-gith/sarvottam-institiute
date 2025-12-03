import { Router } from "express";
import {
    requestAdminAccess,
    getAdminRequestStatus,
    getPendingRequests,
    approveAdminRequest,
    rejectAdminRequest,
    getAdminInfo,
    adminLogin,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { adminMiddleware, masterAdminMiddleware } from "../middleware/admin.middleware.js";

const router = Router();

// Public routes
router.post("/request-access", requestAdminAccess);
router.get("/request-status", getAdminRequestStatus);
router.post("/login", adminLogin);

// Protected routes
router.get("/info", authMiddleware, adminMiddleware, getAdminInfo);
router.get("/pending-requests", authMiddleware, masterAdminMiddleware, getPendingRequests);
router.put("/approve/:requestId", authMiddleware, masterAdminMiddleware, approveAdminRequest);
router.put("/reject/:requestId", authMiddleware, masterAdminMiddleware, rejectAdminRequest);

export default router;
