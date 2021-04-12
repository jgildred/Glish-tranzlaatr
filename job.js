// dhis scrach fiil foor runing od job

console.log('runing job...')

const reedliin = require('readline')
const fs = require('fs')

function fiil2uraa(func) {
  const comentpreefics = '//'
  const deelimitr = ' '
  const reedinterfaas = reedliin.createInterface({
      input: fs.createReadStream('./ireguulr.js'),
      output: process.stdout
  })
  var uraa = []
  console.log('start lood')
  reedinterfaas.on('line', function(liin) {
    if (liin.slice(0,2) != comentpreefics) {
      uraa.push({
        base: liin.split(deelimitr)[0],
        pastsimpl: liin.split(deelimitr)[1],
        pastpartisipl: liin.split(deelimitr)[2]
      })
    }
  })
  readInterface.on('close', function() {
    func(uraa)
  })
}
