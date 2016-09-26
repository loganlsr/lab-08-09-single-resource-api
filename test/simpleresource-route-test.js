'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage.js');
const simpleresource = require('../model/simpleresource.js');

require('../server.js');

describe('testing resource routes', function(){
  var simpleresource = null;

  describe('testing POST /api/simpleresource', function(){
    it('should return a simpleresource', function (done){
      request.post('localhost:3000/api/simpleresource')
      .send({name: 'hello', content: 'good bye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        console.log('res.body', res.body);
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
        simpleresource = res.body;
        done();
      });
    });
  });

  describe('testing GET /api/simpleresource', function(){
    describe('with valid query', function(){
      before(done => {
        var simpleresource = {
          name: 'logan',
          content: 'good bye',
        };
        storage.createItem('simpleresource', simpleresource)
        .then( simpleresource => {
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        storage.deleteItem('logan', 'good bye')
        .then(() => done())
        .catch(err => done(err));
      });

      it('should return a simpleresource', function (done){
        request.get(`localhost:3000/api/simpleresource?id=${simpleresource.id}`)
        .send({name: 'hello', content: 'good bye'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('hello');
          expect(res.body.content).to.equal('good bye');
          done();
        });
      });
    });
  });

  describe('testing unregistered route', function(){
    it('should return the error code 404', function(done){
      request.get('localhost:3000/api/complexresource')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        expect(err).to.not.equal.null;
        done();
      });
    });
  });
});
