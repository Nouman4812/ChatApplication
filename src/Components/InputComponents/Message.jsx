import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
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
            className={`message ${message.senderId === currentUser.uid ? "owner":""}`}
        >
            <div className={`col-md-2 ${message.senderId === currentUser.uid ? "ownerchatdiv":"chatdiv"}`}>
                <span className='msgtext'>{message.text}</span>
                {message.img && <img src={message.img} alt="" className="msgimg" />}

                {/* <span className='time'> </span> */}
            </div>
            <div className='msgfooter'>
                {/* <FontAwesomeIcon icon={faCircle} className="Circle"/>  */}
                
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL
                }
                    alt="" className="usericonrightlower" />
                    <p className="upericon" >{data.currentUser?.displayName}</p>
                {/* <p class="icontext">Doris Brown</p> */}
                
            </div>
        </div>
    );
}

export default Message;