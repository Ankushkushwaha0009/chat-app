import path from "path" ;
import express from  "express" ; 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDb from "./db/connectMongoDB.js";
import { app, server } from "./socket/socket.js";  // Import app and server from socket.js

// Load environment variables
dotenv.config();

const PORT  = process.env.PORT || 8000;
const __dirname =  path.resolve()  ; 


// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname , "/frontend/dist")))   ; 
app.get("*" , (req , res) => {
  res.sendFile(path.join(__dirname, "frontend" , "dist" , "index.html"))  ;  
})

// Connect to MongoDB and start the server
connectMongoDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running on port number", PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
