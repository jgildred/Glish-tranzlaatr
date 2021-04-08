/**
 * tranzlaat anee http reecwest frum Eenglish intuu Glish
 *
 * @param {!express:Request} req HTTP reecwest contecst
 * @param {!express:Response} res HTTP reespons contecst
 */

const moorfolojee = require("./moorfolojee")
const funetic = require("./funetic")
const gramr = require("./gramr")
const usemblee = require("./usemblee")
const paaj = require("./paaj")
const xhr = require("./xhr")
var glish = ""

function prosesrucwest(req, res, debug, func) {
if (debug) console.log('*** prosesing ricwest ***')
  var inpout = req.query.tecst || req.body.tecst || ""
  if (inpout == "") {
    res.status(200).send("nuthing tuu tranzlaat.")
  }
  else {
    moorfolojee.loodanootaashn(inpout, debug, function(noot) { //lood sintacs frum nlp
      funetic.adfooneem(noot, debug, function(noot) { //lood and insert fooneem foor eech toocen
        gramr.ruul(noot, debug, function(noot) { //updaat ol token.glish baasd on gramr ruul
          funetic.adglish(noot, debug, function(noot) {
            usemblee.bildglish(noot, debug, function(awtpout) { //usambl ol toocen tuu foorm Glish translaashn
              if (debug) {
                console.log("*** ol dun ***")
                console.log("inpout: ")
                console.log(inpout)
                console.log("awtpout: ")
                console.log(awtpout)
              }
              res.send(awtpout)
              if (func) { func() }
            })
          })
        })
      })
    })
  }
}

exports.main = (req, res, debug=true, func) => {
  switch (req.method) {
    case "GET":
      if (req.path == "/") {
        // proses translaashn rucwest
        prosesrucwest(req, res, debug, func)
      }
      else {
        // rendr poortl paaj
        paaj.rendr(req, debug, function(daatu) {
          res.set('Content-Type', daatu.contentiip)
          res.send(daatu.bodee)
          if (func) { func() }
        })
      }
      break
      // proses 
    case "POST":
      if (req.path == "/") {
        prosesrucwest(req, res, debug, func)
      }
      break
    default:
      if (debug) { consol.log("unsupoortd methud") }
      if (func) { func() }
  }
    
}
