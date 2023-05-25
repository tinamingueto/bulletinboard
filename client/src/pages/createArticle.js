import { useState } from "react";
import Navigation from "../components/navigation";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const sessionData = sessionStorage.getItem('session');
    const parsedSessionData = sessionData? JSON.parse(sessionData) : "";
    const sessionID = parsedSessionData? parsedSessionData.data[0].id : "";

    const reset = () => {
        setTitle("");
        setContent("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:5000/api/create-article", {
            userID: sessionID,
            title: title,
            content: content
        }).then((res) => {
            alert("Article Published!");
            navigate('/');
        }).catch((e) => {
            console.log(e);
        });
    } 

    return(
        <>
            <Navigation />
            <div className="container">
                <div className="create-article">
                    <h1>Create New Article</h1>
                    <br /><hr /><br />
                    <div className="input">
                        <label>Title</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="input">
                        <label>Content</label>
                        <textarea name="content"
                        rows={5} style={{resize: 'none'}}
                        value={content} onChange={(e) => setContent(e.target.value)} required/>
                    </div>
                    <button className="btn-primary" onClick={handleSubmit}>Post</button>&nbsp;
                    <button className="btn-white" onClick={reset}>Clear</button>
                </div>
            </div>
        </>
    )
}

export default CreateArticle;