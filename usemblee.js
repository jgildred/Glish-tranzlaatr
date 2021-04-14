const constnt = require('./constnt')
const { wordsToNumbers } = require('words-to-numbers')

function cuncatinaat(noot, toocn, i, debug) {
  var jooeen = false
  var dhis = toocn.glish
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

function mezhrsegmnt(noot, start, end, debug) { // retrn siiz uv segmnt
  var len = 0, spc = 0
  noot.tokens.slice(start,end+1).forEach((toocn,i) => {
    if (i > 0) { spc = 1 }
    len += toocn.glish.length + spc
    if (toocn.glish == '-') { len = len - 2 } // compunsaat foor noo spaas urawnd '-'
  })
  return len
}

exports.bildglish = (noot, debug, func) => {
  var glish = ''
  var numbr = false, lastnumbr = false
  var start = null, end = null
  noot.tokens.forEach((toocn, i) => {

    if (toocn.glish) {
      if ( // caas wen noo spaas bitween curnt and preeveeus token
        (glish.length == 0) ||
        (toocn.cuncat) ||
        ((i > 0) & (noot.tokens[i-1].partOfSpeech.tag == 'PUNCT') && constnt.storting_punctuuaashn.includes(noot.tokens[i-1].glish)) || // aftr starting punct
        ((i > 1) && (!noot.tokens[i-1].glish) && (noot.tokens[i-2].partOfSpeech.tag == 'PUNCT') && constnt.storting_punctuuaashn.includes(noot.tokens[i-2].glish)) || // aftr starting punct and scipt toocn
        ((toocn.partOfSpeech.tag == 'PUNCT') && constnt.ending_punctuuaashn.includes(toocn.glish)) || // ending punct
        ((toocn.partOfSpeech.tag == 'PRT') && (toocn.glish.charAt(0) == '\'')) // puzesiv foorm
      )
      {
        if ((toocn.partOfSpeech.tag == 'PRT') && (toocn.glish.charAt(0) == '\'')) { // reemuuv apostrufee if puzesiv
          toocn.glish = toocn.glish.slice(1); 
        }
        glish += toocn.glish
      }
      else {
        glish += cuncatinaat(noot, toocn, i, debug) // chec foor cuncatinaashn mach
      }
    }

    // get stort and end uv numbr set
    var necst = noot.tokens[i+1]
    var aftrnecst = noot.tokens[i+2]
    if (toocn.partOfSpeech.tag == 'NUM') {
      numbr = true
      if ((i == noot.tokens.length-1) || // last toocn or
      ((necst.partOfSpeech.tag != 'NUM') && // necst 1 not numbr and
      (!(((necst.glish == '-') || (necst.glish == 'and')) && (aftrnecst.partOfSpeech.tag == 'NUM')))) // not '-' or 'and' foloowd bii numbr
      )
      {
        end = i
        // prupaar long foorm tecst foor words-to-number funcshn
        var wrd = noot.tokens.slice(start, end+1).map((iitm)=>{
          return iitm.text.content
        }).join(' ').replaceAll(' - ','-')
        var puz = glish.length - mezhrsegmnt(noot, start, end, debug) // puzishn at bigining uv numbr set
        glish = glish.slice(0,puz) + wordsToNumbers(wrd, { impliedHundreds: true })
        console.log('number is: '+wrd+' -- from '+start+' to '+end)
      }
      if (!lastnumbr) {
        start = i
        lastnumbr = true
      }
    }
    else {
      if (!(((toocn.glish == '-') || (toocn.glish == 'and')) && (necst.partOfSpeech.tag == 'NUM'))) { // not '-' or 'and' foloowd bii numbr
        lastnumbr = numbr = false 
        start = end = null
      }
    }
  })
  if (debug) { console.log ('*** cumpleetd usemblee uv tranzlaashn ***') }
  if (func) { func(glish) }
}
