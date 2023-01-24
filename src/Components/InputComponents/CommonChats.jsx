import { BsSearch } from "react-icons/bs";
import { db } from "../../Context/firebase";
import { AuthContext } from "../../Context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { onSnapshot } from "firebase/firestore";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
function CommonChats() {
    const [chats, setChats] = useState([]);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const [commonChat] = useState([])
    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const GYxipGMla9NLcoxPGFBI =
                currentUser.uid > user.uid
                    ? currentUser.uid + user.uid
                    : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats",

                GYxipGMla9NLcoxPGFBI));
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats",

                    GYxipGMla9NLcoxPGFBI), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [

                        GYxipGMla9NLcoxPGFBI + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [

                        GYxipGMla9NLcoxPGFBI + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [

                        GYxipGMla9NLcoxPGFBI + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [

                        GYxipGMla9NLcoxPGFBI + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null);
        setUsername("")
    };
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(collection(db, "commonchat"), querySnapshot => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });
                setChats(data)
                return () => {
                    unsub();
                };
            })
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);
    return (
        <div>
            {chats.map((chat, index) => (
                <>
                    {currentUser.uid === chat.uid ? null :
                        <div className="iconspanp userChat"
                            key={chat[0]}
                            onClick={() => handleSelect(chat)}

                        >
                            <img src={chat.photoURL} alt="" className="usericon" id='cursersetting' />
                            <div className="lowerleftnameabout userChatInfo">
                                <span className="lowerleftname" >{chat.displayName}</span>
                                <p className="lowerabout" >common</p>

                            </div>
                        </div>
                    }

                </>
            ))}
        </div>)
}
export default CommonChats;