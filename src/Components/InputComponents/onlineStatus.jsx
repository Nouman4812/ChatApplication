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
//         <>
//             {
//                 isOnline === true ? 
//                 <BsCircleFill className="onlineicon"/>
//                 :
//                 <BsCircleFill className="offlineicon"/>  
            
//             }
         
//          </>
        
//     );

//     }
// export default onlineStatus;