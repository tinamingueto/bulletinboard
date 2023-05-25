import '../styles/login.scss'
import Navigation from "../components/navigation"
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:5000/api/login", {
            email: email,
            password: pass
        }).then((res) => {
            const sessionData = { data: res.data, isLoggedIn: true };
            sessionStorage.setItem('session', JSON.stringify(sessionData));
            console.log(sessionData)
            navigate('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    return(
        <>
            <Navigation />
            <div className="container">
                <div className="login">
                    <h1>Login</h1>
                    <hr />
                    <div className='input'>
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>Password</label>
                        <input type="password" name="pass" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                    </div>
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login