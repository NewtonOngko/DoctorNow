const Recommendation = require('../model/recommendation_model.js');

exports.findAll = function getRecommendation(req, res) {
  Recommendation.findAll((err, recommendation) => {
    console.log('get all recommendation');
    if (err) res.send(err);
    console.log('res', recommendation);
    res.send(recommendation);
  });
};

exports.create = function addRecommendation(req, res) {
  const newRecommendation = new Recommendation(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Recommendation.create(newRecommendation, (err, recommendation) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Recommendation added', data: recommendation });
    });
  }
};


exports.findById = function getRecommendationById(req, res) {
  Recommendation.findById(req.params.id, (err, recommendation) => {
    if (err) res.send(err);
    res.json(recommendation);
  });
};


exports.update = function updateRecommendation(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Recommendation.update(req.params.id, new Recommendation(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'Recommendation updated' });
    });
  }
};


exports.delete = function deleteRecommendation(req, res) {
  Recommendation.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'Recommendation deleted' });
  });
};
