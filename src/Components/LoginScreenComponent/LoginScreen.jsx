import { HiChatAlt2 } from "react-icons/hi";
import InputComponent from "../InputComponents";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Context/firebase";
import Loader from '../LoaderComponent/Loader'

function LoginScreen() {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        if (password === "" && email === "") {
            setMessage("Please enter email and password.")
        } else
            if (email === "") {
                setMessage("Please enter email first.")
            } else
                if (password === "") {
                    setMessage("Please enter password first.")
                } else {
                    try {
                        setMessage("")
                        setLoading(true)
                        const res = await signInWithEmailAndPassword(auth, email, password);
                        setLoading(false)

                        navigate("/")
                    } catch (err) {
                        setMessage("")
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
                    <form
                        onSubmit={handleSubmit}
                    >
                        <InputComponent type="email" placeholder="Username or email" />
                        <InputComponent type="password" placeholder="Password" />
                        <div class="d-grid">
                            <button class="btn btn-primary loginButton" type="submit">Sign in</button>
                        </div>
                        {err && <spna>Something went wrong</spna>}
                        <spna>{message}</spna>
                    </form>
                    <div className='text'>
                        <p>Don't have an account?</p>
                    </div>
                    <div className='text1'>
                        <span><Link to="/register">Register</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginScreen; 