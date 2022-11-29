const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('find-config')('.env') })
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

db.on('error', (e) => console.error(e))
db.once('open', () => console.log('Connection established'))

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const examResultsRouter = require('./routes/examResults')
app.use('/exam-results', examResultsRouter);

app.listen(5000, () => console.log('server has started on 5000'));
