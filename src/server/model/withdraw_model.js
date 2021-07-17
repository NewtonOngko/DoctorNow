/* eslint-disable no-restricted-globals */
const dotenv = require('dotenv')
const dbConn = require('../config/config.js')

// get config vars
dotenv.config()

// user object create
const Withdraw = function withdrawData(withdraw) {
  this.doctor_id = withdraw.doctor_id
  this.withdraw_status = withdraw.withdraw_status
  this.amount = withdraw.amount
  this.account_receiver = withdraw.account_receiver

  this.created_at = new Date()
  this.updated_at = new Date()
}

Withdraw.create = function createWithdraw(newWithdraw, result) {
  dbConn.query('INSERT INTO withdraw set ? ', newWithdraw, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      console.log(res.insertId)
      result(null, res.insertId)
    }
  })
}

Withdraw.findById = function getWithdrawById(id, result) {
  dbConn.query('Select * from withdraw where withdraw_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

Withdraw.findAll = function getAllWithdraw(result) {
  dbConn.query('Select * from withdraw', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      console.log('users : ', res)
      result(null, res)
    }
  })
}

Withdraw.update = function updateWithdraw(id, withdraw, result) {
  const arrWithdraw = []
  const arrWithdraw1 = Object.keys(withdraw)
  var query = 'UPDATE withdraw SET '

  for (var i = 0; i < arrWithdraw1.length; i++) {
    query += arrWithdraw1[i] + '= ?'

    if (i < arrWithdraw1.length - 1) {
      query += ','
    }
    arrWithdraw.push(withdraw[arrWithdraw1[i]])
  }
  query += 'WHERE withdraw_id=?'
  arrWithdraw.push(id)
  dbConn.query(query, arrWithdraw, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

Withdraw.delete = function deleteWithdraw(id, result) {
  dbConn.query('DELETE FROM withdraw WHERE withdraw_id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

module.exports = Withdraw
