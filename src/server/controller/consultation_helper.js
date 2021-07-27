const Consultation = require('../model/consultation_model.js')

exports.findAll = function getConsultation(req, res) {
  Consultation.findAll((err, consultation) => {
    console.log('get all consultation')
    if (err) res.send(err)
    console.log('res', consultation)
    res.send(consultation)
  })
}

exports.create = function addConsultation(req, res) {
  const newConsultation = new Consultation(req.body)
  Consultation.create(newConsultation, (err, consultation) => {
    if (err) res.send(err)
    res.json({
      error: false,
      message: 'Consultation added',
      data: consultation,
    })
  })
}

exports.findById = function getConsultationById(req, res) {
  Consultation.findById(req.params.id, (err, consultation) => {
    if (err) res.send(err)
    res.json(consultation)
  })
}

exports.update = function updateConsultation(req, res) {
  Consultation.update(req.params.id, req.body, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Consultation updated' })
  })
}

exports.delete = function deleteConsultation(req, res) {
  Consultation.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Consultation deleted' })
  })
}
