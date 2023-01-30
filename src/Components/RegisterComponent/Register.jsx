import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { HiChatAlt2 } from "react-icons/hi";
import InputComponent from "../InputComponents";
import { useState } from "react";
import { BsFileImage } from "react-icons/bs";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../Context/firebase";
import { useNavigate, Link } from "react-router-dom";
import Loader from '../LoaderComponent/Loader'

function Register() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        if (displayName === "" && password === "" && email === "" && file === "") {
            setMessage("Please enter name,email,password and image.")
        } else
            if (displayName === "" && password === "" && email === "") {
                setMessage("Please enter name,email and password.")
            } else
                if (displayName === "" && password === "") {
                    setMessage("Please enter name and password.")
                } else
                    if (displayName === "" && email === "") {
                        setMessage("Please enter name and email.")
                    } else
                        if (displayName === "" && file === "") {
                            setMessage("Please enter name and image.")
                        } else
                            if (password === "" && file === "") {
                                setMessage("Please enter password and image.")
                            } else
                                if (password === "" && email === "") {
                                    setMessage("Please enter password and email.")
                                } else
                                    if (displayName === "") {
                                        setMessage("Please enter name first.")
                                    } else
                                        if (email === "") {
                                            setMessage("Please enter email first.")
                                        } else
                                            if (password === "") {
                                                setMessage("Please enter password first.")
                                            } else
                                                if (file === "") {
                                                    setMessage("Please enter image first.")
                                                } else {
                                                    try {
                                                        setLoading(true)
                                                        const res = await createUserWithEmailAndPassword(auth, email, password);
                                                      
                                                        const storageRef = ref(storage, displayName);

                                                        const uploadTask = uploadBytesResumable(storageRef, file);

                                                        uploadTask.on(
                                                            (error) => {
                                                                setErr(true);
                                                                
                                                            },
                                                            () => {
                                                                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                                                    //Update profile
                                                                    await updateProfile(res.user, {
                                                                        displayName,
                                                                        photoURL: downloadURL,
                                                                    });
                                                                    //create user on firesto
                                                                    await setDoc(doc(db, "users", res.user.uid),
                                                                        {
                                                                            uid: res.user.uid,
                                                                            displayName,
                                                                            email,
                                                                            photoURL: downloadURL,
                                                                        });
                                                                    //create empty user chats on firestore
                                                                    await setDoc(doc(db, "userChats", res.user.uid), {});
                                                                });
                                                            }
                                                        );
                                                          navigate('/login')
                                                            setLoading(false)
                                                    } catch (err) {
                                                        setErr(true);
                                                        setLoading(false)
                                                    }
                                                }
    };
    return (
        <div className="container ">
            <Loader isLoading={loading} />
            <div className="col-lg-4 containerstyle">
                <h3 className='logo'><HiChatAlt2 /></h3>
                <h1 className='logotext'>Chatting Application</h1>
                <div class="form-group">
                    <form onSubmit={handleSubmit}>
                        <InputComponent type="text" placeholder="Display Name" />
                        <InputComponent type="email" placeholder="Create a Email" />
                        <InputComponent type="password" placeholder="Set Password" />
                        <input style={{ display: "none" }} type="file" id="file" />
                        <label className="AttachAvatar" htmlFor="file">
                            <img src={''} alt="" />
                            <span><BsFileImage className="img" /> Add an avatar </span>
                        </label>
                        <div class="d-grid">
                            <button class="btn btn-primary loginButton" type="submit">Sign Up</button>
                        </div>
                        {err && <spna>Something went wrong</spna>}
                        <spna>{message}</spna>
                    </form>
                    <div className='text'>
                        <p>Don't have an account?</p>
                    </div>
                    <div className='text1'>
                        <span><Link to="/login">Login</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;