/* eslint-disable no-restricted-globals */

/* eslint-disable no-restricted-globals */
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const dbConn = require('../config/config.js')
const { generateHash, checkPassword } = require('../config/encrypt_password.js')
const { json } = require('body-parser')
const { useScrollTrigger } = require('@material-ui/core')

// get config vars
dotenv.config()

// doctor object create
const Doctor = function doctorData(doctor) {
  this.full_name = doctor.full_name
  this.str_no = doctor.str_no
  this.email = doctor.email
  this.phone_number = doctor.phone_number
  this.password = doctor.password
  this.work_experience = doctor.work_experience
  this.address = doctor.address
  this.gender = doctor.gender
  this.profile_picture = doctor.profile_picture
  this.is_active = doctor.is_active

  this.created_at = new Date()
  this.updated_at = new Date()
}

Doctor.create = function createDoctor(newDoctor, result) {
  newDoctor.password = generateHash(newDoctor.password)
  dbConn.query('INSERT INTO doctors set ? ', newDoctor, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      console.log(res.insertId)
      result(null, res.insertId)
    }
  })
}

Doctor.findById = function getDoctorById(id, result) {
  dbConn.query('Select * from doctors where doctor_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

Doctor.findAll = function getAllDoctor(result) {
  dbConn.query('Select * from doctors', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      console.log('doctors : ', res)
      result(null, res)
    }
  })
}

Doctor.update = function updateDoctor(id, doctor, result) {
  const arrDoctor = []
  const arrDoctor1 = Object.keys(doctor)
  var query = 'UPDATE doctors SET '

  for (var i = 0; i < arrDoctor1.length; i++) {
    query += arrDoctor1[i] + '= ?'

    if (i < arrDoctor1.length - 1) {
      query += ','
    }
<<<<<<< HEAD
    arrDoctor.push(doctor[arrDoctor1[i]]);
=======
    arrDoctor.push(doctor[arrDoctor1[i]])
>>>>>>> main
  }
  query += 'WHERE doctor_id=?'
  arrDoctor.push(id)
  dbConn.query(query, arrDoctor, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

Doctor.delete = function deleteDoctor(id, result) {
  dbConn.query('DELETE FROM doctors WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}
<<<<<<< HEAD
=======

Doctor.login = function loginDoctor(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const email = req.body.email
    const password = req.body.password

    dbConn.query(
      'SELECT password,email,full_name,doctor_id FROM doctors WHERE email = ? ',
      [email],
      (err, result) => {
        console.log('amazing', result)
        if (result == '') {
          return res
            .status(404)
            .send({ message: 'User Not found.', status: '404' })
        } else if (result) {
          var passwordIsValid = checkPassword(password, result[0].password)
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: 'Invalid Password!',
              status: '401',
            })
          }
          var token = jwt.sign(
            { email: result[0].email, doctorId: result[0].id },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: 86400, // 24 hours
            },
          )
          res.status(200).send({
            id: result[0].doctor_id,
            email: result[0].email,
            name: result[0].full_name,
            accessToken: token,
            message: 'success',
            status: '200',
          })
        }
      },
    )
  }
}
>>>>>>> main

module.exports = Doctor
