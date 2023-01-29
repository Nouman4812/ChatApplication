// import React, { useEffect, useState } from 'react';
// import { BsCircleFill } from "react-icons/bs";
// function onlineStatus (){
//   const[currentUser,setcurrentUser]=useState(false);
//   const { data } = useContext(ChatContext);
//     useEffect( () =>{
//    const handleOnlineStatus = ()=>{
//         setOnline(true)
//     }
//     ;
//  const handleOfflineStatus = () =>{
//     setcurrentUser(false)
//     }
//     return () => {
//         window.addEventListener("online",handleOnlineStatus)
//         window.addEventListener("online",handleOfflineStatus)
//     };
//     },[]);
//     return (
//         <div className={`${data.currentUser ? "onlineicon" : "offlineicon"}`}>
//             {
//                 data.currentUser === true  ? 
//                 <BsCircleFill className="onlineicon"/>
//                 :
//                 <BsCircleFill className="offlineicon"/>  
            
//             }
         
//          </div>
        
//     );

//     }
// export default onlineStatus;
function onlineStatus (){
useEffect(() => {
    const handleOnline = () => {
      setState((prevState) => ({
        ...prevState,
        online: true,
        since: new Date().toString(),
      }));
    };
const handleOffline = () => {
      setState((prevState) => ({
        ...prevState,
        online: false,
        since: new Date().toString(),
      }));
    };
const handleConnectionChange = () => {
      setState((prevState) => ({
        ...prevState,
        ...getNetworkConnectionInfo(),
      }));
    };
window.addEventListener("online", handleOnline);
window.addEventListener("offline", handleOffline);
const connection = getNetworkConnection();
connection?.addEventListener("change", handleConnectionChange);
return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      connection?.removeEventListener("change", handleConnectionChange);
    };
  }, []);}
  export default onlineStatus;