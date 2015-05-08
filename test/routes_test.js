'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var fs = require('fs');

chai.use(chaihttp);

require('../server');

describe('http server with simple persistence', function() {

  // Need to delete file '0' before test or else invalid
  it('should be able to create a new comment', function(done) {

    // Set testfile location, combine with others?
    var testFile = __dirname.slice(0, -5) + '/data/0';

    chai.request('localhost:3000')
      .post('/api/comments')
      .send({name: 'test', email: 'test@test.com', comment: 'this is lame'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test');
        expect(fs.statSync(testFile).isFile()).to.be.true;
        done();
      });
  });

  it('should be able to retrieve a file', function(done) {

    var testFile = __dirname.slice(0, -5) + '/data/0';

    chai.request('localhost:3000')
      .get('/api/comments')
      .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
  });
});
