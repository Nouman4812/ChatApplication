import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../Context/firebase'
import { AuthContext } from '../../Context/AuthContext'
function Navbar(props) {
    const {currentUser} = useContext(AuthContext)

    return (
        <div>
             <span className="chatstext">Chats</span>
      <div className="user">
        <img src={currentUser} alt=""className="usericonrightlower" />
        <span>{currentUser}</span>
        <button
        class="btn btn-danger logoutbutton" 
        onClick={()=>signOut(auth)}>logout</button>
      </div>
        </div>
    );
}

export default Navbar;
 