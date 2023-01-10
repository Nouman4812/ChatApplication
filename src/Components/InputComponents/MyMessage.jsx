import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { senderId } from "../../Context/firebase"
function MessageComponents({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div class="message col-md-2" id='cursersetting'
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}
        >
            {/* <div className='chatdiv col-md-8'> */}
            {/* <span className='msgtext'>{message.text}</span> */}
            {/* {message.img && <img src={message.img} alt="" />} */}
            {/* <span className='time'>10:00 AM</span> */}
            {/* </div> */}
            <div className='msgfooter'>
                {/* <FontAwesomeIcon icon={faCircle} className="Circle"/>  */}
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL
                }
                    alt="" className="usericonrightlower" />
                {/* <p class="icontext">Doris Brown</p> */}
            </div>
        </div>
    );
}

export default MessageComponents;