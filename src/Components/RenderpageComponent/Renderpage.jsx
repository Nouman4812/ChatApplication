import { BsCaretRightSquareFill, BsPaperclip } from "react-icons/bs";
import Messages from "../MessagesComponent/Messages";
import Sidebar from "../SidebarComponent/Sidebar";
import { useContext, useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from "../../Context/firebase";
import Loader from '../LoaderComponent/Loader'
import { db, storage } from "../../Context/firebase";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../../Context/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

function Randerpage() {
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [Img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const handleSend = async () => {
    if (text.trim() !== "") {

      if (Img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, Img);
        uploadTask.on(
          (error) => {
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
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
            senderId: currentUser.uid,
            date: Timestamp.now(),
            text,
            lastMessage:text,
          }),
        });
      }
      setText("");
      setImg(null);
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: { text, },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
  }
  const sendmessageOnEnter = async (e) => {
    if (e.key == "Enter") { await a () }
  }
  const handleSend2 = async (e) => {
    if (text.trim() !== "") {
      if (Img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, Img);
        uploadTask.on(
          (error) => {
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "commonchats", "PGmUiA2KsFoSazK2hQx4"), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  photoURL: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "commonchats", "PGmUiA2KsFoSazK2hQx4"), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            photoUrl: currentUser.photoURL,
            displayName: currentUser.displayName
          }),
        });
      }
      setText("");
      setImg(null);
      await updateDoc(doc(db, "commonchats", currentUser.uid), {
        ["PGmUiA2KsFoSazK2hQx4" + ".lastMessage"]: { text, },
        ["PGmUiA2KsFoSazK2hQx4" + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "commonchats", "PGmUiA2KsFoSazK2hQx4"), {
        ["PGmUiA2KsFoSazK2hQx4" + ".lastMessage"]: {
          text,
        },
        ["PGmUiA2KsFoSazK2hQx4" + ".date"]: serverTimestamp(),
      });
    }
  };
  function a(e) {
    handleSend(e);
    handleSend2(e);
    sendmessageOnEnter(e);
  }
  return (
    <>
      <Loader isLoading={loading} />
      <div className={"Mainapp"}>
        <Sidebar setLoader={setLoading} />
        <div className="col-lg-10 Rightside " >
          <div className="chatuser">
            <div className="chatusericon upericonupleft ">
              <p className="upericon" >{data.user?.displayName}</p>
              <img className="upleft" src={data.user.photoURL} alt="" />
            </div>
            <div>
              <button
                isonline="false"
                type="button"
                className="logoutbutton"
                onClick={() => signOut(auth)}>...</button>
            </div>
          </div>
          <div>
            <div >
              <Messages />
            </div>
          </div>
          <div className="lastdiv">
            <input
              type="text"
              class="form-control lastinputtext"
              placeholder="Type Message"
              onChange={(e) => setText(e.target.value)}
              onKeyUp={(e) => sendmessageOnEnter(e)}
              value={text} />
            <input style={{ display: "none" }} type="file" id="file" onChange={e => setImg(e.target.files[0])
            } />
            <label className="label" htmlFor="file">
              <img src={Img} alt="" />
              <span><BsPaperclip className="msg" /></span>
            </label>
            <BsCaretRightSquareFill
              type="text"
              className="msg"
              onClick={a} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Randerpage;