import { HiChatAlt2 } from "react-icons/hi";
import InputComponent from "../../Components/InputComponents";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Context/firebase";
import Loader from '../LoaderComponent/Loader'

function LoginScreen() {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            setLoading(true)
            const res = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false)

            navigate("/")
        } catch (err) {
            setErr(true);
            setLoading(false)
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

                            <button class="btn btn-primary loginButton" type="submit" isonline="true">Sign in</button>
                        </div>
                        {err && <spna>Something went wrong</spna>}
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