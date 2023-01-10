import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BsEmojiSmile, BsThreeDots, BsCaretRightSquareFill, BsPaperclip } from "react-icons/bs";
import MessageComponents from '../InputComponents/MyMessage'
import usericon1 from '../../images/user-1.jfif';
import usericon2 from '../../images/user-4.jfif';
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Message from "../InputComponents/MyMessage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot
} from "firebase/firestore"
import { db, storage } from "../../Context/firebase"
import { v4 as uuid } from "uuid";
import { ChatContext } from "../../Context/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function Randerpage() {
  const { data } = useContext(ChatContext);
  ///////////////////////////
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    debugger
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          debugger
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  ////////////////////////////////////////////////
  useEffect(() => {
    debugger
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      debugger
      doc.exists() && setMessages(doc.data().messages);
    }); return () => {
      unSub();
    };
  }, [data.chatId]);
  let ddd = data
  debugger
  return (
    <div className={"Mainapp"}>
      <div className="col-lg-10 Rightside " id='sidebar'>
        <Sidebar />
        <>
          <div className="chatuser">
            <div className="chatusericon">
              {/* <img src={usericon1} className="usericonright" /> */}
              <p className="upericon" >{data.user?.displayName}</p>
            </div>
            <BsThreeDots className="dotbutton" />
          </div>
          <div>
            <MessageComponents message={data.user} />
            {/* /////////////////////////////////// */}
            <div className="mechat">
              {/* <div className="texttime">
                <span className="mechattext">asdasda</span>
                <p className="mechattext timelast">06:40pm</p></div>
              <div className="mechaticon">
                <p className="lastnameright">Patricia Smith</p>
                <img src={usericon2} className="usericonleft" id="" />
              </div> */}
              <div className="messages">
                {messages.map((m) => (
                  <Message message={m} key={m.id} />
                ))}
              </div>
            </div>
          </div>
          <div className="lastdiv">
            <input
              type="text"
              class="form-control lastinputtext"
              placeholder="Type message"
              onChange={(e) => setText(e.target.value)}
              value={text} />
            <BsPaperclip
              className="msg"
              src={img} alt=""
            />
            <BsEmojiSmile
              className="emoji" />
            <BsCaretRightSquareFill
              className="msg"
              onClick={handleSend}
            />
          </div>
        </>
      </div>
    </div>
  );
}
export default Randerpage;