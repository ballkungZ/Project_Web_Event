const express = require('express');

const router = express.Router();
const Post = require('../models/Product')
//Get back post
router.get('/',async(req,res) => {
    try{
        const posts = await Post.find()
        res.json(posts);
    }catch (err) {
        res.json({message: err});
    }
});
//Submit post
router.post('/',async(req,res) => {
    const post = new Post({
        Username: req.body.Username,
        Password: req.body.Password
    });
    try{
        const savedPost = await post.save()
        res.json(savedPost);
    }catch(err) {
        res.json({message: err});
    }
});



module.exports = router;
