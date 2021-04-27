const express = require('express');
const os = require('os');

const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'campusride',
});
const secretkey ="secretdoctor"
// const db = mysql.createPool({
//   host: 'remotemysql.com',
//   user: '0fN1VwgpEd',
//   password: 'hWTYnqfGDt',
//   database: '0fN1VwgpEd',
// });

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }),);

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'john',
    email: 'john@gmail.com',
  };
  jwt.sign({  user : user }, secretkey, (err, token) => { res.json({ token }); });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
