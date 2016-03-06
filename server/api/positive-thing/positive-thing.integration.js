'use strict';

var app = require('../..');
import request from 'supertest';

var newPositiveThing;

describe('PositiveThing API:', function() {

  describe('GET /api/positive-things', function() {
    var positiveThings;

    beforeEach(function(done) {
      request(app)
        .get('/api/positive-things')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          positiveThings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      positiveThings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/positive-things', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/positive-things')
        .send({
          name: 'New PositiveThing',
          info: 'This is the brand new positiveThing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPositiveThing = res.body;
          done();
        });
    });

    it('should respond with the newly created positiveThing', function() {
      newPositiveThing.name.should.equal('New PositiveThing');
      newPositiveThing.info.should.equal('This is the brand new positiveThing!!!');
    });

  });

  describe('GET /api/positive-things/:id', function() {
    var positiveThing;

    beforeEach(function(done) {
      request(app)
        .get('/api/positive-things/' + newPositiveThing._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          positiveThing = res.body;
          done();
        });
    });

    afterEach(function() {
      positiveThing = {};
    });

    it('should respond with the requested positiveThing', function() {
      positiveThing.name.should.equal('New PositiveThing');
      positiveThing.info.should.equal('This is the brand new positiveThing!!!');
    });

  });

  describe('PUT /api/positive-things/:id', function() {
    var updatedPositiveThing;

    beforeEach(function(done) {
      request(app)
        .put('/api/positive-things/' + newPositiveThing._id)
        .send({
          name: 'Updated PositiveThing',
          info: 'This is the updated positiveThing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPositiveThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPositiveThing = {};
    });

    it('should respond with the updated positiveThing', function() {
      updatedPositiveThing.name.should.equal('Updated PositiveThing');
      updatedPositiveThing.info.should.equal('This is the updated positiveThing!!!');
    });

  });

  describe('DELETE /api/positive-things/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/positive-things/' + newPositiveThing._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when positiveThing does not exist', function(done) {
      request(app)
        .delete('/api/positive-things/' + newPositiveThing._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
