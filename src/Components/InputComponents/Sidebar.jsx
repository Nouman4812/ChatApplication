// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { BsSearch } from "react-icons/bs";
import { db } from "../../Context/firebase";
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth"
import { auth } from "../../Context/firebase"
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

function Sidebar() {
    const [chats, setChats] = useState([]);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
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
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
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
                    <img src={currentUser.photoURL} alt="" width={40} height={40}/>
                    <span>{currentUser.displayName}</span><button
                        type="button"
                        class="btn btn-danger logoutbutton"
                        onClick={() => signOut(auth)}>LogOut</button></div>
                <div class="wrapper">
                    <BsSearch className="icon" />
                    <input class="form-control searchbar"
                        type="text"
                        placeholder="Find a User"
                        onKeyDown={handleKey}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    ></input>
                </div>
                <div className="leftup">
                    {err && <span>User not found!</span>}
                    {user && (
                        <div className="userChat" onClick={handleSelect}>
                            <img src={user.photoURL} alt="" />
                            <div className="userChatInfo">
                                <span>{user.displayName}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="Recenttext">Recent</div>
                <div className="lefticon col-md-12">
                    <div className="chatusericon left">
                        {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                            <><div className="iconspanp"
                                key={chat[0]}
                                onClick={() => handleSelect2(chat[1].userInfo)}
                            >
                                <img src={chat[1].userInfo.photoURL} alt="" className="usericon" id='cursersetting' />
                                <div className="lowerleftnameabout">
                                    <span className="lowerleftname" >{chat[1].userInfo.displayName}</span>
                                    <p className="lowerabout" >{chat[1].lastMessage?.text}</p>
                                </div>
                            </div>
                                {/* <div>   <span className='timeleft'>05 min</span></div> */}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;