'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var balanceCtrlStub = {
  index: 'balanceCtrl.index',
  show: 'balanceCtrl.show',
  create: 'balanceCtrl.create',
  update: 'balanceCtrl.update',
  destroy: 'balanceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var balanceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './balance.controller': balanceCtrlStub
});

describe('Balance API Router:', function() {

  it('should return an express router instance', function() {
    balanceIndex.should.equal(routerStub);
  });

  describe('GET /api/balances', function() {

    it('should route to balance.controller.index', function() {
      routerStub.get
        .withArgs('/', 'balanceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/balances/:id', function() {

    it('should route to balance.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'balanceCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/balances', function() {

    it('should route to balance.controller.create', function() {
      routerStub.post
        .withArgs('/', 'balanceCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/balances/:id', function() {

    it('should route to balance.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'balanceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/balances/:id', function() {

    it('should route to balance.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'balanceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/balances/:id', function() {

    it('should route to balance.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'balanceCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
