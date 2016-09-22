'use strict';

const http = require('http');

const SimpleResource = require('./model/simpleresource.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/simpleresource', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('simpleresource', req.url.query.id)
    .then( simpleresource => {
      res.writeHead( 200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(simpleresource));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

router.post('/api/simple-resource', function(req, res){
  try{
    var simpleresource = new SimpleResource(req.body.name, req.body.conent);
    storage.createItem('simple resource', simpleresource);
    res.writeHead( 200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(simpleresource));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'things happened', method: req.method, body: req.body}));
  res.end();
});

router.delete('api/simple-resource', function(req, res) {
  storage.deleteItem(req.url.query.id);
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server up :: ', PORT);
});
