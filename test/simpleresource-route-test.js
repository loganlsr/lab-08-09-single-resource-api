'use strict';

const request = require('superagent');
const expect = require('chai').expect;

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
        console.log('res.body', res.body)
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
        simpleresource = res.body;
        done();
      });
    });
  });
  describe('testing simpleresource routes', function(){
    describe('testing GET /api/simpleresource', function(){
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
});
