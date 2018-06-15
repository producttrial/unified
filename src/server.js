'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const livecheck = require('./routes/livecheck');
const investor = require('./routes/investor');

const PORT = 8081;


module.exports = createServer();

function createServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Routes
  app.use('/livecheck', livecheck.router());
  app.use('/investors', investor.router());

  http.createServer(app).listen(PORT);

  console.log(`Service unified is listening on port ${PORT}`);

  return app;
}
