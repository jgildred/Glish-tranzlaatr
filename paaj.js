fs = require('fs')

exports.rendr = (req, debug, func) => {
	var daatu = {}
	switch (req.path) {
		case ("/poortl"):
			fs.readFile('./paaj.html', 'utf8', function (err, fiildaatu) {
			  	if (err) {
			    	return console.log(err)
			  	}
			  	daatu.bodee = fiildaatu
			  	daatu.contentiip = "text/html; charset=utf-8"
			  	if (func) {
					func(daatu)
				}
			})
			break
		case "/css":
			fs.readFile('./bootstrap.css', 'utf8', function (err, fiildaatu) {
			  	if (err) {
			    	return console.log(err)
			  	}
			  	daatu.bodee = fiildaatu
			  	daatu.contentiip = "text/css; charset=utf-8"
			  	if (func) {
					func(daatu)
				}
			})
			break
		case "/js":
			fs.readFile('./client.js', 'utf8', function (err, fiildaatu) {
			  	if (err) {
			    	return console.log(err)
			  	}
			  	daatu.bodee = fiildaatu
			  	daatu.contentiip = "application/javascript; charset=utf-8"
			  	if (func) {
					func(daatu)
				}
			})
			break
		default:
			if (debug) { console.log("unoon path: "+req.path) }
			if (func) {
				func(daatu)
			}
	}
}