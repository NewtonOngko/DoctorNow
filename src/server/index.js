const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// set route
const userRoutes = require('./routes/user_routes.js');
const doctorRoutes = require('./routes/doctor_routes.js');
const hospitalRoutes = require('./routes/hospital_routes.js');
const newsRoutes = require('./routes/news_routes.js');

// using as middleware
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/news', newsRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
