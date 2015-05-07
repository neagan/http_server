'use strict';

var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/notes', function(res, req) {

  });

  router.post('/notes', function(res, req) {

  });

  router.put('/notes', function(res, req) {

  });

  router.patch('/notes', function(res, req) {

  });

  // Delete is a reserved word?
  router.delete('/notes', function(res, req) {

  });
}
