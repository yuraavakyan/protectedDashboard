const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: require('find-config')('.env') })

const getUser = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: 'no such user' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
    res.user = user
    next();
}

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
    res.users = users
    next();
}

router.post('/login', getUsers, (req, res) => {
    const { username, password } = req.body
    const user = res.users.find((user) => user.username === username);
    if (!user) {
        return res.status(500).send('username or passowrd is incorrect')
    }
    if (bcrypt.compare(password, user?.password)) {
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken, username: user.username, userId: user._id });
    } else {
        res.status(500).send('username or passowrd is incorrect')
    }

})

router.get('/', getUsers, async (req, res) => {
    res.json({ users: res.users })
})

router.get('/:id', getUser, (req, res) => {
    res.json({ user: res.user })
})

router.post('/', async (req, res) => {
    const { firstName, lastName, username, password } = req.body
    const user = new User({
        firstName,
        lastName,
        username,
        password: (await bcrypt.hash(password, 10)).toString()
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

module.exports = router;