'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cigaretteCtrlStub = {
  index: 'cigaretteCtrl.index',
  show: 'cigaretteCtrl.show',
  create: 'cigaretteCtrl.create',
  update: 'cigaretteCtrl.update',
  destroy: 'cigaretteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cigaretteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cigarette.controller': cigaretteCtrlStub
});

describe('Cigarette API Router:', function() {

  it('should return an express router instance', function() {
    cigaretteIndex.should.equal(routerStub);
  });

  describe('GET /api/cigarettes', function() {

    it('should route to cigarette.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cigaretteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/cigarettes/:id', function() {

    it('should route to cigarette.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'cigaretteCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/cigarettes', function() {

    it('should route to cigarette.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cigaretteCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/cigarettes/:id', function() {

    it('should route to cigarette.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'cigaretteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cigarettes/:id', function() {

    it('should route to cigarette.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'cigaretteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cigarettes/:id', function() {

    it('should route to cigarette.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cigaretteCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
