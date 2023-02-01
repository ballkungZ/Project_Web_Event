const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require('cookie-parser')
require('dotenv/config');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret:"thisismysecrcetkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay},
    resave: false
}));

app.use(bodyParser.json());
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(__dirname));

app.use(cookieParser());

//Connect to DB
mongoose.connect(process.env.DB_Connect)
        .then(() => console.log('Connection -_-'))
        .catch((err) => console.error(err))

//Import Routes
const postsRoute = require('./routes/post');

app.use('/post', postsRoute);

//Route
app.get('/',(req,res) => {
    session = req.session;
    if(session.userid){
        res.sendFile(__dirname + "/view/Home.html")
    }else
    res.sendFile(__dirname + "/view/Login.html")
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session = req.session;
        session.userid = req.body.username
        console.log(req.session)
        res.send(`<a href=\'/logout'>click to logout </a>`)
    }
    else{
        res.send("Invalid username or password")
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/')
})

app.get('*',(req,res) => {
    res.send('Error 404')
})

const myusername = "ballzaz1"
const mypassword = "ballza123z"

var session;

app.listen(PORT, () => console.log('Server Run'))