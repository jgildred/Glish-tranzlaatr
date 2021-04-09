/**
 * Glish constnt valyuu
 */

exports.articl = ["the","a","an"]
exports.prsnl_proonown = [
  {plural: false, person: 1, glish:"mee", en:"i|me"},
  {plural: false, person: 2, glish:"yuu", en:"you"},
  {plural: false, person: 3, glish:"zhee", en:"he|him|she|her"},
  {plural: true, person: 1, glish:"wee", en:"we|us"},
  {plural: true, person: 2, glish:"yaa", en:"you"},
  {plural: true, person: 3, glish:"dhaa", en:"they|them"}
]
exports.poozesiv_proonown = [
  {plural: false, person: 1, glish:"miin", en:"mine"},
  {plural: false, person: 2, glish:"yoorz", en:"yours"},
  {plural: false, person: 3, glish:"hez", en:"his|hers"},
  {plural: true, person: 1, glish:"awrz", en:"ours"},
  {plural: true, person: 2, glish:"yerz", en:"yours"},
  {plural: true, person: 3, glish:"dherz", en:"theirs"}
]
exports.poozesiv_ajectiv = [
  {plural: false, person: 1, glish:"mii", en:"my"},
  {plural: false, person: 2, glish:"yoor", en:"your"},
  {plural: false, person: 3, glish:"hez", en:"his|her"},
  {plural: true, person: 1, glish:"awr", en:"our"},
  {plural: true, person: 2, glish:"yer", en:"your"},
  {plural: true, person: 3, glish:"dher", en:"their"}
]
exports.numbr = [
  {en: "zero", glish:"0"},
  {en: "one", glish:"1"},
  {en: "two", glish:"2"},
  {en: "three", glish:"3"},
  {en: "four", glish:"4"},
  {en: "five", glish:"5"},
  {en: "six", glish:"6"},
  {en: "seven", glish:"7"},
  {en: "eight", glish:"8"},
  {en: "nine", glish:"9"},
  {en: "ten", glish:"10"},
  {en: "eleven", glish:"11"},
  {en: "twelve", glish:"12"},
  {en: "thirteen", glish:"13"},
  {en: "fourteen", glish:"14"},
  {en: "fifteen", glish:"15"},
  {en: "sixteen", glish:"16"},
  {en: "seventeen", glish:"17"},
  {en: "eighteen", glish:"18"},
  {en: "nineteen", glish:"19"},
  {en: "twenty", glish:"20"},
  {en: "thirty", glish:"30"},
  {en: "forty", glish:"40"},
  {en: "fifty", glish:"50"},
  {en: "sixty", glish:"60"},
  {en: "seventy", glish:"70"},
  {en: "eighty", glish:"80"},
  {en: "ninety", glish:"90"},
  {en: "hundred", glish:"100"}
]
exports.cowntr = [
  {en: "first|1st", glish:"1th"},
  {en: "second|2nd", glish:"2th"},
  {en: "third|3rd", glish:"3th"},
  {en: "fourth", glish:"4th"},
  {en: "fifth", glish:"5th"},
  {en: "sixth", glish:"6th"},
  {en: "seventh", glish:"7th"},
  {en: "eighth", glish:"8th"},
  {en: "ninth", glish:"9th"},
  {en: "tenth", glish:"10th"},
  {en: "eleventh", glish:"11th"},
  {en: "twelveth", glish:"12th"},
  {en: "thirteenth", glish:"13th"},
  {en: "fourteenth", glish:"14th"},
  {en: "fifteenth", glish:"15th"},
  {en: "sixteenth", glish:"16th"},
  {en: "seventeenth", glish:"17th"},
  {en: "eighteenth", glish:"18th"},
  {en: "nineteenth", glish:"19th"},
  {en: "twentieth", glish:"20th"},
  {en: "thirtieth", glish:"30th"},
  {en: "fortieth", glish:"40th"},
  {en: "fiftieth", glish:"50th"},
  {en: "sixtieth", glish:"60th"},
  {en: "seventieth", glish:"70th"},
  {en: "eightieth", glish:"80th"},
  {en: "ninetieth", glish:"90th"},
  {en: "hundredth", glish:"100th"}
]
exports.blend = ["bl","cl","fl","gl","pl","br","cr","dr","fr","gr","pr","tr","sc","sl","sp","st","sw","spr","str"]
exports.punctuuaashn = ["!","@","#","$","%","^","&","*","(",")","-","=","_","+","[","]","{","}","/","|",";",":","?",",","<",".",">","'","`"]
exports.ending_punctuuaashn = ["!","@","%","*",")","-","=","_","+","]","}","/","|",";",":","?",",",".",">","'","`"]
exports.starting_punctuuaashn = ["'","(","[","{","<"]
exports.alfubet = ["a","b","c","d","e","f","g","h","i","j","l","m","n","o","p","r","s","t","u","v","w","y","z"]
exports.vowl = ["a","e","e","o","u"]
exports.consoonant = ["b","c","d","f","g","h","j","l","m","n","p","r","s","t","v","w","y","z"]
exports.fooneem = [
  {cmudict: "AA|AA0|AA1|AA2", glish: "o"},
  {cmudict: "AE|AE0|AE1|AE2", glish: "a"},
  {cmudict: "AH|AH0|AH1|AH2", glish: "u"},
  {cmudict: "AO|AO0|AO1|AO2", glish: "o"},
  {cmudict: "AW|AW0|AW1|AW2", glish: "aw"},
  {cmudict: "AY|AY0|AY1|AY2", glish: "ii"},
  {cmudict: "B", glish: "b"},
  {cmudict: "CH", glish: "ch"},
  {cmudict: "D", glish: "d"},
  {cmudict: "DH", glish: "dh"},
  {cmudict: "EH|EH0|EH1|EH2", glish: "e"},
  {cmudict: "ER|ER0|ER1|ER2", glish: "ur"},
  {cmudict: "EY|EY0|EY1|EY2", glish: "aa"},
  {cmudict: "F", glish: "f"},
  {cmudict: "G", glish: "g"},
  {cmudict: "HH", glish: "h"},
  {cmudict: "IH|IH0|IH1|IH2", glish: "i"},
  {cmudict: "IY|IY0|IY1|IY2", glish: "ee"},
  {cmudict: "JH", glish: "j"},
  {cmudict: "K", glish: "c"},
  {cmudict: "L", glish: "l"},
  {cmudict: "M", glish: "m"},
  {cmudict: "N", glish: "n"},
  {cmudict: "NG", glish: "ng"},
  {cmudict: "OW|OW0|OW1|OW2", glish: "oo"},
  {cmudict: "OY|OY0|OY1|OY2", glish: "ooee"},
  {cmudict: "P", glish: "p"},
  {cmudict: "R", glish: "r"},
  {cmudict: "S", glish: "s"},
  {cmudict: "SH", glish: "sh"},
  {cmudict: "T", glish: "t"},
  {cmudict: "TH", glish: "th"},
  {cmudict: "UH|UH0|UH1|UH2", glish: "ou"},
  {cmudict: "UW|UW0|UW1|UW2", glish: "uu"},
  {cmudict: "V", glish: "v"},
  {cmudict: "W", glish: "w"},
  {cmudict: "Y", glish: "y"},
  {cmudict: "Z", glish: "z"},
  {cmudict: "ZH", glish: "zh"},
  {cmudict: "OR", glish: "oor"}
]
