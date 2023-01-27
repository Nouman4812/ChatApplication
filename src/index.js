import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./Context/AuthContext";
import { ChatContextProvider } from "./Context/ChatContext";
import { CommonChatContextProvider } from './Context/CommonContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
      <ChatContextProvider>
      {/* <CommonChatContextProvider> */}
        <React.StrictMode>
          <App />
        </React.StrictMode>
        {/* </CommonChatContextProvider> */}
      </ChatContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
