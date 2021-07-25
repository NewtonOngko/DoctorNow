const Rating = require('../model/rating_model.js')

exports.findAll = function getRating(req, res) {
  Rating.findAll((err, rating) => {
    console.log('get all rating')
    if (err) res.send(err)
    console.log('res', rating)
    res.send(rating)
  })
}

exports.create = function addRating(req, res) {
  const newRating = new Rating(req.body)
  Rating.create(newRating, (err, rating) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Rating added', data: rating })
  })
}

exports.findById = function getRatingById(req, res) {
  Rating.findById(req.params.id, (err, rating) => {
    if (err) res.send(err)
    res.json(rating)
  })
}

exports.update = function updateRating(req, res) {
  Rating.update(req.params.id, new Rating(req.body), (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Rating updated' })
  })
}

exports.delete = function deleteRating(req, res) {
  Rating.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Rating deleted' })
  })
}
