const TopUpDetail = require('../model/top_up_detail_model.js')
const snap = require('../config/payment.js')
const moment = require('moment')

exports.findAll = function getTopUpDetail(req, res) {
  TopUpDetail.findAll((err, topUp) => {
    console.log('get all topUp')
    if (err) res.send(err)
    console.log('res', topUp)
    res.send(topUp)
  })
}

exports.create = function addTopUpDetail(req, res) {
  const newTopUpDetail = new TopUpDetail(req.body)
  TopUpDetail.create(newTopUpDetail, (err, topUpDetail) => {
    if (err) res.send(err)
    res.json({
      error: false,
      message: 'Top Up added',
      data: { topUpDetail },
    })
  })
  // snap.transaction.notification(newTopUpDetail).then((statusResponse) => {
  //   let orderId = statusResponse.order_id
  //   let transactionStatus = statusResponse.transaction_status
  //   let fraudStatus = statusResponse.fraud_status

  //   console.log(
  //     `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`,
  //   )

  //   // Sample transactionStatus handling logic

  //   if (transactionStatus == 'capture') {
  //     if (fraudStatus == 'challenge') {
  //       return res.status(400).send({ error: true, message: 'challenge' })

  //       // TODO set transaction status on your database to 'challenge'
  //       // and response with 200 OK
  //     } else if (fraudStatus == 'accept') {
  //       TopUpDetail.create(newTopUp, (err, topUp) => {
  //         if (err) res.send(err)
  //         res.json({
  //           error: false,
  //           message: 'Top Up added',
  //           data: { topUp, transactionToken, transactionRedirectUrl },
  //         })
  //       })
  //       // TODO set transaction status on your database to 'success'
  //       // and response with 200 OK
  //     }
  //   } else if (transactionStatus == 'settlement') {
  //     TopUpDetail.create(newTopUp, (err, topUp) => {
  //       if (err) res.send(err)
  //       res.json({
  //         error: false,
  //         message: 'Top Up added',
  //         data: { topUp, transactionToken, transactionRedirectUrl },
  //       })
  //     })
  //     // TODO set transaction status on your database to 'success'
  //     // and response with 200 OK
  //   } else if (
  //     transactionStatus == 'cancel' ||
  //     transactionStatus == 'deny' ||
  //     transactionStatus == 'expire'
  //   ) {
  //     return res.status(400).send({ error: true, message: 'challenge' })

  //     // TODO set transaction status on your database to 'failure'
  //     // and response with 200 OK
  //   } else if (transactionStatus == 'pending') {
  //     TopUpDetail.create(newTopUp, (err, topUp) => {
  //       if (err) res.send(err)
  //       res.json({
  //         error: false,
  //         message: 'Top Up added',
  //         data: { topUp, transactionToken, transactionRedirectUrl },
  //       })
  //     })
  //     // TODO set transaction status on your database to 'pending' / waiting payment
  //     // and response with 200 OK
  //   }
  // })
}

exports.findById = function getTopUpDetailById(req, res) {
  TopUpDetail.findById(req.params.id, (err, topUp) => {
    if (err) res.send(err)
    res.json(topUp)
  })
}

exports.update = function updateTopUpDetail(req, res) {
  TopUpDetail.update(req.params.id, new TopUpDetail(req.body), (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Top Up updated' })
  })
}

exports.delete = function deleteTopUpDetail(req, res) {
  TopUpDetail.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Top Up deleted' })
  })
}
