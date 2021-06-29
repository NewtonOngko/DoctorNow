const Appointment = require('../model/appointment_model.js')

exports.findAll = function getAppointment(req, res) {
  Appointment.findAll((err, appointment) => {
    console.log('get all Appointment')
    if (err) res.send(err)
    console.log('res', appointment)
    res.send(appointment)
  })
}

exports.create = function addAppointment(req, res) {
  const newAppointment = new Appointment(req.body)

  if (
    newAppointment.user_id == null ||
    newAppointment.doctor_id == null ||
    newAppointment.hospital_id == null ||
    newAppointment.time == null ||
    newAppointment.price ||
    null
  ) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' })
  } else if (
    newAppointment.user_id == '' ||
    newAppointment.doctor_id == '' ||
    newAppointment.hospital_id == '' ||
    newAppointment.time == '' ||
    newAppointment.price ||
    ''
  ) {
    res.status(400).send({ error: true, message: 'required' })
  } else {
    Appointment.create(newAppointment, (err, appointment) => {
      if (err) res.send(err)
      res.json({
        error: false,
        message: 'Appointment added',
        data: appointment,
      })
    })
  }
}

exports.findById = function getAppointmentById(req, res) {
  Appointment.findById(req.params.id, (err, appointment) => {
    if (err) res.send(err)
    res.json(appointment)
  })
}

exports.update = function updateAppointment(req, res) {
  Appointment.update(req.params.id, req.body, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Appointment updated' })
  })
}

exports.delete = function deleteAppointment(req, res) {
  Appointment.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Appointment deleted' })
  })
}
