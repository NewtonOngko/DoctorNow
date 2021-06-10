const Doctor = require('../model/user_model.js');

exports.findAll = function getUsers(req, res) {
  Doctor.findAll((err, doctors) => {
    console.log('get all doctor');
    if (err) res.send(err);
    console.log('res', doctors);
    res.send(doctors);
  });
};


exports.create = function addDoctor(req, res) {
  const newDoctor = new Doctor(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Doctor.create(newDoctor, (err, doctor) => {
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
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Doctor.update(req.params.id, new Doctor(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Doctor updated' });
    });
  }
};


exports.delete = function deleteDoctor(req, res) {
  Doctor.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'Doctor deleted' });
  });
};
