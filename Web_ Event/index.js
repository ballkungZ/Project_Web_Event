const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
mongoose.Promise = global.Promise;
//Connect to DB
mongoose.connect(process.env.DB_Connect)
        .then(() => console.log('Connection -_-'))
        .catch((err) => console.error(err))

//Import Routes
const postsRoute = require('./routes/post');
//Route
app.get('/',(req,res) => {
    res.send('We are on home')
});

app.listen(3000);