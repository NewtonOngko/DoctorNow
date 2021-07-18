/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js')

// top up object create
const TopUp = function topUpData(topUp) {
  this.order_id = topUp.order_id
  this.user_id = topUp.user_id
  this.gross_amount = topUp.gross_amount
  this.status = topUp.status

  this.created_at = new Date()
  this.updated_at = new Date()
}

TopUp.create = function createTopUp(newTopUp, result) {
  dbConn.query('INSERT INTO top_up set ? ', newTopUp, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      console.log(res.insertId)
      result(null, res.insertId)
    }
  })
}

TopUp.findById = function getTopUp(id, result) {
  dbConn.query('Select * from top_up where top_up_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

TopUp.findAll = function getAllTopUp(result) {
  dbConn.query(`SELECT * from top_up`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      console.log('top up list : ', res)
      result(null, res)
    }
  })
}

TopUp.update = function updateTopUp(id, topUp, result) {
  const arrTopUp = []
  const arrTopUp1 = Object.keys(topUp)
  var query = 'UPDATE top_up SET '

  for (var i = 0; i < arrTopUp1.length; i++) {
    query += arrTopUp1[i] + '= ?'

    if (i < arrTopUp1.length - 1) {
      query += ','
    }
    arrTopUp.push(topUp[arrTopUp1[i]])
  }
  query += 'WHERE top_up_id=?'
  arrTopUp.push(id)
  dbConn.query(query, arrTopUp, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

TopUp.delete = function deleteTopUp(id, result) {
  dbConn.query('DELETE FROM top_up WHERE top_up_id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

TopUp.get = function getAllTopUp(result) {
  dbConn.query(`SELECT * from top_up_view`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      console.log('top up list : ', res)
      result(null, res)
    }
  })
}

module.exports = TopUp
