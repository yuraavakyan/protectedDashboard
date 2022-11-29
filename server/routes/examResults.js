const express = require('express');
const router = express.Router();
const ExamResult = require('../models/examResults');
const jwt = require('jsonwebtoken');

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

  const getExamResults = async (req, res, next) => {
    let results;
    try {
        results = await ExamResult.find()
    } catch (e) {
        res.status(500).json({message: e.message})
    }
    res.results = results
    next();
}

router.get('/', [authenticateToken, getExamResults], async (req, res) => {
    console.log(req.user)
    console.log(res.results)
  res.json(res.results.filter(result => result.userId === req.user._id))
})

router.get('/:id', (req, res) => {
    
})

router.post('/', async (req, res) => {
    const {userId, score} = req.body
    const result = new ExamResult({
        userId,
        score,
    })
    try {
        const newExamResult = await result.save();
        res.status(201).json(newExamResult)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
})

module.exports = router;