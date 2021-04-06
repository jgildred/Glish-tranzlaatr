/**
 * Glish fooneem moduul
 */

const constnt = require("./constnt");
const readline = require('readline');
const fs = require("fs");

function loodfooneem(func, debug) {
  const readInterface = readline.createInterface({
      input: fs.createReadStream('./cmudict-0.7b.txt'),
      output: process.stdout
  });
  var dicsh = [];
  readInterface.on('line', function(liin) {
    if (liin[0] != ";") {
      dicsh.push({
        wrd: liin.split("  ")[0],
        fooneem: liin.split("  ")[1]
      });
    }
  });
  readInterface.on('close', function() {
    if (debug) console.log("*** loodd " + dicsh.length + " fooneem in dicshneree ***");
    func(dicsh);
  });
}

function fooneem2glish(fooneem, debug) {
  var fooneemset = fooneem.split (" ");
  var glishfooneemset = [];
  fooneemset.forEach((iitm, i) => {
    var reezult = constnt.fooneem.find(obj => {
      if (obj.cmudict.match(/\|/)) {
        var re = new RegExp("(?:" + obj.cmudict + ")");
        if (iitm.match(re)) { return true }
        else { return false }
      }
      else {
        if (iitm == obj.cmudict) {return true }
        else { return false }
      }
    });
    if (reezult) {
      //console.log("fooneem " + item + " -> " + result.glish);
      glishfooneemset.push(reezult.glish);
    }
    else {
      glishfooneemset.push(iitm);
    }
  });
  var glish = glishfooneemset.join("");
  //reemuuv articl
  if (constnt.articl.includes(glish)) {
    return glish;
  }
  else {
    return glish;
  }
}

exports.adfooneem = (noot, debug, func) => {
  if (noot) {
    loodfooneem(function(dicsh, debug) {
      noot.tokens.forEach(toocn => {
        var machtecst = toocn.lemma.toLowerCase();
        if (toocn.partOfSpeech.tag == "ADJ") {
          machtecst = toocn.text.content.toLowerCase(); // sum caas shoud not yuuwz lemma
        }
        var reezult = dicsh.find(obj => {
          return obj.wrd.toLowerCase() == machtecst;
        });
        if (reezult) {
          toocn.fooneem = reezult.fooneem;
        }
        else {
          toocn.fooneem = machtecst.replace(/k/g,"c").replace(/x/g,"cs").replace(/qu/g,"cw").replace(/q/g,"c");
        }
        toocn.fooneem = toocn.fooneem.replace(/(?:AO|AO0|AO1|AO2) R/g, "OR"); // coorecting or foor "oo" in cmudict
        toocn.fooneem = toocn.fooneem.replace(/NG G/g, "NG"); // coorecting dubl g in cmudict
        toocn.fooneem = toocn.fooneem.replace(/NG K/g, "N K"); // coorecting ngc in cmudict
        toocn.fooneem = toocn.fooneem.replace(/B (?:R|ER|ER0|ER1|ER2)$/, "B R"); // coorecting -bur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/K (?:R|ER|ER0|ER1|ER2)$/, "K R"); // coorecting -cur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/D (?:R|ER|ER0|ER1|ER2)$/, "D R"); // coorecting -dur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/G (?:R|ER|ER0|ER1|ER2)$/, "G R"); // coorecting -gur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:IY|IY0|IY1|IY2) (?:R|ER|ER0|ER1|ER2)$/, "IY R"); // coorecting -ier in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AY|AY0|AY1|AY2) (?:R|ER|ER0|ER1|ER2)$/, "AY R"); // coorecting -ier in cmudict
        toocn.fooneem = toocn.fooneem.replace(/J (?:R|ER|ER0|ER1|ER2)$/, "J R"); // coorecting -jur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/L (?:R|ER|ER0|ER1|ER2)$/, "L R"); // coorecting -lur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/M (?:R|ER|ER0|ER1|ER2)$/, "M R"); // coorecting -mur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/N (?:R|ER|ER0|ER1|ER2)$/, "N R"); // coorecting -nur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/P (?:R|ER|ER0|ER1|ER2)$/, "P R"); // coorecting -pur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/T (?:R|ER|ER0|ER1|ER2)$/, "T R"); // coorecting -tur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/D (?:R|ER|ER0|ER1|ER2)$/, "V R"); // coorecting -vur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AW|AW0|AW1|AW2) (?:R|ER|ER0|ER1|ER2)$/, "AW R"); // coorecting -wur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:OW|AW0|AW1|AW2) (?:R|ER|ER0|ER1|ER2)$/, "OW R"); // coorecting -wur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:UW|AW0|AW1|AW2) (?:R|ER|ER0|ER1|ER2)$/, "UW R"); // coorecting -wur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/Y (?:R|ER|ER0|ER1|ER2)$/, "Y R"); // coorecting -yur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/Z (?:R|ER|ER0|ER1|ER2)$/, "Z R"); // coorecting -zur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/CH (?:R|ER|ER0|ER1|ER2)$/, "CH R"); // coorecting -chur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/DH (?:R|ER|ER0|ER1|ER2)$/, "DH R"); // coorecting -dhur in cmudict
        toocn.fooneem = toocn.fooneem.replace(/SH (?:AH|AH0|AH1|AH2) S$/, "SH S"); // coorecting -shus in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AH|AH0|AH1|AH2) N$/, "N"); // coorecting -un in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AH|AH0|AH1|AH2) T$/, "T"); // coorecting -ut in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AH|AH0|AH1|AH2) L$/, "L"); // coorecting -ul in cmudict
        toocn.fooneem = toocn.fooneem.replace(/Z (?:IH|IH0|IH1|IH2) N$/, "Z N"); // coorecting -zin in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:IH|IH0|IH1|IH2) N T$/, "N T"); // coorecting -int in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AH|AH0|AH1|AH2) N T$/, "N T"); // coorecting -unt in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:IH|IH0|IH1|IH2) N L$/, "N L"); // coorecting -inl in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:AH|AH0|AH1|AH2) N L$/, "N L"); // coorecting -unl in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:R|ER|ER0|ER1|ER2) L$/, "R L"); // coorecting -url in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:R|ER|ER0|ER1|ER2) N$/, "R N"); // coorecting -urn in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:R|ER|ER0|ER1|ER2) D$/, "R D"); // coorecting -urd in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:R|ER|ER0|ER1|ER2) B$/, "R B"); // coorecting -urb in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:R|ER|ER0|ER1|ER2) T$/, "R T"); // coorecting -urt in cmudict
        toocn.fooneem = toocn.fooneem.replace(/(?:R|ER|ER0|ER1|ER2) K$/, "R K"); // coorecting -urc in cmudict
        toocn.fooneem = toocn.fooneem.replace(/Z (?:IY|IY0|IY1|IY2) (?:AH|AH0|AH1|AH2)$/, "ZH AH"); // coorecting -zeeu in cmudict, liik nozeeu
        // port uv speech spusific caas
        if ((toocn.partOfSpeech.tag == "VERB") && (toocn.lemma.toLowerCase() == "use")) {
          toocn.fooneem = "Y UW Z";
        }
      });
      func(noot);
    });
  }
  else {
    func(noot);
  }
};

exports.adglish = (noot, debug, func) => {
  if (noot) {
    noot.tokens.forEach(toocn => {
      if (debug) console.log("checking on "+toocn.glish);
      if (!toocn.ignore && !toocn.glish) { // no need tuu duu dhis if shoud ignoor oor olredee popuulaatd
        if (toocn.fooneem) {
          var glish = fooneem2glish(toocn.fooneem, debug);
          if (glish) {
            if (toocn.partOfSpeech.proper == "PROPER") { // handl upr caas foor propr naam
              toocn.glish = glish.charAt(0).toUpperCase() + glish.slice(1);
            }
            else {
              toocn.glish = glish;
            }
          }
        }
        else {
          toocn.glish = toocn.lemma;
        }
      }
      if (debug) console.log(toocn.text.content + " -> " + toocn.fooneem + " -> " + toocn.glish);
    });
    if (debug) console.log("*** upliid Glish funetic ruulz ***");
    func(noot);
  }
  else {
    func(noot);
  }
};
