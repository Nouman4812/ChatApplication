import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../Context/firebase";

const Chats = () => {
    const [chats, setChats] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = ()=>{
            const unsub = onSnapshot(collection(db, "userChats"), querySnapshot => {

            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            console.log("nocopy: ", data);
            setChats(data)
            return () => {
                unsub();
            };
        })};
 
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };
    return (
        <div id='sidebar'>
            <div className="col-lg-12 leftside">

                <div className="Recenttext">Recent</div>
                <div className="lefticon col-md-12">



                    <div className="chatusericon left">
                        {chats.map((chat,index) => (
                            <div className="iconspanp"
                                key={index}
                                onClick={() => handleSelect(chat)}>
                                <img src={chat.userInfo.photoURL} alt="" className="usericon" id='cursersetting' />
                                <div className="lowerleftnameabout">
                                    <span className="lowerleftname" >{chat.displayName}</span>
                                    <p className="lowerabout" >{chat.lastMessage?.text}</p>
                                </div>
                                <div> <span className='timeleft'>20 min</span></div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chats;