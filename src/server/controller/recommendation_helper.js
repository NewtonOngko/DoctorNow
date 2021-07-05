const Recommendation = require('../model/EDAS_algorithm');

exports.findAll = function getRecommendation(req, res) {
  Recommendation.getRecomendation((err, recommendation) => {
    console.log('get all recommendation');
    if (err) res.send(err);
    console.log('res', recommendation);
    res.send(recommendation);
  });
};