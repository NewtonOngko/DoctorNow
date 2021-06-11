const Appoitment = require('../model/appoitment_model.js');

exports.findAll = function getAppoitment(req, res) {
  Appoitment.findAll((err, appoitment) => {
    console.log('get all appoitment');
    if (err) res.send(err);
    console.log('res', appoitment);
    res.send(appoitment);
  });
};

exports.create = function addAppoitment(req, res) {
  const newAppoitment = new Appoitment(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Appoitment.create(newAppoitment, (err, appoitment) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Appoitment added', data: appoitment });
    });
  }
};


exports.findById = function getAppoitmentById(req, res) {
  Appoitment.findById(req.params.id, (err, appoitment) => {
    if (err) res.send(err);
    res.json(appoitment);
  });
};


exports.update = function updateAppoitment(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Appoitment.update(req.params.id, new Appoitment(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Appoitment updated' });
    });
  }
};


exports.delete = function deleteAppoitment(req, res) {
  Appoitment.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'Appoitment deleted' });
  });
};