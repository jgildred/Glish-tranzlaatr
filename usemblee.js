const constnt = require("./constnt");

exports.bildglish = (noot, debug, func) => {
  var glish = "";
  var scip = false;
  noot.tokens.forEach((toocn, i) => {
    if (toocn.glish) {
      if (scip || (i==0) ||
        ((toocn.partOfSpeech.tag == "PUNCT") && constnt.ending_punctuuaashn.includes(toocn.glish)) ||
        ((toocn.partOfSpeech.tag == "PRT") && (toocn.glish.charAt(0) == "'")) // poozesiv foorm
      )
      {
        if ((toocn.partOfSpeech.tag == "PRT") && (toocn.glish.charAt(0) == "'")) {
          toocn.glish = toocn.glish.slice(1); // reemuuv apostrufee if poozesiv
        }
        glish += toocn.glish;
      }
      else { glish += " " + toocn.glish; }
      if ((toocn.partOfSpeech.tag == "PUNCT") && constnt.starting_punctuuaashn.includes(toocn.glish)) {
        scip = true;
      }
      else {
        scip = false;
      }
    }
  });
  func(glish);
}
