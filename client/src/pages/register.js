
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/navigation';

const Register = () => {

    const navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCPass] = useState("");
    const [mess, setMess] = useState("");

    const defaultState = () => {
        setFname("");
        setLname("");
        setEmail("");
        setPass("");
        setCPass("");
    }
    
    const submitData = async (e) => {
        e.preventDefault();

        try{
            if(pass == cpass){
                Axios.post("http://localhost:5000/api/signup", {
                    firstname: fname,
                    lastname: lname, 
                    email: email,
                    password: pass
                }).then(() => {
                    navigate('/pages/login')
                }).catch((e) => {
                    console.log(e);
                });

                navigate('/');
            }else{
                setMess("Password does not match.");
            }
        }catch(e){
            console.error(e);
        }
        defaultState();
    } 

    return(
        <>
            <Navigation />
            <div className='container'>
                <h1>Registration</h1>
                <form onSubmit={submitData} method='POST'>
                    <label>First Name</label>
                    <input name="fname" type="text" value={fname} onChange={(e) => setFname(e.target.value)} required/>
                    <label>Last Name</label>
                    <input name="lname" type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
                    <label>Email Address</label>
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <label>Password</label>
                    <input name="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                    <label>Confirm Password</label>
                    <input name="cpass" type="password" value={cpass} onChange={(e) => setCPass(e.target.value)} required/>
                    {(mess != null) && <p>{mess}</p>}
                    <button onClick={submitData}>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;
