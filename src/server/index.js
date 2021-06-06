const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const programmingLanguagesRouter = require('./routes/get_users.js');

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
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/users', programmingLanguagesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'john',
    email: 'john@gmail.com',
  };
  jwt.sign({  user : user }, secretkey, (err, token) => { res.json({ token }); });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});