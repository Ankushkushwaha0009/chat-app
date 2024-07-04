import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDb from "./db/connectMongoDB.js";

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser()) ; 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB and start the server
connectMongoDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port number", PORT );
  });
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});
