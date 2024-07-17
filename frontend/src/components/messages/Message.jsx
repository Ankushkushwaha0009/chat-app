import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { MdDeleteForever } from "react-icons/md";
import useDeleteMessage from "../../hooks/useDeleteMessage";

const Message = ({ message, messageId }) => {
  const { deleteMessage } = useDeleteMessage();
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formattedDate = extractTime(message.createdAt);
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const handleDeleteMessage = () => {
    deleteMessage(messageId);
  };

  return (
    <div className={`flex items-start ${chatClassName} mb-4`}>
      {!fromMe && (
        <div className="flex-shrink-0 mr-3">
          <img
            className="h-10 w-10 rounded-full"
            src={profilePic}
            alt="Profile"
          />
        </div>
      )}
      <div className={`flex flex-col max-w-xs mx-2`}>
        <div
          className={`relative px-4 py-2 rounded-lg ${bubbleBgColor} text-white`}
        >
          <div className="flex justify-between items-center">
            <div className="text-sm">{message.message}</div>
            {fromMe && (
              <MdDeleteForever
                className="text-red-500 cursor-pointer"
                onClick={handleDeleteMessage}
              />
            )}
          </div>
          <div className="text-xs text-gray-400">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
