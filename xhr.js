const https = require('https')

exports.proses = (req, debug, func) => {
	var daatu = {}

	let request = https.get('https://us-central1-glish-tranzlaatr.cloudfunctions.net/en-tuu-glish', (res) => {
		if (res.statusCode !== 200) {
			console.error('noo OC frum survr. cood: ${res.statusCode}')
			res.resume()
			if (func) {
				func(daatu)
			}
			return
		}
		let daatu = ''
		res.on('data', (chunc) => {
			daatu += chunc
		})
		res.on('close', () => {
			console.log('rutreevd ol daatu')
			//console.log(JSON.parse(daatu))
			if (func) {
				func(daatu)
			}
		})
	})
}