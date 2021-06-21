/* eslint-disable no-restricted-globals */
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConn = require('../config/config.js');
const { generateHash, checkPassword} = require('../config/encrypt_password.js');
const { json } = require('body-parser');

// get config vars
dotenv.config();

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
  console.log(req.body)
  if (req.method === 'POST') {
    const  email  = req.body.email;
    const  password  = req.body.password;
    
    dbConn.query('SELECT password,email,full_name,user_id FROM users WHERE email = ? ', [email], (err, result) => {
      console.log('amazing',result)
      if (result=='') {
        return res.status(404).send({ message: "User Not found." });
      }
      // else if(result){
      //   return res.status(200).send({ message: "User found." });
      // }
      else if(result){
        var passwordIsValid = checkPassword(
          password,
          result[0].password
        );
        if(!passwordIsValid){
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ email: result[0].email,userId: result[0].id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
          id: result[0].user_id,
          email: result[0].email,
          accessToken: token,
          status:'success'
        });
      }
    });
  }
};

module.exports = User;
