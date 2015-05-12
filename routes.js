'use strict';

var bodyparser = require('body-parser');
var fs = require('fs');

var fileNum = 0;

module.exports = function(router) {
  router.use(bodyparser.json());

  // Gets array of files
  router.get('/comments', function(req, res) {
    var dir = __dirname + '/data/';

    fs.readdir(dir, function(err, files) {
      if (err) {
        console.log(err);
      }
      // Check if dir has any files
      if (files.toString()) {
        res.send(files.join(', '));
      } else {
        res.send('No files exist');
      }
    });
  });

  // Gets specific file contents
  router.get('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.readFile(file, function(err, data) {
      // Prevent server from crashing on bad file name
      try {
        res.json(JSON.parse(data));
      } catch (err) {
        res.send('File not found');
      }
    });
  });

  // Posts contents to next numerical filename
  router.post('/comments', function(req, res) {
    var file = __dirname + '/data/' +  fileNum + '.json';

    fs.writeFile(file, JSON.stringify(req.body, null, 2), function(err) {
      if (err) {
        console.log(err);
      } else {
        fileNum++;
        res.json(req.body);
      }
    });

  });

  // Post contents to specified file name
  router.post('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    // Check for .json in filename
    if (file.slice(-5) !== '.json') {
      file += '.json';
    }

    fs.writeFile(file, JSON.stringify(req.body, null, 2), function(err) {
      if (err) {
        console.log(err);
      } else {
        fileNum++;
        res.json(req.body);
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
    });

  });

  // Updates file
  router.patch('/comments/:file', function(req, res) {
    var file = __dirname + '/data/' + req.params.file;

    fs.readFile(file, function(err, data) {
      try {
        // Combine JSON objects
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
