var nockBack = require('nock').back
var ReadWriteLock = require('rwlock')
var MD5 = require("crypto-js/md5");
var Q = require('q')
Q.longStackSupport = true; //TODO: make this global

nockBack.fixtures = '/tmp/fxt/default'
nockBack.setMode('lockdown')

module.exports = {

  //TODO: expects all features to return a promise
  feature: function (sut) {
    var fixture_lock = new ReadWriteLock()
    return function () {
      call_scope = this
      originalMode = nockBack.currentMode
      fixture_lock.writeLock(function (unlock) {
        nockBack.setMode('record');
        sut_response = Q.defer()
        nockBack(MD5(sut.toString())+'.json', function (nockDone) {
          sut.apply(call_scope, arguments)
          .then(function (response) {
            nockDone()
            nockBack.setMode(originalMode)
            unlock()
            sut_response.resolve(response)
          })
        });
      });
      return sut_response.promise
    }
  }
}
//module.exports = {
//
//  integration: function (sut) {
//    var fixture_lock = new ReadWriteLock()
//    var fixture_id = '12345'
//    return function () {
//      if (this._using_fixture) {
//        console.log('waiting for fixture')
//      } else {
//        console.log('recording fixture')
//        sut_response = Q.defer()
//        fixture_lock.writeLock(function (unlock) {
//          original_mode = nockBack.currentMode
//          //nockBack.setMode('record')
//          nockBack(fixture_id+'.json', function (nockDone) {
//            sut.apply(this, arguments)
//            .then(function (response) {
//              //nockBack.setMode(original_mode)
//              nockDone()
//              unlock()
//              sut_response.resolve(response)
//            }).done()
//          })
//        })
//        return sut_response.promise
//      }
//    }
//  },
//
//  feature: function (sut) {
//    return function () {
//      this._using_fixture = true
//      return sut.apply(this, arguments)
//    }
//  }
//}
//
