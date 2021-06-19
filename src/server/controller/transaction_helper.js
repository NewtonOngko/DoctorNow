const Transaction = require('../model/transaction_model.js');

exports.findAll = function getTransaction(req, res) {
  Transaction.findAll((err, transaction) => {
    console.log('get all transaction');
    if (err) res.send(err);
    console.log('res', transaction);
    res.send(transaction);
  });
};

exports.create = function addTransaction(req, res) {
  const newTransaction = new Transaction(req.body);

  if (newTransaction.user_id == null || newTransaction.purchase_type == null || newTransaction.payment_type == null || newTransaction.price == null || newTransaction.is_paid == null) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else if (newTransaction.user_id == null || newTransaction.purchase_type == null || newTransaction.payment_type == null || newTransaction.price == null || newTransaction.is_paid == null){ 
    res.status(400).send({ error: true, message: 'required' });
  } else {
    Transaction.create(newTransaction, (err, transaction) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Transaction added', data: transaction });
    });
  }
};


exports.findById = function getTransactionById(req, res) {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) res.send(err);
    res.json(transaction);
  });
};


exports.update = function updateTransaction(req, res) {
  if (newTransaction.user_id == null || newTransaction.purchase_type == null || newTransaction.payment_type == null || newTransaction.price == null || newTransaction.is_paid == null) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else if (newTransaction.user_id == null || newTransaction.purchase_type == null || newTransaction.payment_type == null || newTransaction.price == null || newTransaction.is_paid == null){ 
    res.status(400).send({ error: true, message: 'required' });
  } else {
    Transaction.update(req.params.id, new Transaction(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Transaction updated' });
    });
  }
};


exports.delete = function deleteTransaction(req, res) {
  Transaction.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'Transaction deleted' });
  });
};
