import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BsEmojiSmile, BsThreeDots, BsCaretRightSquareFill, BsPaperclip } from "react-icons/bs";
import Messages from "./Messages";
import Message from "./Message"
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from "../../Context/firebase"
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
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
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
  return (
    <div className={"Mainapp"}>
      <Sidebar />
      <div className="col-lg-10 Rightside " id='sidebar'>
        <div className="chatuser">
          <div className="chatusericon">
            <p className="upericon" >{data.user?.displayName}</p>
          </div>
          <button
            type="button"
            class="btn btn-danger logoutbutton"
            onClick={() => signOut(auth)}>LogOut</button>
        </div>
        <Message message={data.user} />
        <div>
          <div className="mechat">
            <Messages />
          </div>
        </div>
        <div className="lastdiv">
          <input
            type="text"
            class="form-control lastinputtext"
            placeholder="Type Message"
            onChange={(e) => setText(e.target.value)}
            value={text} />
          <BsEmojiSmile
            className="emoji" />
          <BsPaperclip
            className="msg"
            src={img} alt=""
          />
          <BsCaretRightSquareFill
            className="msg"
            onClick={handleSend}
          />

        </div>
      </div>
    </div>
  );
}
export default Randerpage;