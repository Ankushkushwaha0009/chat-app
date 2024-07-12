/*
  Jo login kiya hoga wo sender hoga 
  and jiska id hum url mai de rahe hai wo receiver hoga 
*/

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId , io} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  // console.log("req.user" , req.user) ; 
  try {
    //we are geeting message as a input
    const { message } = req.body;
    //Then we are getting the user id
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      //It will give conversation between this two users
      participants: {$all: [senderId, receiverId]},
    });
    //if any conversation is not there between them the create it
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    //Creating the New Message  ...
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    // put inside the message array
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]); // but here no will await for another process each will run at a same time
    //SOCKET_IO FUNCTIONALITY WILL GO HERE
    
    const receiverSocketId  =  getRecieverSocketId(receiverId) ; 
    if(receiverSocketId) {
      //use to send the eevents to a specific client 
      io.to(receiverSocketId).emit("newMessage" , newMessage) ;
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error is sendMessage controller", err.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId]},
    }).populate("messages"); // Not referenced but actual messages
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error is sendMessage controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};



