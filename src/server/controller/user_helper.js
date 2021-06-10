const User = require('../model/user_model.js');

exports.findAll = function getUsers(req, res) {
  User.findAll((err, users) => {
    console.log('get all user');
    if (err) res.send(err);
    console.log('res', users);
    res.send(users);
  });
};


exports.create = function addUser(req, res) {
  const newUser = new User(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    User.create(newUser, (err, user) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'User added', data: user });
    });
  }
};


exports.findById = function getUserById(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};


exports.update = function updateUser(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    User.update(req.params.id, new User(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'User updated' });
    });
  }
};


exports.delete = function deleteUser(req, res) {
  User.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'User deleted' });
  });
};
