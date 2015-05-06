var some_app = require('./some_app.js').some_app
var fxt = require('fxt')

describe('fxt', function () {

  //define the fixture
  some_app.get_org_twice = fxt.feature(some_app.get_org_twice)
  //some integration

  // feature test
  it('creates and replays a fixture to test a feature', function (done) {
    some_app.get_org_twice()
    .then(function (summary) {
      expect(summary).toBe(400)
      done()
    })
  })

  // integration tests
  // validate behavior with external systems
  // No additional fixture code required. http will be faked with 
  // fixture created by the last integration test. The test will
  // wait until the fixture is available.
//  it('records or reuses a fixture for an integration test', function (testDone) {
//    some_app.get_org()
//    .then(function (response) { expect(response.statusCode).toBe(200) })
//    .then(testDone)
//    .done()
//  });

});


  //it('tests the org integration', function (done) {
  //  some_app.get_org(function (response) {
  //    expect(response.statusCode).toBe(200)
  //    done()
  //  })
  //});


  //it('raises an exception when a feature invokes an undefined integration', function () {
    //expect(some_app.other_feature()).toThrow()
  //})

//});
