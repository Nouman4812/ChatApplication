import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXTrjLLbl3MODSFD3sGSESl81co0igJ9k",
  authDomain: "my-chat-125.firebaseapp.com",
  projectId: "my-chat-125",
  storageBucket: "my-chat-125.appspot.com",
  messagingSenderId: "278216047723",
  appId: "1:278216047723:web:11a4e654a08e424868c52e",
  measurementId: "G-0Q5HKN7QPF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()