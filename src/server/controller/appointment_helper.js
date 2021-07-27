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
  Appointment.create(newAppointment, (err, appointment) => {
    if (err) res.send(err)
    res.json({
      error: false,
      message: 'Appointment added',
      data: appointment,
    })
  })
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
