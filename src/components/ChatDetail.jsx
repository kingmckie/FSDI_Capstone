import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DataContext from "../state/dataContext";

import db from  "../firebase";
import { addDoc, collection } from 'firebase/firestore';

const ChatDetail = ({ category }) => {
  const {categoryId} = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");

  const { loggedUser: user } = useContext(DataContext); // Access loggedUser from DataContext

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        text: newMessage,
        group: categoryId,
        sender: user?.displayName || username,
      };

      setMessages([...messages, message]);
      setNewMessage("");

      // save the newMessage to firebase
    
      addDoc(collection(db, `chats/groups/${categoryId}`), message)
        .then(() => {
          console.log("Chat post saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving chat post:", error);
        });
    }
  };

  function loadPreviousMessages() {
    // get the messages from Firebase
  }

  useEffect(() => {
    loadPreviousMessages();
  }, []);

  useEffect(() => {
    console.log("Location:", location);
    console.log("Username:", username);
  }, [location, username]);

  return (
    <div>
      <h2>{category ? `${category.title} Chat` : "Chat Detail " + categoryId}</h2>

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
