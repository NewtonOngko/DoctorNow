/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// doctor object create
const Appointment = function appointmentData(appointment) {
  this.user_id = appointment.user_id;
  this.doctor_id = appointment.doctor_id;
  this.hospital_id = appointment.hospital_id;
  this.time = appointment.time;
  this.price = appointment.price;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Appointment.create = function createAppointment(newAppointment, result) {
  dbConn.query('INSERT INTO appointments set ? ', newAppointment, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Appointment.findById = function getAppointmentById(id, result) {
  dbConn.query(`SELECT appointments.appoitment_id ,users.full_name as user ,doctors.full_name as doctor ,hospitals.hospital_name as hospital,appointments.time ,appointments.price ,appointments.created_at ,appointments.updated_at 
  FROM appointments 
  JOIN users
  ON appointments.user_id =users.user_id 
  JOIN doctors
  on appointments .doctor_id =doctors .doctor_id 
  JOIN hospitals
  on appointments .hospital_id = hospitals .hospital_id where appointments.appoitment_id = ?`, id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Appointment.findAll = function getAllAppointment(result) {
  dbConn.query(`SELECT appointments.appoitment_id ,users.full_name as user ,doctors.full_name as doctor ,hospitals.hospital_name as hospital,appointments.time ,appointments.price ,appointments.created_at ,appointments.updated_at 
  FROM appointments
  JOIN users
  ON appointments.user_id =users.user_id 
  JOIN doctors
  on appointments .doctor_id =doctors .doctor_id 
  JOIN hospitals
  on appointments .hospital_id = hospitals .hospital_id`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('appointments : ', res);
      result(null, res);
    }
  });
};

Appointment.update = function updateAppointment(id, appointment, result) {
  dbConn.query('UPDATE appointments SET time=? WHERE id = ?', [
    appointment.time,
    id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Appointment.delete = function deleteAppointment(id, result) {
  dbConn.query('DELETE FROM appointments WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Appointment;
