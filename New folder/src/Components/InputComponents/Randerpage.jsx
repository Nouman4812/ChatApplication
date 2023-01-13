import React, { useContext } from 'react';
import { ChatContext } from "../../Context/ChatContext"
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Input from "./Input";
import Messages from "./Messages";
import Message from "./Message";
function Randerpage() {
  const { data } = useContext(ChatContext);
  return (
    <div className="Mainapp">
      <Sidebar />
      <div className="col-lg-10 Rightside " id='sidebar'>
        <Chat />
        <div>
          <div className="senderme">
            <Message message={data.user} />
          </div>
          <div className="mechat">
            <Messages />
          </div>
        </div>
        <div className="lastdiv">
          <Input />
        </div>
      </div>
    </div>
  );
}
export default Randerpage;