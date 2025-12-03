import AdminRequest from "../models/AdminRequest.js";
import AdminUser from "../models/AdminUser.js";
import User from "../models/Users.js";
import PasswordReset from "../models/PasswordReset.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const MASTER_ADMIN_EMAIL = "arsir.personal@gmail.com";

// Configure email transporter (update with your email credentials)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "your-app-password",
    },
});

// Send email notification
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER || "your-email@gmail.com",
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error("Email send failed:", error);
    }
};

// Admin signup request
export const requestAdminAccess = async (req, res) => {
    try {
        const { email, fullName, reason } = req.body;

        if (!email || !fullName || !reason) {
            return res.status(400).json({
                success: false,
                message: "Email, fullName, and reason are required",
            });
        }

        // Check if already requested
        const existingRequest = await AdminRequest.findOne({ email });
        if (existingRequest) {
            if (existingRequest.status === "pending") {
                return res.status(400).json({
                    success: false,
                    message: "Your request is already pending",
                });
            }
            if (existingRequest.status === "approved") {
                return res.status(400).json({
                    success: false,
                    message: "You already have admin access",
                });
            }
        }

        // Check if already admin
        const existingAdmin = await AdminUser.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "You already have admin access",
            });
        }

        // Create new request
        const adminRequest = new AdminRequest({
            email,
            fullName,
            reason,
        });

        await adminRequest.save();

        // Send email to master admin
        const adminPanelLink = `${process.env.FRONTEND_URL || "http://localhost:5174"}/admin/approve-requests`;
        const emailHtml = `
      <h2>New Admin Access Request</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>
        <a href="${adminPanelLink}" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Review Request in Admin Panel
        </a>
      </p>
    `;

        await sendEmail(MASTER_ADMIN_EMAIL, "New Admin Access Request", emailHtml);

        res.status(201).json({
            success: true,
            message:
                "Admin access request submitted. Please wait for approval from the master admin.",
            data: adminRequest,
        });
    } catch (error) {
        console.error("Admin request error:", error);
        res.status(500).json({
            success: false,
            message: "Error submitting admin request",
        });
    }
};

// Get request status
export const getAdminRequestStatus = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const request = await AdminRequest.findOne({ email });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "No request found",
            });
        }

        res.json({
            success: true,
            data: request,
        });
    } catch (error) {
        console.error("Get request status error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching request status",
        });
    }
};

// Get all pending requests (Master admin only)
export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const adminUser = await AdminUser.findOne({ userId });

        if (!adminUser || adminUser.role !== "master_admin") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Only master admin can access this",
            });
        }

        const pendingRequests = await AdminRequest.find({ status: "pending" });

        res.json({
            success: true,
            data: pendingRequests,
        });
    } catch (error) {
        console.error("Get pending requests error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching pending requests",
        });
    }
};

// Approve admin request
export const approveAdminRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.params;
        const adminUser = await AdminUser.findOne({ userId });

        if (!adminUser || adminUser.role !== "master_admin") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Only master admin can approve requests",
            });
        }

        const adminRequest = await AdminRequest.findById(requestId);
        if (!adminRequest) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        // Find or create user with this email
        let user = await User.findOne({ email: adminRequest.email });
        if (!user) {
            user = new User({
                email: adminRequest.email,
                name: adminRequest.fullName,
            });
            await user.save();
        }

        // Create admin user
        const newAdmin = new AdminUser({
            userId: user._id,
            email: adminRequest.email,
            role: "admin",
            permissions: {
                uploadNotes: true,
                uploadPYQ: true,
                manageEvents: true,
                sendNotifications: true,
                manageAdmins: false,
            },
        });

        await newAdmin.save();

        // Update admin request
        adminRequest.status = "approved";
        adminRequest.approvedBy = userId;
        adminRequest.approvedDate = new Date();
        await adminRequest.save();

        // Send approval email
        const loginLink = `${process.env.FRONTEND_URL || "http://localhost:5174"}/admin/login`;
        const emailHtml = `
      <h2>Admin Access Approved!</h2>
      <p>Congratulations! Your admin access request has been approved.</p>
      <p>You can now log in to the admin panel using your email.</p>
      <p>
        <a href="${loginLink}" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Login to Admin Panel
        </a>
      </p>
    `;

        await sendEmail(
            adminRequest.email,
            "Admin Access Approved",
            emailHtml
        );

        res.json({
            success: true,
            message: "Admin request approved",
            data: newAdmin,
        });
    } catch (error) {
        console.error("Approve admin request error:", error);
        res.status(500).json({
            success: false,
            message: "Error approving admin request",
        });
    }
};

// Reject admin request
export const rejectAdminRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.params;
        const { rejectionReason } = req.body;

        const adminUser = await AdminUser.findOne({ userId });
        if (!adminUser || adminUser.role !== "master_admin") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Only master admin can reject requests",
            });
        }

        const adminRequest = await AdminRequest.findById(requestId);
        if (!adminRequest) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        adminRequest.status = "rejected";
        adminRequest.rejectionReason = rejectionReason || "Request denied";
        await adminRequest.save();

        // Send rejection email
        const emailHtml = `
      <h2>Admin Access Request Rejected</h2>
      <p>Unfortunately, your admin access request has been rejected.</p>
      <p><strong>Reason:</strong> ${adminRequest.rejectionReason}</p>
      <p>If you have any questions, please contact the master admin.</p>
    `;

        await sendEmail(adminRequest.email, "Admin Access Request Rejected", emailHtml);

        res.json({
            success: true,
            message: "Admin request rejected",
        });
    } catch (error) {
        console.error("Reject admin request error:", error);
        res.status(500).json({
            success: false,
            message: "Error rejecting admin request",
        });
    }
};

// Get admin user info
export const getAdminInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const adminUser = await AdminUser.findOne({ userId }).populate("userId");

        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Admin user not found",
            });
        }

        res.json({
            success: true,
            data: adminUser,
        });
    } catch (error) {
        console.error("Get admin info error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching admin info",
        });
    }
};

// Admin login (verify email has admin access)
export const adminLogin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Check if user has admin access
        const adminUser = await AdminUser.findOne({ email, isActive: true }).populate("userId");

        if (!adminUser) {
            // Check if there's a pending request
            const pendingRequest = await AdminRequest.findOne({
                email,
                status: "pending",
            });

            if (pendingRequest) {
                return res.status(403).json({
                    success: false,
                    message: "pending",
                    data: {
                        requestDate: pendingRequest.requestDate,
                        masterAdminEmail: MASTER_ADMIN_EMAIL,
                    },
                });
            }

            // Check for rejected request
            const rejectedRequest = await AdminRequest.findOne({
                email,
                status: "rejected",
            });

            if (rejectedRequest) {
                return res.status(403).json({
                    success: false,
                    message: "rejected",
                    data: {
                        rejectionReason: rejectedRequest.rejectionReason,
                        masterAdminEmail: MASTER_ADMIN_EMAIL,
                    },
                });
            }

            return res.status(403).json({
                success: false,
                message: "notfound",
                data: {
                    masterAdminEmail: MASTER_ADMIN_EMAIL,
                },
            });
        }

        // Generate JWT token for the admin user
        const token = jwt.sign(
            {
                _id: adminUser.userId._id,
                email: adminUser.userId.email,
                role: "admin",
            },
            process.env.JWT_SECRET || "default-secret",
            { expiresIn: "30d" }
        );

        res.json({
            success: true,
            message: "Admin verified",
            data: {
                ...adminUser.toObject(),
                token,
                user: adminUser.userId,
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            success: false,
            message: "Error during admin login",
        });
    }
};

// Forgot password - Send OTP
export const forgotPasswordSendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Check if admin exists
        const adminUser = await AdminUser.findOne({ email, isActive: true });
        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Admin user not found",
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to database
        await PasswordReset.deleteMany({ email }); // Delete previous OTPs
        await PasswordReset.create({
            email,
            otp,
            otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        });

        // Send OTP via email
        await sendEmail(
            email,
            "Admin Password Reset OTP",
            `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Password Reset Request</h2>
                <p>Your OTP for password reset is:</p>
                <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
                    <h1 style="letter-spacing: 5px; color: #2563eb;">${otp}</h1>
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <p style="color: #666; font-size: 12px;">If you didn't request a password reset, please ignore this email.</p>
            </div>
            `
        );

        // For development: log OTP to console
        if (process.env.NODE_ENV !== "production") {
            console.log(`✓ OTP for ${email}: ${otp}`);
        }

        res.json({
            success: true,
            message: "OTP sent to your email",
            data: {
                email,
                // In development, return OTP for testing
                otp: process.env.NODE_ENV !== "production" ? otp : undefined,
            },
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            success: false,
            message: "Error sending OTP",
        });
    }
};

// Verify OTP and reset password
export const verifyOTPAndResetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email, OTP, and new password are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

        // Check if admin exists
        const adminUser = await AdminUser.findOne({ email, isActive: true });
        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Admin user not found",
            });
        }

        // Check OTP
        const passwordReset = await PasswordReset.findOne({
            email,
            otp,
            isUsed: false,
        });

        if (!passwordReset) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Check if OTP expired
        if (new Date() > passwordReset.otpExpires) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        // Check attempts
        if (passwordReset.attempts >= 5) {
            return res.status(400).json({
                success: false,
                message: "Too many failed attempts. Please request a new OTP",
            });
        }

        // Update password
        const user = await User.findById(adminUser.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Mark OTP as used
        passwordReset.isUsed = true;
        await passwordReset.save();

        // Send confirmation email
        await sendEmail(
            email,
            "Password Reset Successful",
            `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Password Reset Successful</h2>
                <p>Your password has been successfully reset.</p>
                <p>You can now login with your new password.</p>
                <p style="color: #666; font-size: 12px;">If you didn't request this change, please contact the master admin immediately.</p>
            </div>
            `
        );

        res.json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        // Increment attempts on invalid OTP
        if (error.message === "Invalid OTP") {
            await PasswordReset.updateOne(
                { email: req.body.email, otp: req.body.otp },
                { $inc: { attempts: 1 } }
            );
        }

        res.status(500).json({
            success: false,
            message: "Error resetting password",
        });
    }
};
