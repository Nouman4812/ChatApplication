import { BsSearch } from "react-icons/bs";
import { db } from "../../Context/firebase";
import { AuthContext } from "../../Context/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import CommonChats from "./CommonChats";
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
function Sidebar() {
    const [chats, setChats] = useState([]);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const handleSearch = async () => {
        const q = query(
            collection(db   ,"users"),
            collectionGroup(db, "commonchat"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true); 
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };
    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null);
        setUsername("")
    };
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(collection(db, "users"), querySnapshot => {
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

    const handleSelect2 = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };
    return (
        <div id='sidebar'>
            <div className="col-lg-12 leftside">
                <div className="chatstext">Chats
                    {/* <img src={currentUser.photoURL} alt="" className="usericonrightlower" />*/}
                    <span className="upusername">{currentUser.displayName}</span>
                </div>
                <div class="wrapper">
                    <BsSearch className="icon" onKeyDown={handleKey} />
                    <input class="form-control searchbar"
                        type="text"
                        placeholder="Search messages or users"
                        onKeyDown={handleKey}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    ></input>
                </div>
                <div className="leftup">

                    {err && <span>User not found!</span>}
                    {user && (
                        <div className="userChat" onClick={handleSelect}>
                            <img className="upleft" src={user.photoURL} alt="" />
                            <span className="searchname">{user.displayName}</span>
                            <div className="userChatInfo">
                            </div>
                        </div>
                    )}
                </div>
                <div className="Recenttext">CommonChats</div>
                <div><CommonChats/></div> 
                {/* ///////////////////////////////////////// */}
                <div className="Recenttext">Recent</div>
                <div className="lefticon col-md-12">
                    <div className="chatusericon left chats">

                        {chats.map((chat, index) => (
                            <>
                                {currentUser.uid === chat.uid ? null :
                                    <div className="iconspanp userChat"
                                        key={chat[0]}
                                        onClick={() => handleSelect2(chat)}

                                    >
                                        <img src={chat.photoURL} alt="" className="usericon" id='cursersetting' />
                                        <div className="lowerleftnameabout userChatInfo">
                                            <span className="lowerleftname" >{chat.displayName}</span>
                                            <p className="lowerabout" >Hey!there I'm available</p>

                                        </div>
                                        <div><span className='timeleft'>05 min</span>   </div>
                                    </div>
                                }

                            </>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;