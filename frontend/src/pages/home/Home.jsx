import React from "react";
import Sidebar from "../../components/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();
  if (selectedConversation) {
    console.log("Id : ", selectedConversation._id);
  }

  return (
    <div className="flex sm:h-[450px] md:h-[550px] 
    rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  sm:overflow-hidden">
      {selectedConversation ? (<>
       <p></p>
        <MessageContainer />
      </> 
      
      ) : (
        <>
          <Sidebar />
          <MessageContainer />
        </>
      )}
    </div>
  );
};

export default Home;
