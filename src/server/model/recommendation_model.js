/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// news object create
const Recommendation = function newsData(recommendation) {
  this.doctor_id = recommendation.doctor_id;
  this.hospital_id = recommendation.hospital_id;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Recommendation.create = function createRating(newRecommendation, result) {
  dbConn.query('INSERT INTO recommendations set ? ', newRecommendation, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Recommendation.findById = function getRecommendationById(id, result) {
  dbConn.query('Select * from recommendations where recommendation_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Recommendation.findAll = function getAllRecommendation(result) {
  dbConn.query('Select * from recommendations', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('recommendations : ', res);
      result(null, res);
    }
  });
};

Recommendation.update = function updatRecommendation(id, recommendations, result) {
  dbConn.query('UPDATE recommendations SET doctor_id=?,hospital_id=? WHERE id = ?', [
    recommendations.doctor_id,
    recommendations.hospital_id,
    id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Recommendation.delete = function deleteRecommendation(id, result) {
  dbConn.query('DELETE FROM recommendations WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Recommendation;
