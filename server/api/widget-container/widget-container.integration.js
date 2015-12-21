'use strict';

var app = require('../..');
var request = require('supertest');

var newWidgetContainer;

describe('WidgetContainer API:', function() {

  describe('GET /api/widget-containers', function() {
    var widgetContainers;

    beforeEach(function(done) {
      request(app)
        .get('/api/widget-containers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          widgetContainers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      widgetContainers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/widget-containers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/widget-containers')
        .send({
          name: 'New WidgetContainer',
          info: 'This is the brand new widgetContainer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newWidgetContainer = res.body;
          done();
        });
    });

    it('should respond with the newly created widgetContainer', function() {
      newWidgetContainer.name.should.equal('New WidgetContainer');
      newWidgetContainer.info.should.equal('This is the brand new widgetContainer!!!');
    });

  });

  describe('GET /api/widget-containers/:id', function() {
    var widgetContainer;

    beforeEach(function(done) {
      request(app)
        .get('/api/widget-containers/' + newWidgetContainer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          widgetContainer = res.body;
          done();
        });
    });

    afterEach(function() {
      widgetContainer = {};
    });

    it('should respond with the requested widgetContainer', function() {
      widgetContainer.name.should.equal('New WidgetContainer');
      widgetContainer.info.should.equal('This is the brand new widgetContainer!!!');
    });

  });

  describe('PUT /api/widget-containers/:id', function() {
    var updatedWidgetContainer

    beforeEach(function(done) {
      request(app)
        .put('/api/widget-containers/' + newWidgetContainer._id)
        .send({
          name: 'Updated WidgetContainer',
          info: 'This is the updated widgetContainer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWidgetContainer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWidgetContainer = {};
    });

    it('should respond with the updated widgetContainer', function() {
      updatedWidgetContainer.name.should.equal('Updated WidgetContainer');
      updatedWidgetContainer.info.should.equal('This is the updated widgetContainer!!!');
    });

  });

  describe('DELETE /api/widget-containers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/widget-containers/' + newWidgetContainer._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when widgetContainer does not exist', function(done) {
      request(app)
        .delete('/api/widget-containers/' + newWidgetContainer._id)
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
