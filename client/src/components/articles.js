import Button from './button'
import '../styles/articles.scss'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Articles = () => {

    const [articles, setArticles] = useState([]);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect( () => {
        Axios.get("http://localhost:5000/api/get-articles").then((res) => {
            setArticles(res.data);
            console.log(res.data)
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    return(
        <div className="container articles">
            <Link to="../pages/createArticle" className='btn-primary'>Create New Article</Link>
            <div className='cards'>
                {Object.entries(articles).map(([key, article], i) => {
                    let d = new Date(article.date_created);
                    let date = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                    return (
                        <div key={i} className='card'>
                            <div className='card-header'>
                                <span style={{color: 'gray'}}>{date}</span>
                                <h1>
                                    <Link to={`../pages/article/${article.article_id}`} style={{textDecoration:'none', color: 'black'}}>{article.title}</Link>
                                </h1>
                            </div><hr /><br />
                            <p style={{textAlign: 'center'}}>{article.content}</p>
                            <br /><hr /><br />
                            <button className='btn-danger' key={i}>Delete</button>
                            <button>Comment</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Articles;