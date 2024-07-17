import { useCallback } from "react";
import useConversation from "../../zustand/useConversation";

const useDeleteMessage = () => {

  const {messages , setMessages, selectedConversation } = useConversation();

  const deleteMessage = useCallback(
    async (messageId) => {
      // console.log("Deleting message with ID:", messageId);
      try {
        const deleteResponse = await fetch(`/api/message/delete/${messageId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!deleteResponse.ok) {
          throw new Error("Failed to delete the message");
        }

        // Fetch updated messages after successful deletion
        const fetchResponse = await fetch(`/api/message/${selectedConversation._id}`);
        const data = await fetchResponse.json();

        if (fetchResponse.ok) {
          setMessages(data); // Update messages state with fetched data
          // console.log("Message deleted successfully");
        } else {
          throw new Error("Failed to fetch updated messages");
        }
        // Use a callback to log the state after the update
        console.log("Messages  :" , messages ) ; 
      } catch (error) {
        console.error("Error deleting or fetching messages:", error);
      }
    },
    [setMessages, selectedConversation]
  );

  return { deleteMessage };
};

export default useDeleteMessage;
