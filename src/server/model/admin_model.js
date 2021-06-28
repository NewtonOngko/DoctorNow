/* eslint-disable no-restricted-globals */

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const dbConn = require('../config/config.js');
const { generateHash, checkPassword} = require('../config/encrypt_password.js');

// get config vars
dotenv.config();

// doctor object create
const Admin = function adminData(admin) {
  this.admin_id = admin.admin_id;
  this.admin_username = admin.admin_username;
  this.admin_password = generateHash(admin.admin_password);

  this.created_at = new Date();
  this.updated_at = new Date();
};

Admin.create = function createAdmin(newAdmin, result) {
  dbConn.query('INSERT INTO admin set ? ', newAdmin, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res);
      result(null, res.insertId);
    }
  });
};

Admin.adminLogin = function loginAdmin(req, res) {
 console.log(req.body)
 if (req.method === 'POST') {
   const username  = req.body.admin_username;
   const password  = req.body.admin_password;
   
   dbConn.query('SELECT admin_password, admin_id,admin_username FROM admin WHERE admin_username = ? ', [username], (err, result) => {
     console.log('amazing',result)
     if (result=='') {
       return res.status(404).send({ message: "Admin Not found.",status :"404" });
     }

     else if(result){
       var passwordIsValid = checkPassword(
        password,
        result[0].admin_password
       );
       if(!passwordIsValid){
         return res.status(401).send({
           accessToken: null,
           message: "Invalid Password!",
           status :"401"
         });
       }
       var token = jwt.sign({ email: result[0].admin_username,adminId: result[0].id }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: 86400 // 24 hours
       });
       res.status(200).send({
         id: result[0].admin_id,
         name: result[0].admin_username,
         accessToken: token,
         message:'success',
         status :"200"
       });
     }
   });
 }
};


module.exports = Admin;
