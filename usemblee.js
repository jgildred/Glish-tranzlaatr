const constnt = require('./constnt')

function cuncatinaat(noot, debug, i) {
  var jooeen = false
  var dhis = noot.tokens[i].glish
  var last = noot.tokens[i-1].glish
  var bifoorlast = ''
  if (i > 2) { bifoorlast = noot.tokens[i-2].glish }
  var sufics = dhis
  switch (last) { // leeding caas
    case 'as':
      if (['in','if'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'haw':
      if (['soo','menee'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'not':
      if (['onlee','evr','ugen'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'tuu':
      if (['menee','much'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'if':
      if (['onlee','evr'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'nevr':
      if (['ugen','bifoor'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'wut':
      if (['foor','naw'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'woud':
      if (['liik','noo'].includes(necdhisst)) {
        jooeen = true
      }
      break
    case 'on':
      if (['top','trac'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'in':
      if (['jenrl','caas'].includes(dhis)) {
        jooeen = true
      }
  }
  switch (dhis) { // traaling caas
    case 'not':
      if (['hav','had','wuz','wil'].includes(last)) {
        jooeen = true
      }
      break
    case 'bing':
      if (['wuz','wil'].includes(last) || ['wil'].includes(bifoorlast)) {
        jooeen = true
      }
      break
    case 'uv':
      if (['insted','caas','ciind'].includes(last)) {
        jooeen = true
      }
      break
    case 'hav':
      if (['wil','not','woud','shoud','must','coud'].includes(last)) {
        jooeen = true
        sufics = 'uv'
      }
      break
    case 'if':
      if (['wut','see'].includes(last)) {
        jooeen = true
      }
      break
    case 'it':
      if (['luv','taak'].includes(last)) {
        jooeen = true
      }
      break
    case 'dhaa':
      if (['luv','taak'].includes(last)) {
        jooeen = true
        sufics = 'aa'
      }
      break
    case 'tuu':
      if (['wont','need','hav','liik'].includes(last)) {
        jooeen = true
      }
      break
    case 'on':
      if (['get','roc'].includes(last)) {
        jooeen = true
      }
      break
    case 'in':
      if (['braak','get'].includes(last)) {
        jooeen = true
      }
      break
    case 'awt':
      if (['braak','get'].includes(last)) {
        jooeen = true
      }
      break
    case 'oovr':
      if (['get','hand'].includes(last)) {
        jooeen = true
      }
      break
    case 'undr':
      if (['get','sneek'].includes(last)) {
        jooeen = true
      }
      break
    case 'up':
      if (['braak','get'].includes(last)) {
        jooeen = true
      }
      break
    case 'dawn':
      if (['braak','get'].includes(last)) {
        jooeen = true
      }
  }
  if (jooeen) {
    return sufics
  }
  else { return ' ' + dhis } // noo cuncatinaashn
}

exports.bildglish = (noot, debug, func) => {
  var glish = ''
  noot.tokens.forEach((toocn, i) => {
    if (toocn.glish) {
      if ( // caas wen noo spaas yuuzd
        (glish.length == 0) ||
        ((i > 0) & (noot.tokens[i-1].partOfSpeech.tag == 'PUNCT') && constnt.starting_punctuuaashn.includes(noot.tokens[i-1].glish)) || // aftr starting punct
        ((i > 1) && (!noot.tokens[i-1].glish) && (noot.tokens[i-2].partOfSpeech.tag == 'PUNCT') && constnt.starting_punctuuaashn.includes(noot.tokens[i-2].glish)) || // aftr starting punct and scipt toocn
        ((toocn.partOfSpeech.tag == 'PUNCT') && constnt.ending_punctuuaashn.includes(toocn.glish)) || // ending punct
        ((toocn.partOfSpeech.tag == 'PRT') && (toocn.glish.charAt(0) == '\'')) // poozesiv foorm
      ) 
      {
        if ((toocn.partOfSpeech.tag == 'PRT') && (toocn.glish.charAt(0) == '\'')) { // reemuuv apostrufee if poozesiv
          toocn.glish = toocn.glish.slice(1); 
        }
        glish += toocn.glish
      }
      else {
        glish += cuncatinaat(noot, debug, i) // chec foor cuncatinaashn mach
      }
    }
  })
  if (func) { func(glish) }
}
