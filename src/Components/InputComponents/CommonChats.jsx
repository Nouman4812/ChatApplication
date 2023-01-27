import { BsSearch } from "react-icons/bs";
import { db } from "../../Context/firebase";
import { AuthContext } from "../../Context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    Timestamp,
    arrayUnion,
    getDoc,
} from "firebase/firestore";
function CommonChats() {
    const [commonchats, setcommonchats] = useState([]);
    const [Chats, setChats] = useState([]);
    const [username, setUsername] = useState("");
    const [PGmUiA2KsFoSazK2hQx4, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const handleSelect = async () => {
        const combinedId = "PGmUiA2KsFoSazK2hQx4"
        try {
            const res = await getDoc(doc(db, "commonchats", combinedId));
            if (!res.exists()) {
                //create a chat in commonchats collection
                debugger
                await setDoc(doc(db, "commonchats", combinedId), {
                    messages: {
                        uid: currentUser.uid,
                        displayName: "Nouman",
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/my-chat125.appspot.com/o/ASLAM?alt=media&token=31785202-2609-48f6-a171-5c8878a6ece2",
                    }
                });
            } else {
                await updateDoc(doc(db, "commonchats", combinedId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text:"My Common Chat",
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img:  "https://firebasestorage.googleapis.com/v0/b/my-chat125.appspot.com/o/ASLAM?alt=media&token=31785202-2609-48f6-a171-5c8878a6ece2",
                    }),
                  });
            }
        } catch (err) { }
    };
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(collection(db, "commonchats"), querySnapshot => {
                const data=  []
                querySnapshot.forEach((doc) => {
                    data.push(doc . data())
                });
                setcommonchats(data)
                return () => {
                    unsub();
                };
            })
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    const handleSelect2 = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };
    function a(e) {
        handleSelect(e);
        handleSelect2(e);
    }
    return (
        <>
            <div className="lefticon col-md-12">
                <div className="chatusericon left chats">

                    {commonchats.map((chat) => (
                        <>
                            {currentUser.uid === chat.uid ? null :
                                <div className="iconspanp userChat"
                                    key={chat[0]}
                                    onClick={() => a(chat)}
                                    value={username}
                                >
                                    <img src={chat.photoURL} alt="" className="usericon" id='cursersetting' />
                                    <div className="lowerleftnameabout userChatInfo">
                                        <span className="lowerleftname" >{chat.displayName}</span>
                                        <p className="lowerabout" >Common</p>

                                    </div>
                                </div>
                            }
                        </>
                    ))}

                </div>
            </div>
        </>
    );
}
export default CommonChats;
;
