import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { CurrencyBitcoin } from "react-bootstrap-icons";
import { ChatContext } from "../../Context/ChatContext";
// import { commonChatContext } from "../../Context/CommonContext"
import { db } from "../../Context/firebase";
import Message from "./Message.jsx"
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  // const { data } = useContext(commonChatContext);
  useEffect(() => {
    debugger
    if (data.commonUser == true) {
      const unSubs = onSnapshot(doc(db, "commonchats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unSubs();
      }
    }
    else {
      debugger
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unSub();
      }
    };

  }, [data.chatId]
    // [data.combinedId]
  );
  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;