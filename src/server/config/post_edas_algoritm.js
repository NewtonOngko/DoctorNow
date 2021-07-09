const Recommendation = require('../../server/model/EDAS_algorithm.js')


Recommendation.getMatriksKeputusan()
.then(async (res) => {
	let matriksKeputusanData = res
	
	//hitung solusi rata - rata
	const N = res.length
	let AV = new Array(2).fill(0)
	
	var i = 0
	matriksKeputusanData.forEach((el) => {
		el.value.forEach((c, i) => {
			AV[i] += c
		})
	})
	
	AV.forEach((el, i) => {
		AV[i] = el / N
	})

	console.log('AV', AV)
	
	// Menghitung Jarak Positif/Negatif dari Rata-rata (PDA/NDA)
	let PDA = []
	const attributeData = await Recommendation.getCriteria()
	matriksKeputusanData.forEach((el) => {
		let temp = []

		el.value.forEach((c, i) => {
			const val = attributeData[0][i] === 'benefit' ? AV[i] - c : c - AV[i]
			const res = Math.max(0, val / AV[i])
			temp.push(res)
		})
		PDA.push(temp)
	})
	
	let NDA = []
	matriksKeputusanData.forEach((el) => {
		let temp = []
		el.value.forEach((c, i) => {
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
	const AS = []
	const alternativeData = await Recommendation.getAlternative()
	
	filteredAlternativeData = alternativeData.map(({ doctor_id, hospital_id }) => ({
		doctor_id, hospital_id
	}))

	console.log('filteredAlternativeData', filteredAlternativeData)

	const mappedScore = new Map()

	matriksKeputusanData.forEach(({ doctor_id }, i) => {
		const res = (NSP[i] + NSN[i]) / 2
		mappedScore.set(doctor_id, res)
	})

	filteredAlternativeData.forEach((el, i) => {
		AS.push({ 
			info: el, 
			score: mappedScore.get(i + 1) || 0 
		})
	})

	AS.sort((a, b) => b.score - a.score)

	const arrAS = AS.map(({ info, score }) => {
		let temp = []
		Object.values(info).forEach(value => temp.push(value))
		temp.push(score)
		return temp
	})

	Recommendation.postEDASAlgorithm(arrAS)
})
