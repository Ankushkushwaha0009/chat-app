import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
    participants : [
        {
            type  : mongoose.Schema.Types.ObjectId , 
            // User id 
            ref : "User"
        }
    ] ,
    messages : [
        {
            type  : mongoose.Schema.Types.ObjectId , 
            // Message id 
            ref : "Message", 
            default : [] , 
        }
    ]
} , {timestamps : true})

const Conversation  =  mongoose.model("Conversation" , conversationSchema) ;
export default Conversation ; 

