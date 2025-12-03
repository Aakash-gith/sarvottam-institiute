import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    class: {
      type: Number,
      required: true,
      enum: [9, 10],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    streak: {
      type: Number,
      default: 0,
    },
    bestStreak: {
      type: Number,
      default: 0,
    },
    lastLoginDate: {
      type: Date,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

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

const User = mongoose.model("User", userSchema);
const AdminUser = mongoose.model("AdminUser", adminUserSchema);

async function createMasterAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    const masterAdminEmail = "arsir.personal@gmail.com";
    const masterAdminName = "Master Admin";
    const masterAdminPassword = "MasterAdmin@123";
    const masterAdminClass = 10;

    // Check if user already exists
    let user = await User.findOne({ email: masterAdminEmail });

    if (user) {
      console.log(`✓ User with email ${masterAdminEmail} already exists`);
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(masterAdminPassword, 10);

      // Create user
      user = new User({
        email: masterAdminEmail,
        name: masterAdminName,
        class: masterAdminClass,
        password: hashedPassword,
      });

      await user.save();
      console.log(`✓ Created user: ${masterAdminEmail}`);
      console.log(`  - Name: ${masterAdminName}`);
      console.log(`  - Class: ${masterAdminClass}`);
      console.log(`  - Password: ${masterAdminPassword}`);
      console.log(`  - User ID: ${user._id}`);
    }

    // Check if admin user already exists
    let adminUser = await AdminUser.findOne({ email: masterAdminEmail });

    if (adminUser) {
      console.log(`✓ Admin user with email ${masterAdminEmail} already exists`);
      if (adminUser.role !== "master_admin") {
        adminUser.role = "master_admin";
        adminUser.permissions.manageAdmins = true;
        await adminUser.save();
        console.log(`✓ Updated role to master_admin`);
      }
    } else {
      // Create admin user with master_admin role
      adminUser = new AdminUser({
        userId: user._id,
        email: masterAdminEmail,
        role: "master_admin",
        permissions: {
          uploadNotes: true,
          uploadPYQ: true,
          manageEvents: true,
          sendNotifications: true,
          manageAdmins: true,
        },
        isActive: true,
      });

      await adminUser.save();
      console.log(`✓ Created master admin user`);
      console.log(`  - Email: ${masterAdminEmail}`);
      console.log(`  - Role: master_admin`);
      console.log(`  - All permissions: ENABLED`);
      console.log(`  - Admin ID: ${adminUser._id}`);
    }

    console.log("\n✅ Master admin setup complete!");
    console.log("\nYou can now login with:");
    console.log(`  Email: ${masterAdminEmail}`);
    console.log(`  Password: ${masterAdminPassword}`);
    console.log("\n📝 Make sure to:");
    console.log("  1. Change this password in production");
    console.log("  2. Store this password securely");
    console.log("  3. Configure EMAIL_USER and EMAIL_PASSWORD in .env");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating master admin:", error.message);
    process.exit(1);
  }
}

createMasterAdmin();
