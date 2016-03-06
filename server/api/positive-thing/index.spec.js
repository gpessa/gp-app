'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var positiveThingCtrlStub = {
  index: 'positiveThingCtrl.index',
  show: 'positiveThingCtrl.show',
  create: 'positiveThingCtrl.create',
  update: 'positiveThingCtrl.update',
  destroy: 'positiveThingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var positiveThingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './positive-thing.controller': positiveThingCtrlStub
});

describe('PositiveThing API Router:', function() {

  it('should return an express router instance', function() {
    positiveThingIndex.should.equal(routerStub);
  });

  describe('GET /api/positive-things', function() {

    it('should route to positiveThing.controller.index', function() {
      routerStub.get
        .withArgs('/', 'positiveThingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/positive-things/:id', function() {

    it('should route to positiveThing.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'positiveThingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/positive-things', function() {

    it('should route to positiveThing.controller.create', function() {
      routerStub.post
        .withArgs('/', 'positiveThingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/positive-things/:id', function() {

    it('should route to positiveThing.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'positiveThingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/positive-things/:id', function() {

    it('should route to positiveThing.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'positiveThingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/positive-things/:id', function() {

    it('should route to positiveThing.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'positiveThingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
