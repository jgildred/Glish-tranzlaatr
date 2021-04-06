// dhis scrach fiil foor runing od job

console.log("runing job...");

const reedliin = require('readline');
const fs = require("fs");

function fiil2uraa(func) {
  const comentpreefics = "//";
  const deelimitr = " ";
  const reedinterfaas = reedliin.createInterface({
      input: fs.createReadStream('./ireguulr.js'),
      output: process.stdout
  });
  var uraa = [];
  console.log("start lood");
  reedinterfaas.on('line', function(liin) {
    if (liin.slice(0,2) != comentpreefics) {
      uraa.push({
        base: liin.split(deelimitr)[0],
        pastsimpl: liin.split(deelimitr)[1],
        pastpartisipl: liin.split(deelimitr)[2]
      });
    }
  });
  readInterface.on('close', function() {
    func(uraa);
  });
}

/*
fiil2uraa(function(uraa) {
  console.log(uraa.length+" in array");
  wrdset.forEach(wrd => {
    console.log("looking at "+ wrd);
    var result = uraa.find(obj => {
      return obj.wrd.toLowerCase() == wrd.toLowerCase();
    });
    if (result) {
      var glishfoneem = transfoorm(result.foneem);
      console.log("seems to be " + glishfoneem);
      if (glishfoneem) {
        nuuwrdset.push(glishfoneem);
      }
    }
    else {
      nuuwrdset.push(wrd);
    }
  });
  owtpout = nuuwrdset.join(" ");
  console.log("owtpout is "+owtpout);
  func(owtpout);
});
*/
