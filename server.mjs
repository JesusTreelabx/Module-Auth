

import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json())

const port = 3000;

// root
app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// register
app.post("/auth/register", (req, res) => { 
    console.log(req.body)
    res.send('testing register');
});

// verify-email
app.post("/auth/verify-email", (req, res) => {
    console.log(req.body)
    res.send('testing verify-email');
});

// login
app.post("/auth/login", (req, res) => {
    console.log(req.body)
    res.send('testing login');
});

// logout
app.post("/auth/logout", (req, res) => {
    console.log(req.body)
    res.send('testing logout');
});

// me
app.get("/me", (req, res) => {
    res.send('testing me');
});

// sessions
app.get("/sessions/", (req, res) => {
    res.send('testing sesions');
});

// sesssions :id
app.get("/sessions/:id", (req, res) => {
    res.send('testing sessions :id');
});

// forgot--password
app.post("/auth/forgot-password", (req, res) => {
    console.log(req.body)
    res.send('testing forgot-password');
});

// reset-password
app.post("/auth/reset-password", (req, res) => {
    console.log(req.body)
    res.send('testing reset-password');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 