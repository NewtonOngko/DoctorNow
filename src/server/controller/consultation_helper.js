const Consultation = require('../model/appoitment_model.js');

exports.findAll = function getconsultation(req, res) {
  Consultation.findAll((err, consultation) => {
    console.log('get all consultation');
    if (err) res.send(err);
    console.log('res', consultation);
    res.send(consultation);
  });
};

exports.create = function addConsultation(req, res) {
  const newconsultation = new Consultation(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Consultation.create(newconsultation, (err, consultation) => {
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
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
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