'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var portfolioCtrlStub = {
  index: 'portfolioCtrl.index',
  show: 'portfolioCtrl.show',
  create: 'portfolioCtrl.create',
  update: 'portfolioCtrl.update',
  destroy: 'portfolioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var portfolioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './portfolio.controller': portfolioCtrlStub
});

describe('Portfolio API Router:', function() {

  it('should return an express router instance', function() {
    portfolioIndex.should.equal(routerStub);
  });

  describe('GET /api/portfolios', function() {

    it('should route to portfolio.controller.index', function() {
      routerStub.get
        .withArgs('/', 'portfolioCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/portfolios/:id', function() {

    it('should route to portfolio.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'portfolioCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/portfolios', function() {

    it('should route to portfolio.controller.create', function() {
      routerStub.post
        .withArgs('/', 'portfolioCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/portfolios/:id', function() {

    it('should route to portfolio.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'portfolioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/portfolios/:id', function() {

    it('should route to portfolio.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'portfolioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/portfolios/:id', function() {

    it('should route to portfolio.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'portfolioCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
