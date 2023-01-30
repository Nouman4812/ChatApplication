import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import moment from 'moment';

function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div class="message col-md-2" id='cursersetting'
            ref={ref}
            className={`message ${message.senderId === currentUser.uid ? "owner" : ""}`}>
            <div className={`col-md-2 ${message.senderId === currentUser.uid ? "ownerchatdiv" : "chatdiv"}`}>
                <span className='msgtext'>{message.text}</span>
                {message.img && <img src={message.img} alt="" className={`${message.senderId === currentUser.uid ? "msgimgs" : "msgimg"}`} />}
                <span className='time'>{moment.unix(message.date.seconds).format("DD MMM YYYY hh:mm a")}</span>
            </div>
            <div className={`${message.senderId === currentUser.uid ? 'userfooter' : "ownerfooter"}`}>
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.commonUser == true ? message.photoUrl : data.user.photoURL}
                    alt="" className="usericonrightlower" />
                <span className={`${message.senderId === currentUser.uid ? " ownername" : "username"}`}> {
                    message.senderId === currentUser.uid
                        ? currentUser.displayName
                        : data.commonUser == true ? message.displayName : data.user.displayName}
                </span>
            </div>
        </div>
    );
}

export default Message;