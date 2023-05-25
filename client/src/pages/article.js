import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Axios from 'axios'

const Article = () => {

    const [article, setArticle] = useState([]);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    useEffect(() => {
        const id = window.location.href.split("/");
        Axios.get(`http://localhost:5000/api/get-article/${id.slice(-1).toString()}`).then((res) => {
            setArticle(res.data)
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    return(
        <>
            <Navigation />
            <div className="container">
                <div className="create-article">
                    {Object.entries(article).map(([key, item], i) => {
                        let d = new Date(item.date_created);
                        let date = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                        return (
                            <div key={i} className='card'>
                                <div className='card-header' style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <span style={{color: 'gray'}}>{date}</span>
                                        <h1>
                                            {item.title}
                                        </h1>
                                    </div>
                                    <button className="btn-danger">Delete</button>
                                </div><hr /><br />
                                <p style={{textAlign: 'center'}}>{item.content}</p>
                                <br /><hr /><br />
                                
                                <div>
                                    <h3>Comments</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Article;