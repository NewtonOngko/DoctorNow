const Transaction = require('../model/transaction_model.js')
const snap = require('../config/payment.js')

exports.findAll = function getTransaction(req, res) {
  Transaction.findAll((err, transaction) => {
    console.log('get all transaction')
    if (err) res.send(err)
    console.log('res', transaction)
    res.send(transaction)
  })
}

exports.create = function addTransaction(req, res) {
  const newTransaction = new Transaction(req.body)
  let parameter = {
    transaction_details: {
      order_id:
        'transaction' +
        Date.now() +
        newTransaction.user_id +
        '-' + 
        newTransaction.payment_type +
        '-' + 
        newTransaction.user_id,
      gross_amount: newTransaction.gross_amount,
    },
    newTransaction,
  }

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token
      console.log('transactionToken:', transactionToken)

      // transaction redirect url
      let transactionRedirectUrl = transaction.redirect_url
      console.log('transactionRedirectUrl:', transactionRedirectUrl)

      Transaction.create(newTransaction, (err, transaction) => {
        if (err) res.send(err)
        res.json({
          error: false,
          message: 'Transaction added',
          data: { transaction, transactionToken, transactionRedirectUrl },
        })
      })
    })
    .catch((e) => {
      console.log('Error occured:', e.message)
    })
}

exports.findById = function getTransactionById(req, res) {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) res.send(err)
    res.json(transaction)
  })
}

exports.update = function updateTransaction(req, res) {
  if (
    newTransaction.user_id == null ||
    newTransaction.purchase_type == null ||
    newTransaction.payment_type == null ||
    newTransaction.gross_amount == null ||
    newTransaction.is_paid == null
  ) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required field' })
  } else if (
    newTransaction.user_id == null ||
    newTransaction.purchase_type == null ||
    newTransaction.payment_type == null ||
    newTransaction.gross_amount == null ||
    newTransaction.is_paid == null
  ) {
    res.status(400).send({ error: true, message: 'required' })
  } else {
    Transaction.update(req.params.id, new Transaction(req.body), (err) => {
      if (err) res.send(err)
      res.json({ error: false, message: 'Transaction updated' })
    })
  }
}

exports.delete = function deleteTransaction(req, res) {
  Transaction.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Transaction deleted' })
  })
}
