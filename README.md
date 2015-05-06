# fxt

...tools for the creation and management of test fixture data.

For example, for use with this app:

`tests/some_app.js`
```
// ...

exports.some_app = {

  get_org: function () {
    var response = Q.defer()
    http.get('http://example.com', function (response_event) {
      //must grab some data to have it loaded into memory
      content = response_event.read()
      response_event.on('end', function () { response.resolve(response_event) })
    }).end()
    return response.promise
  },

  get_org_twice: function () {
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

```

## generate test fixtures as a side effect of integration

`tests/fxtSpec.js`
```
describe('fxt', function () {

  //define the fixture
  some_app.get_org_twice = fxt.feature(some_app.get_org_twice)

  // feature test
  it('creates and replays a fixture to test a feature', function (done) {
    some_app.get_org_twice()
    .then(function (summary) {
      expect(summary).toBe(400)
      done()
    })
  })
```

### archiving test fixtures
```
cp /tmp/fxt/default my_saved_fixture # and sanitize if desired
```
