import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ["admin", "master_admin"],
            default: "admin",
        },
        permissions: {
            uploadNotes: {
                type: Boolean,
                default: true,
            },
            uploadPYQ: {
                type: Boolean,
                default: true,
            },
            manageEvents: {
                type: Boolean,
                default: true,
            },
            sendNotifications: {
                type: Boolean,
                default: true,
            },
            manageAdmins: {
                type: Boolean,
                default: false,
            },
        },
        approvalDate: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AdminUser", adminUserSchema);
