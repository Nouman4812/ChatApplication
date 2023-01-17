import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR6UlcXP_min5G88bGTYHUY59Lya3uWXg",
  authDomain: "my-chat125.firebaseapp.com",
  projectId: "my-chat125",
  storageBucket: "my-chat125.appspot.com",
  messagingSenderId: "779362648855",
  appId: "1:779362648855:web:bf3ee4fb599e2560486d52",
  measurementId: "G-GKSK89CGPB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()