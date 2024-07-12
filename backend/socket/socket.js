import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors()); // Ensure CORS middleware is applied

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getRecieverSocketId  = (receiverId)  => {
  return userSocketMap[receiverId] ; 
}

const userSocketMap = {} ; //{userId , }rs

io.on("connection", (socket) => {

  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId ; 
  //io.emit()  is used to send events to all the connected client 
  
  if(userId != "undefined") {
    //userId = login user 
    userSocketMap[userId] = socket.id ;
    //  console.log("USerSocketMap : " ,   userSocketMap) ; 
  }

  io.emit("getOnlineUsers" , Object.keys(userSocketMap)) ; 

  //socket.on()  is used to listen to the events . Can be used both on client and server side 
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    //key = userid  and value = socketId  
    delete userSocketMap[userId] ; 
    io.emit("getOnlineUsers" , Object.keys(userSocketMap)) ; 
  });

});

export { app, io, server };


