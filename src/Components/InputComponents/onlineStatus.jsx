// import React, { useEffect, useState } from 'react';
// import { BsCircleFill } from "react-icons/bs";
// function onlineStatus (){
//   const[isOnline,setOnline]=useState(false);
    
//     useEffect( () =>{
//    const handleOnlineStatus = ()=>{
//         setOnline(true)
//     }
//     ;
//  const handleOfflineStatus = () =>{
//         setOnline(false)
//     }
//     return () => {
//         window.addEventListener("online",handleOnlineStatus)
//         window.addEventListener("online",handleOfflineStatus)
//     };
//     },[]);
//     return (
//         <div {`onlinestatus ${isOnline ? "onlineicon" : "offlineicon"}`}>
//             {
//                 isOnline === true ? 
//                 <BsCircleFill className="onlineicon"/>
//                 :
//                 <BsCircleFill className="offlineicon"/>  
            
//             }
         
//          </div>
        
//     );

//     }
// export default onlineStatus;
import { Offline, Online } from "react-detect-offline";
 
const onlineStatus = () => (
  <div>
    <Online  className="onlineicon">Only shown when you're online</Online>
    <Offline className="offlineicon">Only shown offline (surprise!)</Offline>
  </div>
);
export default onlineStatus;