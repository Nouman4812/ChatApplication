import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCzsNw9KIH5EZ4DbNgmUMNV_ko6vhYDcYM",
    authDomain: "nocopy-b8a71.firebaseapp.com",
    projectId: "nocopy-b8a71",
    storageBucket: "nocopy-b8a71.appspot.com",
    messagingSenderId: "846587056809",
    appId: "1:846587056809:web:5907a1b69bf3cf09db4fb8",
    measurementId: "G-BJG19H5PZL"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()