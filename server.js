'use strict';

var express = require('express');
var app = express();

var router = express.Router();

require('./routes')(router);

app.use('/api', router);

app.listen(3000, function() {
  console.log('Server has started');
});
