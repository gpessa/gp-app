'use strict';

var app = require('../..');
import request from 'supertest';

var newBalance;

describe('Balance API:', function() {

  describe('GET /api/balances', function() {
    var balances;

    beforeEach(function(done) {
      request(app)
        .get('/api/balances')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          balances = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      balances.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/balances', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/balances')
        .send({
          name: 'New Balance',
          info: 'This is the brand new balance!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBalance = res.body;
          done();
        });
    });

    it('should respond with the newly created balance', function() {
      newBalance.name.should.equal('New Balance');
      newBalance.info.should.equal('This is the brand new balance!!!');
    });

  });

  describe('GET /api/balances/:id', function() {
    var balance;

    beforeEach(function(done) {
      request(app)
        .get('/api/balances/' + newBalance._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          balance = res.body;
          done();
        });
    });

    afterEach(function() {
      balance = {};
    });

    it('should respond with the requested balance', function() {
      balance.name.should.equal('New Balance');
      balance.info.should.equal('This is the brand new balance!!!');
    });

  });

  describe('PUT /api/balances/:id', function() {
    var updatedBalance;

    beforeEach(function(done) {
      request(app)
        .put('/api/balances/' + newBalance._id)
        .send({
          name: 'Updated Balance',
          info: 'This is the updated balance!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBalance = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBalance = {};
    });

    it('should respond with the updated balance', function() {
      updatedBalance.name.should.equal('Updated Balance');
      updatedBalance.info.should.equal('This is the updated balance!!!');
    });

  });

  describe('DELETE /api/balances/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/balances/' + newBalance._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when balance does not exist', function(done) {
      request(app)
        .delete('/api/balances/' + newBalance._id)
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
