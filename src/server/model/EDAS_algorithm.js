const dbConn = require('../config/config.js')

let edaAlternativesQuery = 'SELECT * FROM eda_alternatives'
let edaCriteriasQuery = 'SELECT * FROM eda_criterias'
let matriksKeputusanQuery = 'SELECT * from eda_evaluations'
var alternativeData = []
var weightData = []
var attributeData = []
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

      //hitung solusi rata - rata
      // var AV = []
      const N = results.length
      let AV = new Array(2).fill(0)

      var i = 0
      matriksKeputusanData.forEach((el) => {
        el.forEach((c, i) => {
          AV[i] += c
        })
      })

      AV.forEach((el, i) => {
        AV[i] = el / N
      })

      // Menghitung Jarak Positif/Negatif dari Rata-rata (PDA/NDA)

      let PDA = []
      matriksKeputusanData.forEach((el) => {
        let temp = []

        el.forEach((c, i) => {
          const val = attributeData[0][i] === 'benefit' ? AV[i] - c : c - AV[i]
          const res = Math.max(0, val / AV[i])

          temp.push(res)
        })
        PDA.push(temp)
      })

      let NDA = []

      matriksKeputusanData.forEach((el) => {
        let temp = []

        el.forEach((c, i) => {
          const val = attributeData[0][i] === 'benefit' ? c - AV[i] : AV[i] - c
          const res = Math.max(0, val / AV[i])

          temp.push(res)
        })

        NDA.push(temp)
      })

      //SP / SN
      const W = 0.614

      let SP = []

      PDA.forEach((el) => {
        let sum = 0

        el.forEach((u) => {
          sum += u
        })

        SP.push(W * sum)
      })

      let SN = []

      NDA.forEach((el) => {
        let sum = 0

        el.forEach((u) => {
          sum += u
        })

        SN.push(W * sum)
      })

      //NSP NSNS
      let NSP = []
      let NSN = []

      let maxSP = -1
      SP.forEach((el) => {
        maxSP = Math.max(el, maxSP)
      })
      SP.forEach((el) => {
        const val = el / maxSP

        NSP.push(val)
      })

      //NSN
      SN.forEach((el) => {
        maxSN = Math.max(el, maxSP)
      })
      SN.forEach((el) => {
        const val = el / maxSN
        NSN.push(1 - val)
      })

      //apraisal score
      let AS = []
      alternativeData[0].forEach((el, i) => {
        const res = (NSP[i] + NSN[i]) / 2
        AS.push({ name: el, score: res })
      })
      AS.sort((a, b) => b.score - a.score)
      console.log(AS);
    })
  })
})
