'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');

var fileNum = 0

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/comments', function(req, res) {
    var dir = __dirname + '/data/';

    // Returns array of files
    fs.readdir(dir, function(err, files) {
      if (err) {
        throw err;
      }
      res.send(files.toString());
    });
  });

  // Returns specific file contents
  router.get('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.readFile(file, function(err, data) {
      try {
        res.send(data.toString());
      } catch (err) {
        res.send('File not found');
      }
    });
  });

  router.post('/comments', function(req, res) {
    var file = __dirname + '/data/' +  fileNum + '.json';

    fs.writeFile(file, JSON.stringify(req.body, null, 2), function(err) {
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
