// dheez test reecwiir Mocha 

const assert = require('assert')
const sinon = require('sinon')
const { main } = require('../index')

const test_daatu = [
  { tecst: 'Hello.',                    glish: 'huloo.',                  tiitl: 'shoud handle greeting' },
  { tecst: 'today convey',              glish: 'tudaa cunvaa',            tiitl: 'shoud reeplaas a/ai/ay/ea/ey -> aa' },
  { tecst: 'believe receive happiness', glish: 'bileev ruseev hapeenus',  tiitl: 'shoud reeplaas e/ea/ei/ie/i -> ee' },
  { tecst: 'hi high height',            glish: 'hii hii hiit',            tiitl: 'shoud reeplaas i/ei/igh -> ii' },
  { tecst: 'tow goat',                  glish: 'too goot',                tiitl: 'shoud reeplaas ow/oa/oe/eau -> oo' },
  { tecst: 'to use fuse',               glish: 'tuu yuuz fyuuz',          tiitl: 'shoud reeplaas u -> yuu' },
  { tecst: 'to moon you who',           glish: 'tuu muun yuu huu',        tiitl: 'shoud reeplaas o/oo/ew/ou -> uu' },
  { tecst: 'wood hood',                 glish: 'woud houd',               tiitl: 'shoud reeplaas oo (soft "oo" sawnd) -> ou' },
  { tecst: 'kick',                      glish: 'cic',                     tiitl: 'shoud reeplaas k/ck -> c' },
  { tecst: 'of',                        glish: 'uv',                      tiitl: 'shoud reeplaas f ("vvv" sawnd) -> v' },
  { tecst: 'change judge',              glish: 'chaanj juj',              tiitl: 'shoud reeplaas ge/dge (“juh” sawnd) -> j' },
  { tecst: 'peasant anyone',            glish: 'peznt eneewun',           tiitl: 'shoud reeplaas ea/e -> e' },
  { tecst: 'all art autism',            glish: 'ol ort otizm',            tiitl: 'shoud reeplaas a/au/aw/awe (shoort “o” sawnd) -> o' },
  { tecst: 'rise possess as',           glish: 'riiz puzes az',           tiitl: 'shoud reeplaas s ("zzz" sawnd) -> z' },
  { tecst: 'circle service',            glish: 'surcl survus',            tiitl: 'shoud reeplaas ci/ce ("sss" sawnd) -> s' },
  { tecst: 'what wonder cover vanity',  glish: 'wut wundr cuvr vanutee',  tiitl: 'shoud reeplaas a/i/o (shoort "u" sawnd) -> u' },
  { tecst: 'ground town',               glish: 'grawnd tawn',             tiitl: 'shoud reeplaas ou/ow -> aw' },
  { tecst: 'quick',                     glish: 'cwic',                    tiitl: 'shoud reeplaas qu -> cw' },
  { tecst: 'language',                  glish: 'langwuj',                 tiitl: 'shoud reeplaas gu -> gw' },
  { tecst: 'exterminate',               glish: 'icsturmunaat',            tiitl: 'shoud reeplaas x -> cs' },
  { tecst: 'example auxiliary',         glish: 'igzampl ogzilyuree',      tiitl: 'shoud reeplaas x ("guh" and "zzz" sawnd) -> gz' },
  { tecst: 'phone',                     glish: 'foon',                    tiitl: 'shoud reeplaas ph -> f' },
  { tecst: 'rough',                     glish: 'ruf',                     tiitl: 'shoud reeplaas ough -> uf' },
  { tecst: 'for war warrant',           glish: 'foor woor woornt',        tiitl: 'shoud reeplaas or/ar/arr (long "o" sawnd) -> oor' },
  { tecst: 'toy voice',                 glish: 'tooee vooees',            tiitl: 'shoud reeplaas oy/oi -> ooee' },
  { tecst: 'daughter',                  glish: 'dotr',                    tiitl: 'shoud reeplaas ought/aught -> ot' },
  { tecst: 'play grey',                 glish: 'plaa graa',               tiitl: 'shoud reeplaas -ay/-ey -> -aa' },
  { tecst: 'monkey donkey',             glish: 'mungcee dongcee',         tiitl: 'shoud reeplaas -ey -> -ee' },
  { tecst: 'buy',                       glish: 'bii',                     tiitl: 'shoud reeplaas -uy -> -ii' },
  { tecst: 'carnage',                   glish: 'cornij',                  tiitl: 'shoud reeplaas -age/-idge -> -ij' },
  { tecst: 'wise',                      glish: 'wiiz',                    tiitl: 'shoud reeplaas -se ("zzz" sawnd) -> -z' },
  { tecst: 'love',                      glish: 'luv',                     tiitl: 'shoud reeplaas -ove (shoort "u" sawnd) -> -uv' },
  { tecst: 'lonesome commute',          glish: 'loonsum cumyuut',         tiitl: 'shoud reeplaas omm/ome (shoort "u" sawnd) -> um' },
  { tecst: 'monkey donkey',             glish: 'mungcee dongcee',         tiitl: 'shoud reeplaas on -> ung/ong' },
  { tecst: 'spasm',                     glish: 'spazm',                   tiitl: 'shoud reeplaas -sm -> -zm' },
  { tecst: 'Asia nausea',               glish: 'Aazhu nozhu',             tiitl: 'shoud reeplaas -sia/-sea ("zzz" sawnd) -> -zhu' },
  { tecst: 'heir there narrator',       glish: 'er dher neraatr',         tiitl: 'shoud reeplaas eir/ere/err/air/are/ar -> er' },
  { tecst: 'modifier senior',           glish: 'modufiir seenyr',         tiitl: 'shoud reeplaas -ier/-ior/-iar -> -iir/-yr' },
  { tecst: 'anyone',                    glish: 'eneewun',                 tiitl: 'shoud reeplaas -one -> -wun' },
  { tecst: 'would',                     glish: 'woud',                    tiitl: 'shoud reeplaas ould -> oud' },
  { tecst: 'hyper mystery my lyrics',   glish: 'hiipr misturee mii liric',tiitl: 'shoud reeplaas y -> i/ii/ee' },
  { tecst: 'stirring furry person',     glish: 'sturing furee pursn',     tiitl: 'shoud reeplaas er/ir/irr/ur/urr ("r" sawnd) -> ur' },
  { tecst: 'fury',                      glish: 'fyouree',                 tiitl: 'shoud reeplaas u (with "y" and short “oo”) -> you'},
  { tecst: 'before',                    glish: 'bifoor',                  tiitl: 'shoud reeplaas be- -> bi-' },
  { tecst: 'future',                    glish: 'fyuuchr',                 tiitl: 'shoud reeplaas -tur/-ture -> -chr' },
  { tecst: 'raisin',                    glish: 'raazn',                   tiitl: 'shoud reeplaas -sin ("zzz" sawnd) -> -zn' },
  { tecst: 'special',                   glish: 'speshl',                  tiitl: 'shoud reeplaas -cial/-tial -> -shl' },
  { tecst: 'spacious',                  glish: 'spaashs',                 tiitl: 'shoud reeplaas -cious/-tious -> -shs' },
  { tecst: 'extension martian',         glish: 'icstenshn morshn',        tiitl: 'shoud reeplaas -sion/-ssion/-tion/-tian/-cean -> -shn' },
  { tecst: 'conclusion Persian',        glish: 'cuncluuzhn Purzhn',       tiitl: 'shoud reeplaas -sion/-sian ("zzz" sawnd) -> -zhn' },
  { tecst: 'double',                    glish: 'dubl',                    tiitl: 'shoud reeplaas -le -> -l' },
  { tecst: 'shovel vowel towel',        glish: 'shuvl vawl tawl',         tiitl: 'shoud reeplaas -el -> -l' },
  { tecst: 'musical',                   glish: 'myuuzicl',                tiitl: 'shoud reeplaas -al (unles "a" proonawnsd) -> -l' },
  { tecst: 'mixed rented sounded',      glish: 'micst rentd sawndd',      tiitl: 'shoud reeplaas -ed -> -d oor -t' },
  { tecst: 'haven villain person',      glish: 'haavn viln pursn',        tiitl: 'shoud reeplaas -ain/-en/-on (veree shoort vawl sawnd) -> -n' },
  { tecst: 'present peasant',           glish: 'preznt peznt',            tiitl: 'shoud reeplaas -ant/-ent -> -nt' },
  { tecst: 'enter senator',             glish: 'entr senutr',             tiitl: 'shoud reeplaas -er/-ar/-ir/-or/-ur ("r" sawnd) -> -r' },
  { tecst: 'girl',                      glish: 'grl',                     tiitl: 'shoud reeplaas -erl/-irl/-url -> -rl' },
  { tecst: 'turn',                      glish: 'trn',                     tiitl: 'shoud reeplaas -ern/-irn/-urn -> -rn' },
  { tecst: 'word',                      glish: 'wrd',                     tiitl: 'shoud reeplaas -erd/-ird/-urd -> -rd' },
  { tecst: 'collapse',                  glish: 'culaps',                  tiitl: 'shoud reeplaas -se -> -s' },
  { tecst: 'jealous',                   glish: 'jelus',                   tiitl: 'shoud reeplaas -ous -> -us' },
  { tecst: 'when',                      glish: 'wen',                     tiitl: 'shoud reeplaas wh -> w' },
  { tecst: 'instead weather',           glish: 'insted wedhr',            tiitl: 'shoud reeplaas ea -> e' }
]

test_daatu.forEach(test => {
  const req = { query: {}, body: { tecst: test.tecst }, method: 'POST', path: '/' }
  const res = { send: sinon.stub() }

  it('tranzlaat: ' + test.tiitl, () => {
    // Call tested function
    main(req, res, false, function() {

      // Verify behavior of tested function
      assert.ok(res.send.calledOnce)
      assert.deepStrictEqual(res.send.firstCall.args, [`${test.glish}`])
    })
  })
})
