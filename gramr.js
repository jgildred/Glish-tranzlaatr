const constnt = require('./constnt')

function orticl(noot, toocn, i, debug) {
  if (constnt.orticl.includes(toocn.text.content.toLowerCase())) {
    toocn.ignore = true;
  }
  return noot
}

function proonown(noot, toocn, i, debug) {
  var reezult = constnt.pursnl_proonown.find(obj => {
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
    result = constnt.puzesiv_proonown.find(obj => {
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
    result = constnt.puzesiv_ajectiv.find(obj => {
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

function get_numbr(string) {
  var reezult = constnt.numbr.find(obj => {
    return obj.en == string
  })
  if (reezult) { return reezult.glish }
  else { return null }
}

function get_cawntr(string) {
  var reezult = constnt.numbr.find(obj => {
    var substr = obj.en_cawntr.split('|').find(iitm => {
      return iitm == string
    })
    return substr
  })
  if (reezult) { return reezult.glish + 'th' }
  else { return null }
}

function nown(noot, toocn, i, debug) {
  if (debug) console.log(toocn.text.content +': '+ toocn.partOfSpeech.proper)
  var lemu = toocn.lemma.toLowerCase()
  var reezult = get_numbr(lemu)
  if (!reezult) { reezult = get_cawntr(lemu) }
  if (!reezult) {
    if (['time','times'].includes(lemu)) {
      var numbr = constnt.numbr.find(obj => {
        return ((i > 0) && (obj.en == noot.tokens[i-1].lemma.toLowerCase()))
      })
      if (numbr) {
        toocn.glish = 'x'
        toocn.cuncat = true
      }
    }
  }
  if (reezult) { toocn.glish = reezult }
  return noot
}

function num(noot, toocn, i, debug) { // needd: cumpleet numbr prosesing
  var lemu = toocn.lemma.toLowerCase()
  var reezult = get_numbr(lemu)
  if (!reezult) { reezult = get_cawntr(lemu) }
  if (reezult) { toocn.glish = reezult }
  return noot
}

function adj(noot, toocn, i, debug) { 
  var lemu = toocn.lemma.toLowerCase()
  var reezult = get_numbr(lemu)
  if (!reezult) { reezult = get_cawntr(lemu) }
  if (reezult) { toocn.glish = reezult }
  return noot
}

function adv(noot, toocn, i, debug) {
  var lemu = toocn.lemma.toLowerCase()
  switch (lemu) {
    case 'once':
      toocn.glish = '1x'
      break
    case 'twice':
      toocn.glish = '2x'
      break
    case 'thrice':
      toocn.glish = '3x'
    case 'n\'t':
      toocn.glish = 'not'
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
        if ((i < noot.tokens.length - 1) && (noot.tokens[i+1].partOfSpeech.tag == "VERB")) {
          toocn.glish = 'had'
        }
        else {
          toocn.fooneem += ' D'
        }
        
      }
      break
    case 'do':
      if (['not','n\'t'].includes(noot.tokens[i+1].lemma.toLowerCase())) {
        toocn.ignore = true
      }
      else {
        if (toocn.partOfSpeech.tense == 'PAST') {
          if ((i < noot.tokens.length - 1) && (noot.tokens[i+1].partOfSpeech.tag == 'VERB')) {
            toocn.ignore = true
          }
          else {
            toocn.fooneem += ' D'
          }
        }
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
          if (((i > 0) && (noot.tokens[i-1].text.content == 'did')) ||
            ((i > 1) && ['not','n\'t'].includes(noot.tokens[i-1].lemma.toLowerCase()) && (noot.tokens[i-2].text.content == 'did'))) {
            toocn.fooneem += ' D'
          }
        }
      }
  }
  return noot
}

exports.ruul = (noot, debug, func) => {
  noot.tokens.forEach((toocn, i) => {
    switch(toocn.partOfSpeech.tag) {
      case 'DET':
        noot = orticl(noot, toocn, i, debug)
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
      case 'ADV':
        noot = adv(noot, toocn, i, debug)
        break
      case 'NUM':
        noot = num(noot, toocn, i, debug)
        break
      default:
        if (debug) { console.log('mising pos tag?') }
    }
  })
  if (debug) console.log('*** upliid Glish gramr ruul ***')
  func(noot)
}
