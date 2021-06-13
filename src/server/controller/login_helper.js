const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user_model.js');

exports.login = function userLogin(req, res) {
  const loginUser = User.find({ email: req.body.email });
  const userPassword = User.find({ password: req.body.password });

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(500).send({ error: true, message: 'Please provide all required field' });
  } else {
    User.find(loginUser, (err, user) => {
      if (user.length < 1) res.status(404).send({ error: true, message: 'User not registered' });
      bcrypt.compare(userPassword, user[0].password, (error, result) => {
        if (error) res.send(error);
        if (result) {
          jwt.sign({
            email: user[0].email,
            userId: user[0].user.id,

          }, process.env.JWT_KEY, {
            expiresIn: '1h'
          });
          res.status(200).send({ error: true, message: 'ok' });
        }
      });
      if (err) res.send(err);
      res.json({ error: false, message: ' user added', data: user });
    });
  }
};
