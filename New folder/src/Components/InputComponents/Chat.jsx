import React, { useContext } from "react";
import usericon1 from '../../images/user-1.jfif';
import { ChatContext } from "../../Context/ChatContext";

function Chat(props) {
    const { data } = useContext(ChatContext);
    return (
        <div className="chatuser">
            <div className="chatusericon">
                <img src={usericon1} className="usericonright" />
                <p className="upericon" >{data.user?.displayName}</p>
            </div>
            <div>
                <i class="bi bi-camera-video"></i>
                <i class="bi bi-person-add"></i>
                <i class="bi bi-three-dots-vertical"></i>
            </div>
        </div>

    );
}

export default Chat;