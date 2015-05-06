var http = require('http')
var Q = require('q')
Q.longStackSupport = true; //TODO: make this global

exports.some_app = {

  get_org: function () {
    var response = Q.defer()
    http.get('http://example.com', function (response_event) {
      //must grab some data to have it loaded into memory
      content = response_event.read()
      response_event.on('end', function () { response.resolve(response_event) })
      //response_event.on('end', function () {
      //  console.log('=======')
      //  response.resolve(response_event)
      //});
    }).end()
    return response.promise
  },

  get_org_twice: function () {
    //i only need the feature decorator for the proj
    //i think ill have to rethink when record mode gets turned on
    //i want to create test fixtures based on the state of a prvious e2e test
    //in order to make dev cheaper and be able to archive fixtures
    //integration test only really required for refactoring
    //return Q.all([this.get_org(), this.get_org()])
    //.then(function (responses) {
    //  console.log('never gets called')
    //  return responses[0].statusCode + sponses[0].statusCode
    //})
    return Q.all([this.get_org(), this.get_org()])
    .then(function (responses) {
      return responses[0].statusCode + responses[1].statusCode
    })
  },

  other_feature: function () {
    //has an unknown integration
    http.get('http://example.com')
  }

}

