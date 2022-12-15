const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/user');
require('dotenv').config({ path: require('find-config')('.env') })

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) res.status(401).send('no token')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('you are not authorized to see this page')
        req.user = user;
        next();
    })
}

const getUserById = (req, res, next) => {

}

router.get('/', async (req, res) => {
    const posts = await Post.find();
    const author = User.findById()
    res.status(200).json(posts)
})

router.post('/', authenticateToken, async (req, res) => {
    const { post } = req.body;
    const userDetails = await User.findById(req.user._id)
    const newPost = new Post({
        author: {
            _id: userDetails._id,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
        },
        post
    })
    const generatedPost = await newPost.save();
    res.status(201).json(generatedPost)
})

router.delete('/', authenticateToken, (req, res) => {
    Post.deleteOne({ _id: req.body.id }).then((result) => res.status(204).json({ success: true })).catch(err => res.status(404).json({ success: false }))
})

module.exports = router;

