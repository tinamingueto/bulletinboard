const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bulletinboard'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/signup", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const sql = "INSERT INTO users (firstname, lastname, email, password) VALUES(?,?,?,MD5(?))"
    db.query(sql, [firstname, lastname, email, password], (err, result) => {
        res.send(result);
    });
});

app.post("/api/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * FROM users WHERE email = ? AND password = MD5(?) AND status = 'ACTIVE' LIMIT 1";
    db.query(sql, [email, password], (err, result) => {
        res.send(result);
    });
})

app.post("/api/create-article", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const userID = req.body.userID;
    
    const sql = "INSERT INTO articles(user_id, title, content) VALUE (?, ?, ?)"
    db.query(sql, [userID, title, content], (err, result) => {
        res.send(result);
    });
})

app.get("/api/get-articles", (req, res) => {
    const sql = "SELECT * FROM articles WHERE status = 'ACTIVE' ORDER BY date_created ASC";

    db.query(sql, (err, result) => {
        res.send(result);
    });
})

app.get("/api/get-article/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM articles WHERE article_id = ${id} AND status = 'ACTIVE'`;

    db.query(sql, (err, result) => {
        res.send(result);
    });
})

app.listen(5000, () => {
    console.log("Server running at port 5000");
})