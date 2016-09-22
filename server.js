'use strict';

const http = require('http');

const SimpleResource = require('./model/simple-resource.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/simple-resource', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('note', req.url.query.id)
    .then( note => {
      res.writeHead( 200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(SimpleResource));
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
    var note = new Note(req.body.name, req.body.conent);
    storage.createItem('note', note);
    res.writeHead( 200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(note));
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

const server = http.createServer(router.route());
server.listen(PORT, function(){
  console.log('server up :: ', PORT);
});
