import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoSeUYAWU3Vvj1J2T0jNpDENldQP1tI4w",
  authDomain: "mychat-125.firebaseapp.com",
  projectId: "mychat-125",
  storageBucket: "mychat-125.appspot.com",
  messagingSenderId: "486993053249",
  appId: "1:486993053249:web:cd0fdaa4c182030b1f28c0",
  measurementId: "G-Z5EZD1MGXF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()