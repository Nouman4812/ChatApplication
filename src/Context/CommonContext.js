// import {
//   createContext,
//   useContext,
//   useReducer,
// } from "react";
// import { AuthContext } from "./AuthContext";

// export const commonChatContext = createContext();

// export const CommonChatContextProvider = ({ children }) => {
//   const { currentUser } = useContext(AuthContext);
//   const INITIAL_STATE = {
//     combinedId: "null",
//     user: {},
//   };

//   const commonchatReducer = (state, action) => {
//     switch (action.type) {
//       case "CHANGE_USER":
//         return {
//           user: action.payload,
//         combinedId:
//             currentUser.uid > action.payload.uid
//               ? currentUser.uid + action.payload.uid
//               : action.payload.uid + currentUser.uid,
//         };
//       default:
//         return state;
//     }
//   };
//   const [state, dispatch] = useReducer(commonchatReducer, INITIAL_STATE);

//   return (
//     <commonChatContext.Provider value={{ data:state, dispatch }}>
//       {children}
//     </commonChatContext.Provider>
//   );
// };