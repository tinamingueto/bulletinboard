import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import Axios from 'axios'
import ModalDelete from "../components/modal";

const Article = () => {

    const [article, setArticle] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const id = window.location.href.split("/");

    const sessionData = sessionStorage.getItem('session');
    const parsedSessionData = sessionData? JSON.parse(sessionData) : "";
    const sessionID = parsedSessionData? parsedSessionData.data[0].id : "";

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    useEffect(() => {
        
        Axios.get(`http://localhost:5000/api/get-article/${id.slice(-1).toString()}`).then((res) => {
            setArticle(res.data)
        }).catch((e) => {
            console.log(e);
        });

        Axios.get(`http://localhost:5000/api/get-comments/${id.slice(-1).toString()}`).then((res) => {
            setComments(res.data)
            console.log(res.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    const addComment = () => {
        
        Axios.post("http://localhost:5000/api/add-comment", {
            articleID: id.slice(-1).toString(),
            userID: sessionID,
            comment: comment
        }).then((res) => {
            console.log(res.data);
        }).catch((e) => {
            console.log(e);
        });
    }

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
                                    <ModalDelete articleID={item.article_id}/>
                                </div><hr /><br />
                                <p style={{textAlign: 'center'}}>{item.content}</p>
                                <br /><hr /><br />
                                
                            </div>
                        )
                    })}
                    <div>
                        <h3 style={{marginBottom: '1rem'}}>Comments</h3>

                        <div style={{background:'white', padding: '1rem', borderRadius: '10px'}}>
                            <textarea name="comment"
                                rows={2} style={{resize: 'none'}}
                                value={comment} onChange={(e) => setComment(e.target.value)} required/>
                            <button className="btn-primary" onClick={addComment}>Comment</button>
                        </div>

                        {Object.entries(comments).map(([key, item], i) => {
                            let d = new Date(item.date_created);
                            let date = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                            return (
                                <div key={i} style={{marginTop: '1rem', display: 'flex', columnGap: '10px', alignItems: 'center'}}>
                                    <div>
                                        <h4>{item.firstname + " " + item.lastname}</h4>
                                        <span style={{color: 'gray', fontSize: '12px'}}>{date}</span>
                                    </div>
                                    <p style={{background: '#526D82', color: 'white', padding: '1rem', borderRadius: '25px'}}>{item.comment}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article;