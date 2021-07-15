/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// doctor object create
const Transaction = function transactionData(transaction) {
  this.user_id = transaction.user_id;
  this.purchase_type = transaction.purchase_type;
  this.payment_type = transaction.payment_type ? transaction.payment_type : 'TRANSFER';
  this.gross_amount = transaction.gross_amount;
  this.is_paid = transaction.is_paid ? transaction.is_paid : 1;

  this.created_at = new Date();
  this.updated_at = new Date();
  
};

Transaction.create = function createTransaction(newTransaction, result) {
  dbConn.query('INSERT INTO transactions set ? ', newTransaction, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Transaction.findById = function getTransactionById(id, result) {
  dbConn.query('Select * from transactions where transaction_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Transaction.findAll = function getAllTransaction(result) {
  dbConn.query(`SELECT transactions.transaction_id ,users.full_name as user ,doctors.full_name as doctor ,hospitals.hospital_name as hospital,transactions.gross_amount , transactions.payment_status ,transactions.created_at ,transactions.updated_at 
  FROM transactions
  JOIN users
  ON transactions.user_id =users.user_id 
  JOIN doctors
  on transactions .doctor_id =doctors .doctor_id 
  JOIN hospitals
  on transactions .hospital_id = hospitals .hospital_id`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('doctors : ', res);
      result(null, res);
    }
  });
};

Transaction.update = function updateTransaction(id, transaction, result) {
  dbConn.query('UPDATE transactions SET purchase_type=?, payment_type=?, price=?,is_paid=? WHERE id = ?', [
    transaction.purchase_type,
    transaction.payment_type,
    transaction.price,
    transaction.is_paid,
    id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Transaction.delete = function deleteTransaction(id, result) {
  dbConn.query('DELETE FROM transactions WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Transaction;
