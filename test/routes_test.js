'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var fs = require('fs');

chai.use(chaihttp);

require('../server');

describe('http server with simple persistence', function() {
  var testFile = __dirname.slice(0, -5) + '/data/0.json';

  // Need to delete file '0' before test or else invalid
  // Should probably be able to set filename
  it('should be able to create a new comment', function(done) {
    chai.request('localhost:3000')
      .post('/api/comments')
      .send({name: 'test', email: 'test@test.com', comment: 'this is test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test');
        expect(fs.existsSync(testFile)).to.be.true;
        done();
      });
  });

  // Only retrieves one file currently (0.json)
  it('should be able to retrieve a list of files', function(done) {
    chai.request('localhost:3000')
      .get('/api/comments')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.text).to.eql('0.json');
        done();
      });
  });

  // Checks that json object is returned
  it('should be able to retrieve the contents of a file', function(done) {
    chai.request('localhost:3000')
      .get('/api/comments/0.json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      });
  });

  it('should be able to replace a file\'s contents', function(done) {
    chai.request('localhost:3000')
      .put('/api/comments/0.json')
      .send({name: 'replace', email: 'replace@replace.com', comment: 'none'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('replace');
        done();
      });
  });

  it('should be able to delete a file', function(done) {
    chai.request('localhost:3000')
      .del('/api/comments/0.json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(fs.existsSync(testFile)).to.be.false;
        done();
      });
  });
});
