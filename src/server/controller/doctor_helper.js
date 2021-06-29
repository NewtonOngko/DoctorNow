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

  if (newDoctor.full_name == null || newDoctor.str_no == null || newDoctor.email == null || newDoctor.phone_number == null || newDoctor.password == null || newDoctor.work_experience == null || newDoctor.address == null || newDoctor.gender == null || newDoctor.profile_picture == null || newDoctor.is_active == null) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  }  else if (newDoctor.full_name == '' || newDoctor.str_no == '' || newDoctor.email == '' || newDoctor.phone_number == '' || newDoctor.password == '' || newDoctor.work_experience == '' || newDoctor.address == '' || newDoctor.gender == '' || newDoctor.profile_picture == '' || newDoctor.is_active == '') {
    res.status(400).send({ error: true, message: 'required' });
  } 
  else {
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
