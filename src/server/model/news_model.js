/* eslint-disable no-restricted-globals */

const dbConn = require('../config/config.js');

// news object create
const News = function newsData(news) {
  this.title = news.title;
  this.description = news.description;
  this.news_link = news.news_link;

  this.created_at = new Date();
  this.updated_at = new Date();
};

News.create = function createNews(newNews, result) {
  dbConn.query('INSERT INTO news set ? ', newNews, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


News.findById = function getNewsById(id, result) {
  dbConn.query('Select * from news where news_id = ? ', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

News.findAll = function getAllNews(result) {
  dbConn.query('Select * from news', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('users : ', res);
      result(null, res);
    }
  });
};

News.update = function updatNews(id, news, result) {
  dbConn.query('UPDATE users SET title=?,description=?,news_link=? WHERE id = ?', [
    news.title,
    news.description,
    news.news_link,
    id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

News.delete = function deleteNews(id, result) {
  dbConn.query('DELETE FROM news WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = News;
