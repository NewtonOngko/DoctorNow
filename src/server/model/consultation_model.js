/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js')

// doctor object create
const Consultation = function consultationData(consultation) {
  this.user_id = consultation.user_id
  this.doctor_id = consultation.doctor_id
  this.time = consultation.time
  this.price = consultation.price

  this.created_at = new Date()
  this.updated_at = new Date()
}

Consultation.create = function createConsultation(newConsultation, result) {
  dbConn.query(
    'INSERT INTO consultations set ? ',
    newConsultation,
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
      } else {
        console.log(res.insertId)
        result(null, res.insertId)
      }
    },
  )
}

Consultation.findById = function getConsultationById(id, result) {
  dbConn.query(
    `SELECT consultations.consultation_id ,users.full_name as user ,doctors.full_name as doctor , consultations.time ,consultations.price ,consultations.created_at ,consultations.updated_at 
  FROM consultations 
  JOIN users
  ON consultations.user_id =users.user_id 
  JOIN doctors
  on consultations .doctor_id =doctors .doctor_id where consultations.consultation_id = ?`,
    id,
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
      } else {
        result(null, res)
      }
    },
  )
}

Consultation.findAll = function getAllConsultation(result) {
  dbConn.query(
    `SELECT consultations.consultation_id ,users.full_name as user ,doctors.full_name as doctor , consultations.time ,consultations.price ,consultations.created_at ,consultations.updated_at 
  FROM consultations 
  JOIN users
  ON consultations.user_id =users.user_id 
  JOIN doctors
  on consultations .doctor_id =doctors .doctor_id`,
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        console.log('doctors : ', res)
        result(null, res)
      }
    },
  )
}

Consultation.update = function updateConsultation(id, consultation, result) {
  const arrConsultation = []
  const arrConsultation1 = Object.keys(consultation)
  var query = 'UPDATE consultations SET '

  for (var i = 0; i < arrConsultation1.length; i++) {
    query += arrConsultation1[i] + '= ?'

    if (i < arrConsultation1.length - 1) {
      query += ','
    }
    arrConsultation.push(consultation[arrConsultation1[i]])
  }
  query += 'WHERE consultation_id=?'
  arrConsultation.push(id)
  dbConn.query(query, arrConsultation, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

Consultation.delete = function deleteConsultation(id, result) {
  dbConn.query('DELETE FROM consultations WHERE consultation_id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

module.exports = Consultation
