module.exports = (app) => {
    const express = require('express');
    const sessions = require('express-session');
    const cookieParser = require('cookie-parser');
    const Register = require("./models/Regiter");
  

    const oneDay = 1000 * 60 * 60 * 24;
    app.use(sessions({
        secret:"thisismysecrcetkey",
        saveUninitialized:true,
        cookie: { maxAge: oneDay},
        resave: false
    }));

    

    app.use(express.json());
    app.use(express.urlencoded({ extended: false}));

    app.use(express.static(__dirname));

    app.use(cookieParser());

    var session;

    
    //Route
    app.get('/',(req,res) => {
        session = req.session;
        if(session.userid){
            res.sendFile(__dirname + "/view/Home.html")
        }else
        res.sendFile(__dirname + "/view/Login.html")
    });

    app.get("/register",(req,res) => {
        res.render("register");
    });

    //Post in database
    app.post("/register",async(req,res) => {
        try{
            const user = ({
                Username : req.body.Username,
                Password : req.body.Password,
                Faculty : req.body.Faculty,
                Email : req.body.Email,
                Year : req.body.Year
            });

            await Register.insertMany([user]);
            res.sendFile(__dirname + "/view/Login.html");

        } catch (error){
            res.status(400).send(error);
        }
    });

    //Route login if pass go calender page
    app.post("/Login",async(req,res) => {
        try {
            const check = await Register.findOne({Username:req.body.username})

            if (check.Password === req.body.password){
                res.sendFile(__dirname + "/view/home.html");
                session = req.session;
                session.userid = req.body.username
                console.log(req.session)
            }
            else{
                res.send("Password is wrong!!! ")
            }
        }
        catch{
            res.send("Error!!!")
        }
    });

    app.get('/logout',(req,res) => {
        req.session.destroy();
        res.redirect('/')
    })

    //Route Error page
    app.get('*',(req,res) => {
        res.send('Error 404')
    })

}
