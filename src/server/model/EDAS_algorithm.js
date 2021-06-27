const dbConn = require('../config/config.js')

let edaAlternativesQuery = 'SELECT * FROM eda_alternatives'
let edaCriteriasQuery = 'SELECT * FROM eda_criterias'
let matriksKeputusanQuery = 'SELECT * from eda_evaluations'
var alternativeData = []
var weightData = []
var attributeData = []
var criteriaData = []
let matriksKeputusanData = []

dbConn.query(edaAlternativesQuery, (error, results, fields) => {
  //get eda_alternative data
  if (error) {
    return console.error(error.message)
  }
  alternativeData.push(results.map((e) => e.name))

  //get eda_criterias data
  dbConn.query(edaCriteriasQuery, (error, results, fields) => {
    if (error) {
      return console.error(error.message)
    }
    weightData.push(results.map((e) => e.weight))
    attributeData.push(results.map((e) => e.attribute))

    //create matriksKeputusan
    dbConn.query(matriksKeputusanQuery, (error, results, fields) => {
      if (error) {
        return console.error(error.message)
      }

      for (var i = 0; i < results.length; i++) {
        var arr = []
        arr.push(results[i].id_alternative)
        arr.push(results[i].id_criteria)
        matriksKeputusanData.push(arr)
      }
      // console.log('matriksKeputusan', matriksKeputusanData)

      //hitung solusi rata - rata
      var AV = []
      var i = 0
      for (i in matriksKeputusanData) {
        var j = 0
        for (j in matriksKeputusanData[i]) {
          matriksKeputusanDataJIndex = matriksKeputusanData[i][j]
          // console.log(',', matriksKeputusanDataJIndex)
          if (AV[j] == null) {
            AV[j] = 0
          }
          var alternativeLength = results.length
          AV[j] = matriksKeputusanDataJIndex / alternativeLength
        }
        AV.push(AV[j])
      }

      // Menghitung Jarak Positif/Negatif dari Rata-rata (PDA/NDA)
      var PDA = []
      var NDA = []
      var i = 0
      for (i in matriksKeputusanData) {
        PDA[i] = []
        NDA[i] = []
        for (j in matriksKeputusanData[i]) {
          arr = []
          arr1 = []

          if (attributeData[0][j] == 'benefit') {
            arr.push(
              (PDA[i][j] = Math.max(
                0,
                (matriksKeputusanData[i][j] - AV[j]) / AV[j],
              )),
            )
            arr1.push(
              (NDA[i][j] = Math.max(
                0,
                (AV[j] - matriksKeputusanData[i][j]) / AV[j],
              )),
            )
          } else {
            arr.push(
              (PDA[i][j] = Math.max(
                0,
                (AV[j] - matriksKeputusanData[i][j]) / AV[j],
              )),
            )
            arr1.push(
              (NDA[i][j] = Math.max(
                0,
                (matriksKeputusanData[i][j] - AV[j]) / AV[j],
              )),
            )
          }

          PDA.push(...arr)
          NDA.push(...arr1)
        }
      }
      // console.log('PDA : ', PDA[0])
      // console.log('NDA : ', NDA[0])

      //-- inisialisasi array SP/SN
      var SP = []
      var SN = []
      for (i in matriksKeputusanData) {
        SP[i] = 0
        SN[i] = 0
        for (j in matriksKeputusanData[i]) {
          var arr = []
          var arr1 = []
          var xij = matriksKeputusanData[i][j]
          var weightValue = weightData.map((e) => e[0])

          // console.log(weightValue);
          // console.log(weightValue);
          arr.push((SP[j] = weightValue * PDA[i][j]))
          arr1.push((SN[j] = weightValue * NDA[i][j]))
          SP.push(...arr)
          SN.push(...arr1)
        }
        
      }

      
      //normalisasi SP / SN
      var NSP = []
      var NSN = []
      var getSP = SP[j];
      var getSN = SN[j];
      for (i in alternativeData) {
        var maxSP = SP.reduce(function (a, b) {
          return Math.max(a, b)
        })
        var maxSN = SN.reduce(function (a, b) {
          return Math.max(a, b)
        })

        NSP.push((NSP[i] = getSP / maxSP))
        NSN.push((NSN[i] = 1 - getSN / maxSN))
      }

      // apraisal score
      var AS = []
      var getNSP = NSP[j]
      var getNSN = NSN[j]
      for (i in alternativeData) {
        AS[i] = (getNSP + getNSN) / 2
        console.log(`${alternativeData[i]}`, AS[i]);
      }
    })
  })
})
