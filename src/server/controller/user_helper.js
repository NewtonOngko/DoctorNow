const Regex = require("regex");
const moment = require("moment");
const User = require('../model/user_model.js');

exports.findAll = function getUsers(req, res) {
  User.findAll((err, users) => {
    for(var i = 0 ; i < users.length; i++ ) {
      users[i].birthdate= moment(users[i].birthdate).format("YYYY-MM-DD");
    }
    console.log('get all user');
    if (err) res.send(err);
    console.log('res', users);
    res.send(users);
  });
};


exports.create = function addUser(req, res) {
  const newUser = new User(req.body);

  if ( newUser.full_name == null || newUser.email == null || newUser.password == null || newUser.address == null || newUser.gender == null || newUser.phone_number == null || newUser.birthdate == null || newUser.birthplace == null || newUser.profile_picture == null) {  
  res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else if (newUser.email == '' && newUser.email != Regex('/^\S+@\S+\.\S+$/')) {
    res.status(400).send({ error: true, message: 'Please input your email' });
  } else if (newUser.full_name == '') {
    res.status(400).send({ error: true, message: 'Please input your full name' });
  } else if (newUser.password == '') {
    res.status(400).send({ error: true, message: 'Please input your password' });
  } else if (newUser.address == '') {
    res.status(400).send({ error: true, message: 'Please input your address' });
  } else if (newUser.gender == '') {
    res.status(400).send({ error: true, message: 'Please input your gender' });
  } else if (newUser.phone_number == '' && newUser.phone_number != Number) {
    res.status(400).send({ error: true, message: 'Please input your phone number' });
  } else if (newUser.birthdate == '' && newUser.birthdate == Date)  {
    res.status(400).send({ error: true, message: 'Please input your birthdate' });
  } else if (newUser.birthplace == '') {
    res.status(400).send({ error: true, message: 'Please input your birthplace' });
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
  const newUser = new User(req.body);

  // if ( newUser.full_name == null || newUser.email == null || newUser.address == null || newUser.gender == null || newUser.phone_number == null || newUser.birthdate == null || newUser.birthplace == null || newUser.profile_picture == null) {  
  //   res.status(400).send({ error: true, message: 'Please provide all required field' });
  // } else if (newUser.email == '' && newUser.email != Regex('/^\S+@\S+\.\S+$/')) {
  //   res.status(400).send({ error: true, message: 'Please input your email' });
  // } else if (newUser.full_name == '') {
  //   res.status(400).send({ error: true, message: 'Please input your full name' });
  // } else if (newUser.address == '') {
  //   res.status(400).send({ error: true, message: 'Please input your address' });
  // } else if (newUser.gender == '') {
  //   res.status(400).send({ error: true, message: 'Please input your gender' });
  // } else if (newUser.phone_number == '' && newUser.phone_number != Number) {
  //   res.status(400).send({ error: true, message: 'Please input your phone number' });
  // } else if (newUser.birthdate == '' && newUser.birthdate == Date)  {
  //   res.status(400).send({ error: true, message: 'Please input your birthdate' });
  // } else if (newUser.birthplace == '') {
  //   res.status(400).send({ error: true, message: 'Please input your birthplace' });
  // } else {
  //   User.update(req.params.id, new User(req.body), (err) => {
  //     if (err) res.send(err);
  //     res.json({ error: false, message: 'User updated' });
  //   });
  // }
  User.update(req.params.id, new User(req.body), (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'User updated' });
  });
};


exports.delete = function deleteUser(req, res) {
  User.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'User deleted' });
  });
};
