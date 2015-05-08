'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');

var fileNum = 0

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/comments', function(req, res) {

  });

  router.post('/comments', function(req, res) {

    var fileName = __dirname + '/data/' +  fileNum;

    fs.writeFile(fileName, JSON.stringify(req.body, null, 2), function(err) {
      if (err) {
        console.log(err);
      } else {
        fileNum++;
        res.json(req.body);
        res.end();
      }
    });

  });

  router.put('/comments', function(req, res) {

  });

  router.patch('/comments', function(req, res) {

  });

  // Delete is a reserved word?
  router.delete('/comments', function(req, res) {

  });
};
