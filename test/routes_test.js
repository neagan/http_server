'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var fs = require('fs');

chai.use(chaihttp);

require('../server');

describe('http server with simple persistence', function() {
  var testFile = __dirname.slice(0, -5) + '/data/test.json';

  it('should be able to create a new comment by filename', function(done) {
    chai.request('localhost:3000')
      .post('/api/comments/test')
      .send({name: 'test', email: 'test@test.com', comment: 'this is test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test');
        expect(fs.existsSync(testFile)).to.eql(true);
        done();
      });
  });

  it('should be able to retrieve a list of files', function(done) {
    chai.request('localhost:3000')
      .get('/api/comments')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.text).to.eql('test.json');
        done();
      });
  });

  it('should be able to retrieve the contents of a file', function(done) {
    chai.request('localhost:3000')
      .get('/api/comments/test.json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.name).to.eql('test');
        done();
      });
  });

  it('should be able to update a file\'s contents', function(done) {
    chai.request('localhost:3000')
      .patch('/api/comments/test.json')
      .send({name: 'update'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('update');
        expect(res.body.email).to.eql('test@test.com');
        expect(res.body.comment).to.eql('this is test');
        done();
      });
  });

  it('should be able to replace a file\'s contents', function(done) {
    chai.request('localhost:3000')
      .put('/api/comments/test.json')
      .send({name: 'replace all'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('replace all');
        expect(res.body.email).to.eql(undefined);
        expect(res.body.comment).to.eql(undefined);
        done();
      });
  });

  it('should be able to delete a file', function(done) {
    chai.request('localhost:3000')
      .del('/api/comments/test.json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(fs.existsSync(testFile)).to.eql(false);
        done();
      });
  });
});
