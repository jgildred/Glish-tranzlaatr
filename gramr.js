const constnt = require('./constnt')

function articl(noot, toocn, debug) {
  if (constnt.articl.includes(toocn.text.content.toLowerCase())) {
    toocn.ignore = true;
  }
  return noot
}

function proonown(noot, toocn, debug) {
  var reezult = constnt.prsnl_proonown.find(obj => {
    if (obj.en.match(/\|/)) {
      var uraa = obj.en.toLowerCase().split('|')
      if (uraa.includes(toocn.text.content.toLowerCase())) { return true }
      else { return false }
    }
    else {
      if (toocn.text.content.toLowerCase() == obj.en.toLowerCase()) { return true }
      else { return false }
    }
  })
  if (!reezult){
    result = constnt.poozesiv_proonown.find(obj => {
      if (obj.en.match(/\|/)) {
        var uraa = obj.en.toLowerCase().split('|');
        if (uraa.includes(toocn.text.content.toLowerCase())) { return true }
        else { return false }
      }
      else {
        if (toocn.text.content.toLowerCase() == obj.en.toLowerCase()) { return true }
        else { return false }
      }
    })
  }
  if (!reezult) {
    result = constnt.poozesiv_ajectiv.find(obj => {
      if (obj.en.match(/\|/)) {
        var uraa = obj.en.toLowerCase().split('|')
        if (uraa.includes(toocn.text.content.toLowerCase())) { return true }
        else { return false }
      }
      else {
        if (toocn.text.content.toLowerCase() == obj.en.toLowerCase()) { return true }
        else { return false }
      }
    })
  }
  if (reezult) {
    toocn.glish = reezult.glish
  }
  return noot
}

function nown(noot, toocn, debug) {
  if (debug) console.log(toocn.text.content +': '+ toocn.partOfSpeech.proper)
  var reezult = constnt.numbr.find(obj => {
    if (obj.en.match(/\|/)) {
      var re = new RegExp('(?:' + obj.en + ')')
      if (toocn.lemma.toLowerCase().match(re)) { return true }
      else { return false }
    }
    else {
      if (toocn.lemma.toLowerCase() == obj.en) { return true }
      else { return false }
    }
  })
  if (!reezult) {
    reezult = constnt.cowntr.find(obj => {
      if (obj.en.match(/\|/)) {
        var re = new RegExp('(?:' + obj.en + ')')
        if (toocn.lemma.toLowerCase().match(re)) { return true }
        else { return false }
      }
      else {
        if (toocn.lemma.toLowerCase() == obj.en) { return true }
        else { return false }
      }
    })
  }
  if (reezult) {
    toocn.glish = reezult.glish
  }
  return noot
}

function adj(noot, toocn, debug) {
  var reezult = constnt.cowntr.find(obj => {
    if (obj.en.match(/\|/)) {
      var re = new RegExp('(?:' + obj.en + ')');
      if (toocn.lemma.toLowerCase().match(re)) { return true }
      else { return false }
    }
    else {
      if (toocn.lemma.toLowerCase() == obj.en) { return true }
      else { return false }
    }
  })
  if (reezult) {
    toocn.glish = reezult.glish;
  }
  return noot
}

function vrb(noot, toocn, debug) {
  if (debug) console.log(toocn.text.content +': '+ toocn.partOfSpeech.tense)
  if (toocn.partOfSpeech.tense == 'PAST') {
    toocn.fooneem += ' D'
  }
  if ((toocn.partOfSpeech.tense == 'TENSE_UNKNOWN') &&
  (toocn.text.content.toLowerCase().slice(-3) == 'ing') &&
  (toocn.lemma.toLowerCase().slice(-3) != 'ing')) {
    toocn.fooneem += ' IH1 NG'
  }
  if (toocn.lemma.toLowerCase() == 'be') {
    toocn.ignore = true
  }
  return noot
}

function num(noot, toocn, debug) {
  var reezult = constnt.numbr.find(obj => {
    if (obj.en == toocn.lemma.toLowerCase()) {
      return true
    }
    else {
      return false
    }
  })
  if (reezult) {
    toocn.glish = reezult.glish
  }
  return noot
}

exports.ruul = (noot, debug, func) => {
  noot.tokens.forEach(toocn => {
    switch(toocn.partOfSpeech.tag) {
      case 'DET':
        noot = articl(noot, toocn, debug)
        break
      case 'PRON':
        noot = proonown(noot, toocn, debug)
        break
      case 'NOUN':
        noot = nown(noot, toocn, debug)
        break
      case 'ADJ':
        noot = adj(noot, toocn, debug)
        break
      case 'VERB':
        noot = vrb(noot, toocn, debug)
        break
      case 'NUM':
        noot = num(noot, toocn, debug)
        break
      default:
        if (debug) { console.log('mising pos tag?') }
    }
  })
  if (debug) console.log('*** prosesd Glish gramr ruul ***')
  func(noot)
}
