import React, { useContext, useState } from "react";
import { BsFileImage, BsCaretRightSquareFill, BsPaperclip } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, }
    from "firebase/firestore";
import { db, storage } from "../../Context/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";;
function Input(props) {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
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
                        await updateDoc(doc(db, "nocopy", data.chatId), {
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
            await updateDoc(doc(db, "nocopy", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }   await updateDoc(doc(db, "userChats", currentUser.uid), {
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
    };
    return (
        <div>
            <input
                type="text"
                class="form-control lastinputtext"
                placeholder="Type Message"
                onChange={(e) => setText(e.target.value)}
                value={text} />

            <BsPaperclip
                className="emoji"
                src={""} alt=""
            />
            <BsFileImage className="msg"
                htmlFor="file"
                src={""} alt=""
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
            />

            <label htmlFor="file">
                <img src={""} alt="" />
            </label>
            <BsCaretRightSquareFill
                className="msg"
                onClick={handleSend}
            />
        </div>
    );
}

export default Input;
