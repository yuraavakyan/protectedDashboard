const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: require('find-config')('.env') })

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const users = [{
    username: 'username',
    password: bcrypt.hash('password', 10).toString()
}];

const examResults = [
  {
    username: 'username',
    score: 9, 
  },
  {
    username: 'hakob',
    score: 5,
  },
  {
    username: 'Nairi',
    score: 8
  }
]

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(!token) res.status(401).send('no token')
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.status (403).send('you are not authorized to see this page')
    req.user = user;
    next();
  })
}

app.get('/users', (req, res) => {
  res.json(users);
});

// app.post('/users', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = {username: req.body.username, password: hashedPassword};
//     users.push(user);
//     res.status(201).send();
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

app.post('/users/login', async (req, res) => {
    const {username, password} = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(500).send('username or passowrd is incorrect')
  }
    if (bcrypt.compare(password, user?.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      res.status(200).json({accessToken});
    } else {
      res.status(500).send('username or passowrd is incorrect')
    }
});

app.get('/get-exam-results', authenticateToken, (req, res) => {
  res.json(examResults.filter(result => result.username === req.user.username))
});



app.listen(5000, () => console.log('server has started on 5000'));
