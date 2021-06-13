const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors')

// Setup server port
const port = process.env.PORT || 5000;

app.use(cors('*'))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'john',
    email: 'john@gmail.com',
  };
  jwt.sign({  user : user }, secretkey, (err, token) => { res.json({ token }); })});
// define a root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// set route
const employeeRoutes = require('./routes/get_users.js');
//const doctorRoutes = require('./routes/get_doctors.js');

// using as middleware
app.use('/users', employeeRoutes);
//app.use('/doctor', doctorRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
