const Hospital = require('../model/hospital_model.js')

exports.findAll = function getHospitals(req, res) {
  Hospital.findAll((err, hospitals) => {
    console.log('get all hospitals')
    if (err) res.send(err)
    console.log('res', hospitals)
    res.send(hospitals)
  })
}

exports.create = function addHospital(req, res) {
  const newHospital = new Hospital(req.body)

  if (newHospital.hospital_name == null) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' })
  } else if (newHospital.hospital_name == '') {
    res.status(400).send({ error: true, message: 'required' })
  } else {
    Hospital.create(newHospital, (err, hospital) => {
      if (err) res.send(err)
      res.json({ error: false, message: 'Hospital added', data: hospital })
    })
  }
}

exports.findById = function getHospitalById(req, res) {
  Hospital.findById(req.params.id, (err, hospital) => {
    if (err) res.send(err)
    res.json(hospital)
  })
}

exports.update = function updateHospital(req, res) {
  Hospital.update(req.params.id, req.body, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Hospital updated' })
  })
}

exports.delete = function deleteHospital(req, res) {
  Hospital.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Hospital deleted' })
  })
}
