'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');

var fileNum = 0;

module.exports = function(router) {
  router.use(bodyparser.json());

  // Gets array of files *Working*
  router.get('/comments', function(req, res) {
    var dir = __dirname + '/data/';

    fs.readdir(dir, function(err, files) {
      if (err) {
        console.log(err);
      }
      files.toString() ? res.send(files.toString()) : res.send('No files exist');
    });
  });

  // Gets specific file contents *Working*
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

  // Posts contents to next filename *Partially Working*
  // Currently does not allow for file name setting
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

  // Replaces file with new content *Working*
  router.put('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.writeFile(file, JSON.stringify(req.body, null, 2), function(err) {
      if (err) {
        console.log(err);
      }
      res.json(req.body);
      res.end();
    });

  });

  // Updates file *Not Working*
  router.patch('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.readFile(file, function(err, data) {
      try {
        var combined = (function(o1, o2) {
          for (var key in o2) {
            o1[key] = o2[key];
          }
          return o1;
        })(JSON.parse(data), req.body);

        fs.writeFile(file, JSON.stringify(combined, null, 2), function(err) {
          if (err) {
            console.log(err);
          }
          res.json(combined);
          res.end();
        });
      } catch (err) {
        res.send('File not found');
      }
    });
  });

  // Removes specified file *Working*
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
