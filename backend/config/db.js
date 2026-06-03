// Kết nối với cơ sở dữ liệu
import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-del';
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("DB connected to:", MONGODB_URI.includes('localhost') ? 'localhost' : 'cloud');
    } catch (error) {
        console.error("DB connection failed:", error.message);
        console.error("Server will continue running but database features won't work.");
    }
}

