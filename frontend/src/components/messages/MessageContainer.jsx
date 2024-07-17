import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useBackContext } from "../../context/GoBackContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { backButton, setBackButton } = useBackContext();

  // console.log("backButton", backButton);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      setBackButton(false) ; 
      setSelectedConversation(null);
    };
  }, [setSelectedConversation , backButton]);

  return (
    <div className="md:min-w-[1000px]  md:max-w-[800px]   sm:min-w[100px]   flex flex-col sm:min-h-[420px]  md:max-h-[700px]">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
            <IoMdArrowRoundBack
              className="cursor-pointer text-4xl text-white-900"
              onClick={() => setBackButton(true)}
            />
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};