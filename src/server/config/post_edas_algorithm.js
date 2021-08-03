const Recommendation = require("../model/EDAS_algorithm.js");

Recommendation.getMatriksKeputusan().then(async (res) => {
  let matriksKeputusanData = res;
  // matriksKeputusanData.length = 5;
  console.log('matriks keputusan',res)
  //hitung solusi rata - rata
  const N = matriksKeputusanData.length;
  let AV = new Array(2).fill(0);
  console.log('hitung rata-rata',res)
  matriksKeputusanData.forEach((el) => {
    el.value.forEach((c, i) => {
      AV[i] += c;
    });
  });

  AV.forEach((el, i) => {
    AV[i] = el / N;
  });

  // Menghitung Jarak Positif/Negatif dari Rata-rata (PDA/NDA)
  let PDA = [];
  const attributeData = await Recommendation.getCriteria();
  matriksKeputusanData.forEach((el) => {
    let temp = [];

    el.value.forEach((c, i) => {
      const val = attributeData[i].attribute === "cost" ? AV[i] - c : c - AV[i];
      const res = Math.max(0, val / AV[i]);
      temp.push(res);
    });
    PDA.push(temp);
  });

  let NDA = [];
  matriksKeputusanData.forEach((el) => {
    let temp = [];
    el.value.forEach((c, i) => {
      const val = attributeData[i].attribute === "cost" ? c - AV[i] : AV[i] - c;
      const res = Math.max(0, val / AV[i]);
      temp.push(res);
    });
    NDA.push(temp);
  });

  // Menghitung Jumlah Terbobot PDA/NDA (SP / SN)
  const W = await Recommendation.getCriteria();
  let getWeight = W.map((item) => {
    return item.weight;
  });

  let SP = [];
  PDA.forEach((el, i) => {
    let sum = 0;
    el.forEach((u) => {
      sum += u;
    });
    SP.push(getWeight[0] * sum);
  });

  let SN = [];
  NDA.forEach((el) => {
    let sum = 0;
    el.forEach((u) => {
      sum += u;
    });
    SN.push(getWeight[1] * sum);
  });

  //Menghitung Nilai Normalisasi SP/SN
  let NSP = [];
  let NSN = [];

  let maxSP = -1;
  SP.forEach((el) => {
    maxSP = Math.max(el, maxSP);
  });
  SP.forEach((el) => {
    const val = el / maxSP;
    NSP.push(val);
  });

  //NSN
  let maxSN = -1;
  SN.forEach((el) => {
    maxSN = Math.max(el, maxSN);
  });
  SN.forEach((el) => {
    const val = el / maxSN;
    NSN.push(1 - val);
  });

  //apraisal score
  const AS = [];
  const alternativeData = await Recommendation.getAlternative();

  let filteredAlternativeData = alternativeData.map(
    ({ doctor_id, hospital_id }) => ({
      doctor_id,
      hospital_id,
    })
  );

  const mappedScore = new Map();

  matriksKeputusanData.forEach(({ doctor_id }, i) => {
    const res = (NSP[i] + NSN[i]) / 2;
    mappedScore.set(doctor_id, res);
  });

  filteredAlternativeData.forEach((el, i) => {
    AS.push({
      info: el,
      score: mappedScore.get(i + 1) || 0,
    });
  });

  AS.sort((a, b) => b.score - a.score);

  const arrAS = AS.map(({ info, score }) => {
    let temp = [];
    temp.push(info.doctor_id);
    temp.push(score);
    return temp;
  });
  console.log(arrAS);

  Recommendation.postEDASAlgorithm(arrAS).then((res) => console.log(res));
});
