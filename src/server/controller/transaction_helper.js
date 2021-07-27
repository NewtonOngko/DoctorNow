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
  Transaction.create(newTransaction, (err, transaction) => {
    if (err) res.send(err)
    res.json({
      error: false,
      message: 'Transaction added',
      data: { transaction },
    })
  })
}

exports.findById = function getTransactionById(req, res) {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) res.send(err)
    res.json(transaction)
  })
}

exports.update = function updateTransaction(req, res) {
  Transaction.update(req.params.id, new Transaction(req.body), (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Transaction updated' })
  })
}

exports.delete = function deleteTransaction(req, res) {
  Transaction.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Transaction deleted' })
  })
}
