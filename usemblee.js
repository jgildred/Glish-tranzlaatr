const constnt = require('./constnt')

function cuncatinaat(noot, debug, i) {
  var jooeen = false
  var dhis = noot.tokens[i].glish
  var last = noot.tokens[i-1].glish
  var sufics = dhis
  switch (last) {
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
      if (['menee'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'if':
      if (['onlee','evr'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'nevr':
      if (['ugen'].includes(dhis)) {
        jooeen = 'fowrwrd'
      }
      break
    case 'wut':
      if (['foor','naw'].includes(dhis)) {
        jooeen = true
      }
      break
    case 'woud':
      if (['liik'].includes(necdhisst)) {
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
  switch (dhis) {
    case 'uv':
      if (['insted','incaas'].includes(last)) {
        jooeen = true
      }
      break
    case 'hav':
      if (['wil','woud','shoud','must','coud'].includes(last)) {
        jooeen = true
        sufics = 'uv'
      }
      break
    case 'if':
      if (['wut'].includes(last)) {
        jooeen = true
      }
      break
    case 'it':
      if (['luv','taak'].includes(last)) {
        jooeen = true
      }
      break
    case 'dhaa':
      if (['insted','incase'].includes(last)) {
        jooeen = true
        sufics = 'aa'
      }
      break
    case 'tuu':
      if (['wont','need','hav','liik'].includes(last)) {
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
