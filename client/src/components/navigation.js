import '../styles/navigation.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect , useRef} from 'react'

const Navigation = () => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const sessionData = sessionStorage.getItem('session');
    const parsedSessionData = sessionData? JSON.parse(sessionData) : "";
    const sessionName = parsedSessionData? parsedSessionData.data[0].firstname : "";

    useEffect(() => {
        if(sessionData){
            setIsLoggedIn(parsedSessionData.isLoggedIn);
        }
    }, [])

    const logoutButton = () => {
        if(sessionData){
            sessionStorage.removeItem('session');
            setIsLoggedIn(false);
            navigate("/");
        }
    }

    return(
        <div className='nav'>
            <nav className="container">
                <Link to="/">
                    <h1>
                        Bulletin 
                        <span>Board</span>
                    </h1>
                </Link>
                {isLoggedIn ? (
                    <ul>
                        <li>Hello, <b>{sessionName}</b></li>
                        <li><a onClick={logoutButton}>Logout</a></li>
                    </ul>
                ):(
                    <ul>
                        <li><Link to="../pages/login">Login</Link></li>
                        <li><Link to="../pages/register">Register</Link></li>
                    </ul>
                )}
               
            </nav>
        </div>
    )
}

export default Navigation;