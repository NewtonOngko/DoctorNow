/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// user object create
const Hospital = function hospitalData(hospital) {
  this.hospital_name = hospital.hospital_name;
  this.email = hospital.email;
  this.phone_number = hospital.phone_number;
  this.location = hospital.location;
  this.description = hospital.description;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Hospital.create = function createHospital(newHospital, result) {
  dbConn.query('INSERT INTO hospitals set ? ', newHospital, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Hospital.findById = function getHospitalById(id, result) {
  dbConn.query('Select * from hospitals where hospital_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Hospital.findAll = function getAllHospital(result) {
  dbConn.query('Select * from hospitals', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('users : ', res);
      result(null, res);
    }
  });
};

Hospital.update = function updatHospital(id, hospital, result) {
  dbConn.query('UPDATE users SET hospital_name=?,email=?,phone_number=?,location=?,description=? WHERE id = ?', [hospital.hospital_name,
    hospital.email,
    hospital.phone_number,
    hospital.location,
    hospital.description,
    id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Hospital.delete = function deleteHospital(id, result) {
  dbConn.query('DELETE FROM hospitals WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Hospital;
