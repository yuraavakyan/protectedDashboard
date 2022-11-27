const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const users = [{
    username: 'username',
    password: 'password'
}];

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
    return res.status(400).send('user not found');
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send('Successfully logged in');
    }
  } catch {
    res.status(500).send('Password is incorrect');
  }
});

app.listen(5000, () => console.log('server has started on 5000'));
