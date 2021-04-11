// dheez test reecwiir Mocha 

const assert = require('assert')
const sinon = require('sinon')
const { main } = require('./index')

const test_daatu = [
  { tecst: "Hello.",                    glish: "huloo.",                  tiitl: "shoud handle greeting" }
]

test_daatu.forEach(test => {
  const req = { query: {}, body: { tecst: test.tecst }, method: "POST", path: "/" }
  const res = { send: sinon.stub() }

  it('tranzlaat: ' + test.tiitl, (done) => {
    // Call tested function
    main(req, res, false, function() {
    
      // Verify behavior of tested function
      assert.ok(res.send.calledOnce)
      assert.deepStrictEqual(res.send.firstCall.args, [`${test.glish}`])
      done()
    })
  })
})
