const Regex = require("regex");
const Admin = require('../model/admin_model.js');

exports.create = function addAdmin(req, res) {
  const newAdmin = new Admin(req.body);

  if ( newAdmin.admin_username == null || newAdmin.admin_password == null) {  
  res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else if (newAdmin.admin_username == '') {
    res.status(400).send({ error: true, message: 'Please input your username' });
  } else if (newAdmin.admin_password == '') {
    res.status(400).send({ error: true, message: 'Please input your password' });
  } else {
    Admin.create(newAdmin, (err, admin) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Admin added', data: admin });
    });
  }
};


exports.update = function updateUser(req, res) {
  const newAdmin = new User(req.body);

  if ( newAdmin.admin_username == null || newAdmin.admin_password == null) {  
   res.status(400).send({ error: true, message: 'Please provide all required field' });
   } else if (newAdmin.admin_username == '') {
     res.status(400).send({ error: true, message: 'Please input your username' });
   } else if (newAdmin.admin_password == '') {
     res.status(400).send({ error: true, message: 'Please input your password' });
   }  else {
    Admin.update(req.params.id, new Admin(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Admin updated' });
    });
 
   }
};