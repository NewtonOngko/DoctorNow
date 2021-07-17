const TopUp = require('../model/top_up_model.js')
const snap = require('../config/payment.js')
const moment = require('moment')

exports.findAll = function getTopUp(req, res) {
  TopUp.findAll((err, topUp) => {
    console.log('get all topUp')
    if (err) res.send(err)
    console.log('res', topUp)
    res.send(topUp)
  })
}

exports.create = function addTopUp(req, res) {
  const newTopUp = new TopUp(req.body)
  console.log('data', newTopUp)
  let parameter = {
    transaction_details: {
      order_id: 'topup -' + Date.now() + '-user-' + newTopUp.user_id,
      gross_amount: newTopUp.gross_amount,
    },
    newTopUp,
  
  }

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      let transactionToken = transaction.token
      let transactionRedirectUrl = transaction.redirect_url

      TopUp.create(newTopUp, (err, topUp) => {
        if (err) res.send(err)
        res.json({
          error: false,
          message: 'Top Up added',
          data: { topUp, transactionToken, transactionRedirectUrl },
        })
      })
    })
    .catch((e) => {
      console.log('Error occured:', e.message)
    })
}

exports.findById = function getTopupById(req, res) {
  newTopUp.findById(req.params.id, (err, topUp) => {
    if (err) res.send(err)
    res.json(topUp)
  })
}

exports.update = function updateTopUp(req, res) {
  if (newTopUp.amount == null || newTopUp.status == null) {
    res.status(400).send({ error: true, message: 'required' })
  } else {
    TopUp.update(req.params.id, new TopUp(req.body), (err) => {
      if (err) res.send(err)
      res.json({ error: false, message: 'Top Up updated' })
    })
  }
}

exports.delete = function deleteTopUp(req, res) {
  TopUp.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Top Up deleted' })
  })
}
