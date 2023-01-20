import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BsEmojiSmile, BsCaretRightSquareFill, BsPaperclip } from "react-icons/bs";
import Messages from "./Messages";
import Message from "./Message"
import Sidebar from "./Sidebar";
import { useContext,  useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from "../../Context/firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { db, storage } from "../../Context/firebase"
import { v4 as uuid } from "uuid";
import { ChatContext } from "../../Context/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
function Randerpage() {
  const { data } = useContext(ChatContext);

  ///////////////////////////
  const [text, setText] = useState("");
  const [Img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const handleSend = async () => {
    if (Img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, Img);

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
    setText("");
    setImg(null); 
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

   
}
  const sendmessageOnEnter=async(e)=>{
    if(e.key=="Enter")
    {await handleSend()}
       
     }
  ////////////////////////////////////////////////
  return (
    <div className={"Mainapp"}>
      <Sidebar />
      <div className="col-lg-10 Rightside " id='sidebar'>
        <div className="chatuser">
          
          <div className="chatusericon upericonupleft ">
            <p className="upericon" >{data.user?.displayName}</p>
            <img className="upleft" src={data.user.photoURL} alt="" />
           
          </div>
       <div>
          <button
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
          <BsEmojiSmile
            className="emoji"/>
           <input style={{ display: "none" }} type="file" id="file"  onChange={e=>setImg (e.target.files[0])
          }/>
                      <label  className="label" htmlFor="file">
                             <img src={Img} alt="" />
                        <span><BsPaperclip className="msg"/></span>
                            </label>
          <BsCaretRightSquareFill
          type="text"
            className="msg"
            onClick={handleSend}
            

            // 'onKeyPress'={handleKeyPress}
          />

        </div> 
      </div>
    </div>
  );
}
export default Randerpage;