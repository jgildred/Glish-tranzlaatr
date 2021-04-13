const constnt = require('./constnt')

function articl(noot, toocn, i, debug) {
  if (constnt.articl.includes(toocn.text.content.toLowerCase())) {
    toocn.ignore = true;
  }
  return noot
}

function proonown(noot, toocn, i, debug) {
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

function nown(noot, toocn, i, debug) {
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

function adj(noot, toocn, i, debug) {
  var reezult = constnt.cawntr.find(obj => { // proses cawntr
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

function vrb(noot, toocn, i, debug) {
  if (debug) console.log(toocn.text.content + ': ' + toocn.partOfSpeech.tense)
  switch (toocn.lemma.toLowerCase()) {
    case 'be':
      switch (toocn.text.content.toLowerCase()) {
        case 'was':
        case 'were':
          toocn.glish = 'wuz'
          break
        case 'being':
          toocn.glish = 'bing'
          break
        default:
          toocn.ignore = true
      }
      break
    case 'have':
      if (toocn.partOfSpeech.tense == 'PAST') {
        toocn.glish = 'had'
      }
      break
    case 'do':
      if (noot.tokens[i+1].lemma.toLowerCase() == 'not') {
        toocn.ignore = true
      }
      break
    default:
      if (toocn.partOfSpeech.tense == 'PAST') {
        toocn.fooneem += ' D'
      }
      if (['PRESENT','TENSE_UNKNOWN'].includes(toocn.partOfSpeech.tense)) {
        if ((toocn.text.content.toLowerCase().slice(-3) == 'ing') &&
        (toocn.lemma.toLowerCase().slice(-3) != 'ing')) {
          toocn.fooneem += ' IH1 NG'
        }
        else {
          if ((noot.tokens[i-1].lemma == 'not') && (noot.tokens[i-2].text.content == 'did')) {
            toocn.fooneem += ' D'
          }
        }
      }
  }
  return noot
}

function num(noot, toocn, i, debug) { // duud: 
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
  noot.tokens.forEach((toocn, i) => {
    switch(toocn.partOfSpeech.tag) {
      case 'DET':
        noot = articl(noot, toocn, i, debug)
        break
      case 'PRON':
        noot = proonown(noot, toocn, i, debug)
        break
      case 'NOUN':
        noot = nown(noot, toocn, i, debug)
        break
      case 'ADJ':
        noot = adj(noot, toocn, i, debug)
        break
      case 'VERB':
        noot = vrb(noot, toocn, i, debug)
        break
      case 'NUM':
        noot = num(noot, toocn, i, debug)
        break
      default:
        if (debug) { console.log('mising pos tag?') }
    }
  })
  if (debug) console.log('*** prosesd Glish gramr ruul ***')
  func(noot)
}
