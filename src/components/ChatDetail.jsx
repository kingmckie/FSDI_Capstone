import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import DataContext from "../state/dataContext";
import db from "../firebase";

const ChatDetail = ({ category }) => {
  const { categoryId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { user } = useContext(DataContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        text: newMessage,
        group: categoryId,
        sender: user?.displayName || user?.email || "Anonymous",
        cratedAt: new Date()
      };


      // Save the newMessage to firebase
      addDoc(collection(db, `chats/groups/${categoryId}`), message)
        .then(() => {
          console.log("Chat post saved successfully.");
          setMessages([...messages, message]);
          setNewMessage("");
        })
        .catch((error) => {
          console.error("Error saving chat post:", error);
          // show an error
        });

      // Note: You can also update messages state with the new message immediately
      // setMessages([...messages, message]);
    }
  };

  const loadPreviousMessages = async () => {
    try {
      const chatRef = collection(db, `chats/groups/${categoryId}`);
      const querySnapshot = await getDocs(chatRef);

      const loadedMessages = [];
      querySnapshot.forEach((doc) => {
        let message = doc.data();
        
        // fix createdAt date
        if(message.cratedAt) {
          const date = new Date(message.cratedAt * 1000);
          message.createdAt = date;
        }

        loadedMessages.push(message);
      });

      // Update the state with the fetched messages
      setMessages(loadedMessages.sort((a, b) => {
        if(!a.createdAt) return -1;
        if(!b.createdAt) return 1;
        return a.createdAt - b.createdAt;
      }));
    } catch (error) {
      console.error("Error loading previous messages:", error);
    }
  };

  useEffect(() => {
    loadPreviousMessages();
  }, [categoryId]); // Include categoryId as a dependency

  return (
    <div>
      <h2>
        {category ? `${category.title} Chat` : "Chat Detail " + categoryId}
      </h2>

      <div
        style={{ height: "300px", border: "1px solid #ccc", overflowY: "auto" }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatDetail;
