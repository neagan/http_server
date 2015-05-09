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
      // Check if dir has any files
      files.toString() ? res.send('Current files:\n'
                              + files.toString() + '\nSpecify file name in url')
                        : res.send('No files exist');
    });
  });

  // Gets specific file contents *Working*
  router.get('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.readFile(file, function(err, data) {
      // Prevent server from crashing on bad file name
      try {
        res.send(data.toString());
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

  // Post contents to specified file name
  router.post('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    // Check for .json in filename
    file.slice(-5) !== '.json' ? file += '.json' : file;

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

  // Replaces file with new content
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

  // Updates file
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
