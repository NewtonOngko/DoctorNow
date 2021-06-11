/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// doctor object create
const Appoitment = function appoitmentData(appoitment) {
  this.user_id = appoitment.user_id;
  this.doctor_id = appoitment.doctor_id;
  this.hospital_id = appoitment.hospital_id;
  this.time = appoitment.time;
  this.price = appoitment.price;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Appoitment.create = function createAppoitment(newAppoitment, result) {
  dbConn.query('INSERT INTO appoitments set ? ', newAppoitment, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Appoitment.findById = function getAppoitmentById(id, result) {
  dbConn.query('Select * from appoitments where appoitment_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Appoitment.findAll = function getAllAppoitment(result) {
  dbConn.query('Select * from appoitments', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('doctors : ', res);
      result(null, res);
    }
  });
};

Appoitment.update = function updateAppoitment(id, appoitment, result) {
  dbConn.query('UPDATE appoitments SET time=? WHERE id = ?', [
    appoitment.time,
    id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Appoitment.delete = function deleteAppoitment(id, result) {
  dbConn.query('DELETE FROM appoitments WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Appoitment;
