const News = require('../model/news_model.js');

exports.findAll = function getNews(req, res) {
  News.findAll((err, news) => {
    console.log('get all news');
    if (err) res.send(err);
    console.log('res', news);
    res.send(news);
  });
};


exports.create = function addNews(req, res) {
  const newNews = new News(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    News.create(newNews, (err, news) => {
      if (err) res.send(err);
      res.json({ error: false, message: ' News added', data: news });
    });
  }
};


exports.findById = function getNewsById(req, res) {
  News.findById(req.params.id, (err, news) => {
    if (err) res.send(err);
    res.json(news);
  });
};


exports.update = function updateNews(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    News.update(req.params.id, new News(req.body), (err) => {
      if (err) res.send(err);
      res.json({ error: false, message: 'News updated' });
    });
  }
};


exports.delete = function deleteNews(req, res) {
  News.delete(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'News deleted' });
  });
};
