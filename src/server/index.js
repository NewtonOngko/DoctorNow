const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const cors = require('cors')
// Setup server port
const port = process.env.PORT || 5000;

//cons permission
app.use(cors('*'))

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
const appoitmentRoutes = require('./routes/appoitment_routes.js');
const consultationRoutes = require('./routes/consultation_routes.js');
const transactionController = require('./routes/transaction_routes.js');
const ratingController = require('./routes/rating_routes.js');
const recommendationController = require('./routes/recommendation_routes.js');
const loginController = require('./routes/login_routes.js');

// using as middleware
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/news', newsRoutes);
app.use('/appoitments', appoitmentRoutes);
app.use('/consultations', consultationRoutes);
app.use('/transactions', transactionController);
app.use('/ratings', ratingController);
app.use('/recommendations', recommendationController);
app.use('/login', loginController);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
