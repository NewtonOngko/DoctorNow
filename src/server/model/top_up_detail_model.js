/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js')

// top up object create
const TopUpDetail = function topUpDetailData(topUpDetail) {
  this.transaction_time = topUpDetail.transaction_time
  this.transaction_status = topUpDetail.transaction_status
  this.transaction_id = topUpDetail.transaction_id
  this.signature_key = topUpDetail.signature_key
  this.payment_type = topUpDetail.payment_type
  this.order_id = topUpDetail.order_id
  this.gross_amount = topUpDetail.gross_amount
  this.fraud_status = topUpDetail.fraud_status

  this.created_at = new Date()
  this.updated_at = new Date()
}

TopUpDetail.create = function createTopUp(newTopUpDetail, result) {
  dbConn.query(
    'INSERT INTO top_up_detail set ? ',
    newTopUpDetail,
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

TopUpDetail.findById = function getTopUp(id, result) {
  dbConn.query('Select * from top_up_detail where top_up_detail_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

TopUpDetail.findAll = function getAllTopUpDetail(result) {
  dbConn.query(`SELECT * from top_up_detail`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      console.log('top up list : ', res)
      result(null, res)
    }
  })
}

TopUpDetail.update = function updateTopUpDetail(id, topUpDetail, result) {
  const arrTopUpDetail = []
  const arrTopUpDetail1 = Object.keys(topUpDetail)
  var query = 'UPDATE top_up SET '

  for (var i = 0; i < arrTopUpDetail1.length; i++) {
    query += arrTopUpDetail1[i] + '= ?'

    if (i < arrTopUpDetail1.length - 1) {
      query += ','
    }
    arrTopUpDetail.push(topUpDetail[arrTopUpDetail1[i]])
  }
  query += 'WHERE top_up_detail_id=?'
  arrTopUpDetail.push(id)
  dbConn.query(query, arrTopUpDetail, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

TopUpDetail.delete = function deleteTopUpDetail(id, result) {
  dbConn.query('DELETE FROM top_up_detail WHERE top_up_detail_id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
}

module.exports = TopUpDetail
