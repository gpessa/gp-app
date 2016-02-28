'use strict';

var app = require('../..');
import request from 'supertest';

var newPortfolio;

describe('Portfolio API:', function() {

  describe('GET /api/portfolios', function() {
    var portfolios;

    beforeEach(function(done) {
      request(app)
        .get('/api/portfolios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          portfolios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      portfolios.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/portfolios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/portfolios')
        .send({
          name: 'New Portfolio',
          info: 'This is the brand new portfolio!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPortfolio = res.body;
          done();
        });
    });

    it('should respond with the newly created portfolio', function() {
      newPortfolio.name.should.equal('New Portfolio');
      newPortfolio.info.should.equal('This is the brand new portfolio!!!');
    });

  });

  describe('GET /api/portfolios/:id', function() {
    var portfolio;

    beforeEach(function(done) {
      request(app)
        .get('/api/portfolios/' + newPortfolio._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          portfolio = res.body;
          done();
        });
    });

    afterEach(function() {
      portfolio = {};
    });

    it('should respond with the requested portfolio', function() {
      portfolio.name.should.equal('New Portfolio');
      portfolio.info.should.equal('This is the brand new portfolio!!!');
    });

  });

  describe('PUT /api/portfolios/:id', function() {
    var updatedPortfolio;

    beforeEach(function(done) {
      request(app)
        .put('/api/portfolios/' + newPortfolio._id)
        .send({
          name: 'Updated Portfolio',
          info: 'This is the updated portfolio!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPortfolio = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPortfolio = {};
    });

    it('should respond with the updated portfolio', function() {
      updatedPortfolio.name.should.equal('Updated Portfolio');
      updatedPortfolio.info.should.equal('This is the updated portfolio!!!');
    });

  });

  describe('DELETE /api/portfolios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/portfolios/' + newPortfolio._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when portfolio does not exist', function(done) {
      request(app)
        .delete('/api/portfolios/' + newPortfolio._id)
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
