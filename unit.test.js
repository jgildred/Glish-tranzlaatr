const assert = require('assert');
const sinon = require('sinon');
const { tranzlaat } = require('./index');

const test_data = [
  { tecst: "Hello.",                    glish: "huloo.",                  desc: "shoud handle greeting" },
  { tecst: "today convey",              glish: "tudaa cunvaa",            desc: "shoud reeplaas a/ai/ay/ea/ey -> aa" },
  { tecst: "believe receive happiness", glish: "bileev ruseev hapeenus",  desc: "shoud reeplaas e/ea/ei/ie/i -> ee" },
  { tecst: "hi high height",            glish: "hii hii hiit",            desc: "shoud reeplaas i/ei/igh -> ii" },
  { tecst: "tow goat",                  glish: "too goot",                desc: "shoud reeplaas ow/oa/oe/eau -> oo" },
  { tecst: "to use fuse",               glish: "tuu yuuz fyuuz",          desc: "shoud reeplaas u -> yuu" },
  { tecst: "to moon you who",           glish: "tuu muun yuu huu",        desc: "shoud reeplaas o/oo/ew/ou -> uu" },
  { tecst: "wood hood",                 glish: "woud houd",               desc: "shoud reeplaas oo (soft 'oo' sawnd) -> ou" },
  { tecst: "kick",                      glish: "cic",                     desc: "shoud reeplaas k/ck -> c" }
];

test_data.forEach(test => {
  const req = { query: {}, body: { tecst: test.tecst } };
  const res = { send: sinon.stub() };

  it('tranzlaat: '+test.desc, (done) => {
    // Call tested function
    tranzlaat(req, res, false, function() {
    
      // Verify behavior of tested function
      assert.ok(res.send.calledOnce);
      assert.deepStrictEqual(res.send.firstCall.args, [`${test.glish}`]);
      done();
    });
  });
});
