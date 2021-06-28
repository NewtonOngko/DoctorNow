
//initalize value
var location = [5,1,3,2,4];
var rating = [1,2,3,4,5];
var weight = [0.200, 0.057, 0.086, 0.071, 0.100];

for (i = 0; i < location.length; i++) {
 getLocation = location[i];
 console.log(getLocation);
}

for (i = 0; i < rating.length; i++) {
 getRating = rating[i];
 console.log(getRating);
}

for (i = 0; i < weight.length; i++) {
 getWeight = weight[i];
 console.log(getWeight);
}

//set index
locationSum = location[0];
ratingSum = rating[0];

//average solution calculation
var getAverageSolution = (locationSum + ratingSum) / location.length;
console.log('average Solution: ', getAverageSolution);

//positive distance average calculation
var getPositiveDistanceAverage = Math.max(0, ((locationSum - getAverageSolution) / getAverageSolution));
console.log('positve distance average: ', getPositiveDistanceAverage);

//negative distance average calculation
var getNegativeDistanceAverage = Math.max(0, ((getAverageSolution - locationSum) / getAverageSolution));
console.log('negative distance average: ',getNegativeDistanceAverage);

//jumlah terbobot pda calculation
var getJumlahTerbobotPDA = weight[0] * getPositiveDistanceAverage;
console.log('Jumlah Terbobot PDA : ', getJumlahTerbobotPDA);

//jumlah terbobot nda calculation
var getJumlahTerbobotNDA = weight[0] * getNegativeDistanceAverage;
console.log('Jumlah Terbobot NDA : ',getJumlahTerbobotNDA);

//normalisasi SP calculation
var getNSP = getJumlahTerbobotPDA / Math.max(locationSum);
console.log('NSP : ',getNSP);

//normalisasi SN calculation
var getNSN =  1 - (getJumlahTerbobotNDA / Math.max(locationSum));
console.log('NSN : ',getNSN);

//nilai skor penilaian (apraisal score) calculation
var getApraisalScore =  0.5 * (getNSP + getNSN);
console.log('Jumlah apraisal score : ',getApraisalScore);

module.exports = {getLocation, getRating, getWeight, getAverageSolution, getPositiveDistanceAverage, getNegativeDistanceAverage, getJumlahTerbobotPDA, getJumlahTerbobotNDA, getNSP, getNSN, getApraisalScore};