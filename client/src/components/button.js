import '../styles/button.scss'
import {Link} from 'react-router-dom'

const Button = (props) => {

    const sessionData = sessionStorage.getItem('session');

    return(
        <>
            {
                sessionData && 
                <Link className={props.styles} to={props.routeTo} style={{marginTop: '3rem'}}>{props.value}</Link>
            }
            
        </>
    )
}

export default Button