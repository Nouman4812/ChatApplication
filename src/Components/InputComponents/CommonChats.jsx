import { BsSearch } from "react-icons/bs";
import { db, zoLmgTttzq77EwiBP8YR } from "../../Context/firebase";
import { AuthContext } from "../../Context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { onSnapshot } from "firebase/firestore";

import {
    collection,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
function CommonChats() {
    const [commonchat, setcommonchat] = useState([]);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState();
    const [err, setErr] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const handleSelect = async () => {
        //check whether the group( chats in firestore) exists, if not create
        let ID = zoLmgTttzq77EwiBP8YR
        const combinedId =
            currentUser.uid > ID
                ? currentUser.uid + ID
                : ID + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "commonchat", combinedId));
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "commonchat", ID), { messages: [] });
                //create user chats
                await updateDoc(doc(db, "chat11", currentUser.uid), {
                    [combinedId + ".userInfo"]: {       
                        uid:ID,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [
                        combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "chat11", combinedId), {
                    [
                        combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [
                        combinedId + ".date"]: serverTimestamp(),
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
                setcommonchat(data)
                return () => {
                    unsub();
                };
            })
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    return (
        <div>
            {commonchat.map((chat, index) => (
                <>
                    {currentUser.uid === chat.uid ? null :
                        <div className="iconspanp userChat"
                            key={chat[0]}
                            onClick={() => handleSelect(chat)}>
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