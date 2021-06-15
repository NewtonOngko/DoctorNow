/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');
const { generateHash } = require('../config/encrypt_password.js');

// user object create
const User = function userData(user) {
  this.full_name = user.full_name;
  this.email = user.email;
  this.password = generateHash(user.password);
  this.address = user.address;
  this.gender = user.gender;
  this.phone_number = user.phone_number;
  this.birthdate = user.birthdate;
  this.birthplace = user.birthplace;
  this.profile_picture = user.profile_picture;

  this.created_at = new Date();
  this.updated_at = new Date();
};

User.create = function createUser(newUser, result) {
  dbConn.query('INSERT INTO users set ? ', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


User.findById = function getUserById(id, result) {
  dbConn.query('Select * from users where user_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAll = function getAllUser(result) {
  dbConn.query('Select * from users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('users : ', res);
      result(null, res);
    }
  });
};

User.update = function updateUser(id, user, result) {
  dbConn.query('UPDATE users SET first_name=?,last_name=?,email=?,phone=? WHERE id = ?', [user.full_name,
    user.email,
    user.password,
    user.address,
    user.gender,
    user.phone_number,
    user.birthdate,
    user.birthplace,
    user.profile_picture, id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.delete = function deleteUser(id, result) {
  dbConn.query('DELETE FROM users WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.login = function loginUser(req, res) {
  if (req.method === 'POST') {
    const post = req.body;
    const { email } = post;
    const { password } = post;
    dbConn.query('SELECT user_id, full_name FROM users WHERE email = ? and password = ?', [email, password], (err, result) => {
      if (err) {
        res.status(202).send({ error: true, message: 'User not registered' });
        console.log('error: ', err);
        // result(null, err);
      } else {
        res.status(404).send({ error: result, message: 'login' });
      }
    });
  }
};

module.exports = User;
