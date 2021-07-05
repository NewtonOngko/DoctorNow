const { Assessment } = require('@material-ui/icons')
const dbConn = require('../config/config.js')

const Recommendation = {
  getRecomendation(result) {
    const query = 'SELECT * FROM recommendations'
    dbConn.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('users : ', res);
        result(null, res);
      }
    });
  },
  getAlternative() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM doctors'
      dbConn.query(query, (err, res) => {
        if (err) reject(err)
        resolve(Object.values(JSON.parse(JSON.stringify(res))))
      })
    })
  },
  getCriteria() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM eda_criterias'
      dbConn.query(query, (err, res) => {
        if (err) reject(err)
        resolve(Object.values(JSON.parse(JSON.stringify(res))))
      })
    })
  },
  getMatriksKeputusan() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * from eda_evaluations'
      dbConn.query(query, (err, res) => {
        if (err) reject(err)
        resolve(Object.values(JSON.parse(JSON.stringify(res))))
      })
    })
  },
  postEDASAlgorithm(AS) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO recommendations (doctor_id, hospital_id, score) VALUES ?'
      dbConn.query(query, [AS], (err, res) => {
        if (err) reject(err)
        resolve('sucess')
      })
    })
  },
}

module.exports = Recommendation
