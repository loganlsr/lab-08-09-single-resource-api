'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const SimpleResource = require('../model/simpleresource.js');

module.exports = function(router){

  router.get('/api/simpleresource', function(req, res){
    if (req.url.query.id) {
      storage.fetchItem('simpleresource', req.url.query.id)
      .then( simpleresource => {
        response.sendJSON(res, 200, simpleresource);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/simpleresource', function(req, res){
    try {
      var simpleresource = new SimpleResource(req.body.name, req.body.content);
      console.log('test test one two three', simpleresource);
      storage.createItem('simpleresource', simpleresource)
      .then( resource => {
        response.sendJSON(res, 200, resource);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 500, 'server error');
      });

    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('api/simple-resource', function(req, res) {
    if(req.url.query.id){
      storage.deleteItem('simpleresource', req.url.query.id)
      .then( () => {
        res.writeHead(204);
        res.end();
      })
      .catch( (err) => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
    } else {
      response.sendText(res, 400, 'bad request');
    }
  });
};
