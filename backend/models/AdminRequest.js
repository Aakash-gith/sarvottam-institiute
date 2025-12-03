import mongoose from "mongoose";

const adminRequestSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        fullName: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
            default: null,
        },
        requestDate: {
            type: Date,
            default: Date.now,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        approvedDate: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AdminRequest", adminRequestSchema);
