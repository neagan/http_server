'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

require('../server');

describe('http server with simple persistence', function() {

  it('should be able to create a new comment', function(done) {
    chai.request('localhost:3000')
      .post('/api/comments')
      .send({name: 'test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test');
        done();
      });
  });
});
