import { db } from "../../Context/firebase";
import { AuthContext } from "../../Context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { onSnapshot } from "firebase/firestore";
import {
    collection,
} from "firebase/firestore";

function CommonChats() {
    const [commonchats, setcommonchats] = useState([]);
    const [username, setUsername] = useState("");
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(collection(db, "commonchats"), querySnapshot => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });
                setcommonchats(data)
                return () => {
                    unsub();
                };
            })
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    const handleSelect = (u) => {
        let dataInfo = {
            displayName: "Common",
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Eo_circle_teal_letter-c.svg/1024px-Eo_circle_teal_letter-c.svg.png",
        }
        dispatch({ type: "CHANGE_USERS", payload: dataInfo });
        dispatch({ type: "USER_CHANGE", payload: true })
    };
    return (
        <>
            <div className="lefticon col-md-12">
                <div className="chatusericon left chats">

                    {commonchats.map((chat) => (
                        <>
                            {currentUser.uid === chat.uid ? null :
                                <div className="iconspanp userChat"
                                    key={chat[0]}
                                    onClick={() => handleSelect(chat)}
                                    value={username}
                                >
                                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Eo_circle_teal_letter-c.svg/1024px-Eo_circle_teal_letter-c.svg.png"} alt="" className="usericon" id='cursersetting' />
                                    <div className="lowerleftnameabout userChatInfo">
                                        <span className="lowerleftname" >Common</span>
                                        <p className="lowerabout" >All users in on room :)</p>

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
