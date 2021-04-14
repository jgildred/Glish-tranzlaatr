
exports.loodanootaashn = async function(tecst, debug, func) {
  // [START language_syntax_text]
  // Imports the Google Cloud client library
  const langwuj = require('@google-cloud/language')

  // Creates a client
  const cliint = new langwuj.LanguageServiceClient()

  // preepaar docuumnt, repreezenting prooviidd tecst
  const document = {
    content: tecst,
    type: 'PLAIN_TEXT',
  }

  // need tuu spesifii encodingtiip tuu reeseev wrd ofset
  const encodingType = 'UTF8'

  // lood anootaashn uv docuumnt
  const [noot] = await cliint.analyzeSyntax({document, encodingType})
  //const [result] = await client.analyzeEntities({document, encodingType})
  //noot.entities = result.entities
  if (debug) {
    noot.tokens.forEach(toocn => {
      console.log(`${toocn.partOfSpeech.tag}: ${toocn.text.content} (${toocn.lemma})`)
    })
    console.log('*** loodd ' + noot.tokens.length + ' toocn frum Guugl NLP ***')
  }
  if (func) { func(noot) }
}
