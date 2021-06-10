/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');
const { generateHash } = require('../config/encrypt_password.js');

// doctor object create
const Doctor = function doctorData(doctor) {
  this.full_name = doctor.full_name;
  this.str_no = doctor.str_no;
  this.email = doctor.email;
  this.phone_number = doctor.phone_number;
  this.password = generateHash(doctor.password);
  this.work_experience = doctor.work_experience;
  this.address = doctor.address;
  this.gender = doctor.gender;
  this.profile_picture = doctor.profile_picture;
  this.is_active = doctor.is_active ? doctor.is_active : 1;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Doctor.create = function createDoctor(newDoctor, result) {
  dbConn.query('INSERT INTO doctors set ? ', newDoctor, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Doctor.findById = function getDoctorById(id, result) {
  dbConn.query('Select * from doctors where doctor_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Doctor.findAll = function getAllDoctor(result) {
  dbConn.query('Select * from doctors', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('doctors : ', res);
      result(null, res);
    }
  });
};

Doctor.update = function updateDoctor(id, doctor, result) {
  dbConn.query('UPDATE doctors SET first_name=?,last_name=?,email=?,phone=? WHERE id = ?', [doctor.full_name,
    doctor.email,
    doctor.password,
    doctor.address,
    doctor.gender,
    doctor.phone_number,
    doctor.birthdate,
    doctor.birthplace,
    doctor.profile_picture, id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Doctor.delete = function deleteDoctor(id, result) {
  dbConn.query('DELETE FROM doctors WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Doctor;
