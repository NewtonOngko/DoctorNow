/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// news object create
const Rating = function ratingData(news) {
  this.doctor_id = news.doctor_id;
  this.rating = news.rating;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Rating.create = function createRating(newRating, result) {
  dbConn.query('INSERT INTO ratings set ? ', newRating, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Rating.findById = function getRatingById(id, result) {
  dbConn.query('Select * from ratings where rating_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Rating.findAll = function getAllRating(result) {
  dbConn.query('Select * from ratings', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('ratings : ', res);
      result(null, res);
    }
  });
};

Rating.update = function updatRating(id, rating, result) {
  const arrRating = []
  const arrRating1 = Object.keys(rating)
  var query = 'UPDATE ratings SET '

  for (var i = 0; i < arrRating1.length; i++) {
    query += arrRating1[i] + '= ?'

    if (i < arrRating1.length - 1) {
      query += ','
    }
    arrRating.push(rating[arrRating1[i]])
  }
  query += 'WHERE rating_id=?'
  arrRating.push(id)
  dbConn.query(query, arrRating, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else {
      result(null, res)
    }
  })
};

Rating.delete = function deleteRating(id, result) {
  dbConn.query('DELETE FROM ratings WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Rating;
