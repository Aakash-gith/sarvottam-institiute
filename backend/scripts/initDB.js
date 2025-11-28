import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function initializeDatabase() {
    try {
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const db = mongoose.connection.db;
        console.log(`📦 Database: ${db.getName()}`);

        // Get existing collections
        const collections = await db.listCollections().toArray();
        console.log("\n📋 Existing Collections:");
        if (collections.length === 0) {
            console.log("   No collections yet. They will be created automatically when models are used.");
        } else {
            collections.forEach((col) => console.log(`   - ${col.name}`));
        }

        // Create indexes for better performance
        console.log("\n⚙️  Setting up indexes...");

        // Users collection indexes
        const Users = mongoose.model("User");
        await Users.collection.createIndex({ email: 1 }, { unique: true });
        await Users.collection.createIndex({ class: 1 });
        console.log("   ✓ Users indexes created");

        console.log("\n✅ Database initialization complete!");
        console.log(`\n📊 Your database is ready at: ${MONGO_URI}`);
        console.log("\n💡 Collections will be auto-created when you save data.\n");

        await mongoose.connection.close();
    } catch (err) {
        console.error("❌ Error initializing database:", err);
        process.exit(1);
    }
}

initializeDatabase();
