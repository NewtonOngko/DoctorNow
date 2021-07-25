/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// doctor object create
const Transaction = function transactionData(transaction) {
  this.user_id = transaction.user_id;
  this.doctor_id = transaction.doctor_id;
  this.transaction_no = transaction.transaction_no;
  this.transaction_date = transaction.transaction_date;
  this.amount = transaction.amount;
  this.transaction_type = transaction.transaction_type;
  this.transaction_status = transaction.transaction_status;

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
  dbConn.query(`SELECT transactions.transaction_id ,users.full_name as user ,doctors.full_name as doctor , transactions.transaction_no, transactions.transaction_date, transactions.amount , transactions.transaction_type, transactions.transaction_status 
  FROM transactions
  JOIN users
  ON transactions.user_id =users.user_id 
  JOIN doctors
  on transactions .doctor_id =doctors .doctor_id`, (err, res) => {
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
  const arrTransaction = []
  const arrTransaction1 = Object.keys(transaction)
  var query = 'UPDATE transactions SET '

  for (var i = 0; i < arrTransaction1.length; i++) {
    query += arrTransaction1[i] + '= ?'

    if (i < arrTransaction1.length - 1) {
      query += ','
    }
    arrTransaction.push(transaction[arrTransaction1[i]])
  }
  query += 'WHERE transaction_id=?'
  arrTransaction.push(id)
  dbConn.query(query, arrTransaction, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
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
