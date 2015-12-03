'use strict';

var app = require('../..');
var request = require('supertest');

var newCigarette;

describe('Cigarette API:', function() {

  describe('GET /api/cigarettes', function() {
    var cigarettes;

    beforeEach(function(done) {
      request(app)
        .get('/api/cigarettes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          cigarettes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      cigarettes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/cigarettes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cigarettes')
        .send({
          name: 'New Cigarette',
          info: 'This is the brand new cigarette!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCigarette = res.body;
          done();
        });
    });

    it('should respond with the newly created cigarette', function() {
      newCigarette.name.should.equal('New Cigarette');
      newCigarette.info.should.equal('This is the brand new cigarette!!!');
    });

  });

  describe('GET /api/cigarettes/:id', function() {
    var cigarette;

    beforeEach(function(done) {
      request(app)
        .get('/api/cigarettes/' + newCigarette._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          cigarette = res.body;
          done();
        });
    });

    afterEach(function() {
      cigarette = {};
    });

    it('should respond with the requested cigarette', function() {
      cigarette.name.should.equal('New Cigarette');
      cigarette.info.should.equal('This is the brand new cigarette!!!');
    });

  });

  describe('PUT /api/cigarettes/:id', function() {
    var updatedCigarette

    beforeEach(function(done) {
      request(app)
        .put('/api/cigarettes/' + newCigarette._id)
        .send({
          name: 'Updated Cigarette',
          info: 'This is the updated cigarette!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCigarette = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCigarette = {};
    });

    it('should respond with the updated cigarette', function() {
      updatedCigarette.name.should.equal('Updated Cigarette');
      updatedCigarette.info.should.equal('This is the updated cigarette!!!');
    });

  });

  describe('DELETE /api/cigarettes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cigarettes/' + newCigarette._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cigarette does not exist', function(done) {
      request(app)
        .delete('/api/cigarettes/' + newCigarette._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
