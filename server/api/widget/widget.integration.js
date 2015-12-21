'use strict';

var app = require('../..');
var request = require('supertest');

var newWidget;

describe('Widget API:', function() {

  describe('GET /api/widgets', function() {
    var widgets;

    beforeEach(function(done) {
      request(app)
        .get('/api/widgets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          widgets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      widgets.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/widgets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/widgets')
        .send({
          name: 'New Widget',
          info: 'This is the brand new widget!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newWidget = res.body;
          done();
        });
    });

    it('should respond with the newly created widget', function() {
      newWidget.name.should.equal('New Widget');
      newWidget.info.should.equal('This is the brand new widget!!!');
    });

  });

  describe('GET /api/widgets/:id', function() {
    var widget;

    beforeEach(function(done) {
      request(app)
        .get('/api/widgets/' + newWidget._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          widget = res.body;
          done();
        });
    });

    afterEach(function() {
      widget = {};
    });

    it('should respond with the requested widget', function() {
      widget.name.should.equal('New Widget');
      widget.info.should.equal('This is the brand new widget!!!');
    });

  });

  describe('PUT /api/widgets/:id', function() {
    var updatedWidget

    beforeEach(function(done) {
      request(app)
        .put('/api/widgets/' + newWidget._id)
        .send({
          name: 'Updated Widget',
          info: 'This is the updated widget!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWidget = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWidget = {};
    });

    it('should respond with the updated widget', function() {
      updatedWidget.name.should.equal('Updated Widget');
      updatedWidget.info.should.equal('This is the updated widget!!!');
    });

  });

  describe('DELETE /api/widgets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/widgets/' + newWidget._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when widget does not exist', function(done) {
      request(app)
        .delete('/api/widgets/' + newWidget._id)
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
