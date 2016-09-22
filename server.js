'use strict';

const http = require('http');

const Router = require('./lib/router.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

const server = http.createServer(router.route());

require('./route/simpleresource-router.js')(router);
// require('./route/list-router.js')(router);

server.listen(PORT, function(){
  console.log('server up :: ', PORT);
});
