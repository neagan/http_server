'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');

var fileNum = 0

module.exports = function(router) {
  router.use(bodyparser.json());

  // Gets array of files
  router.get('/comments', function(req, res) {
    var dir = __dirname + '/data/';

    fs.readdir(dir, function(err, files) {
      if (err) {
        console.log(err);
      }
      files.toString() ? res.send(files.toString()) : res.send('No files exist');
    });
  });

  // Gets specific file contents
  router.get('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.readFile(file, function(err, data) {
      try {
        res.json(data.toString());
      } catch (err) {
        res.send('File not found');
      }
    });
  });

  // Posts contents to next filename
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

  // Removes specified file
  router.delete('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.unlink(file, function(err) {
      if (err) {
        console.log(err);
      }
      res.send('File ' + req.params.file + ' removed');
    });
  });
};
