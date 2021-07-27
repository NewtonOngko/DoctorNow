const { generateHash } = require('../config/encrypt_password.js');
const Doctor = require('../model/doctor_model.js');

exports.findAll = function getDoctors(req, res) {
  Doctor.findAll((err, doctors) => {
    console.log('get all doctor');
    if (err) res.send(err);
    console.log('res', doctors);
    res.send(doctors);
  });
};


exports.create = function addDoctor(req, res) {
  const newDoctor = new Doctor(req.body);

  if (newDoctor.full_name == null || newDoctor.str_no == null || newDoctor.signature_name == null) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  }  else if (newDoctor.full_name == '' || newDoctor.str_no == '' || newDoctor.signature_name == '') {
    res.status(400).send({ error: true, message: 'required' });
  } 
  else {
    Doctor.create(newDoctor, (err, doctor) => {
      newDoctor.password = generateHash('12345678');
      if (err) res.send(err);
      res.json({ error: false, message: 'Doctor added', data: doctor });
    });
  }
};


exports.findById = function getDoctorById(req, res) {
  Doctor.findById(req.params.id, (err, doctor) => {
    if (err) res.send(err);
    res.json(doctor);
  });
};


exports.update = function updateDoctor(req, res) {
  Doctor.update(req.params.id, req.body, (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Doctor updated' });
    });
};


exports.delete = function deleteDoctor(req, res) {
  Doctor.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'Doctor deleted' });
  });
};
