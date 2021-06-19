const Consultation = require('../model/appoitment_model.js');

exports.findAll = function getConsultation(req, res) {
  Consultation.findAll((err, consultation) => {
    console.log('get all consultation');
    if (err) res.send(err);
    console.log('res', consultation);
    res.send(consultation);
  });
};

exports.create = function addConsultation(req, res) {
  const newConsultation = new Consultation(req.body);

  if (newConsultation.user_id == null || newConsultation.doctor_id == null || newConsultation.hospital_id == null || newConsultation.time == null || newConsultation.price || null) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else if (newConsultation.user_id == '' || newConsultation.doctor_id == '' || newConsultation.hospital_id == '' || newConsultation.time == '' || newConsultation.price || '') {
    res.status(400).send({ error: true, message: 'required' });
  } else {
    Consultation.create(newConsultation, (err, consultation) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Consultation added', data: consultation });
    });
  }
};


exports.findById = function getConsultationById(req, res) {
  Consultation.findById(req.params.id, (err, consultation) => {
    if (err) res.send(err);
    res.json(consultation);
  });
};


exports.update = function updateConsultation(req, res) {
  if (newConsultation.user_id == null || newConsultation.doctor_id == null || newConsultation.hospital_id == null || newConsultation.time == null || newConsultation.price || null) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else if (newConsultation.user_id == '' || newConsultation.doctor_id == '' || newConsultation.hospital_id == '' || newConsultation.time == '' || newConsultation.price || '') {
    res.status(400).send({ error: true, message: 'required' });
  } else {
    Consultation.update(req.params.id, new Consultation(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Consultation updated' });
    });
  }
};


exports.delete = function deleteConsultation(req, res) {
  Consultation.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'Consultation deleted' });
  });
};
