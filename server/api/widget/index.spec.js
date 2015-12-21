'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var widgetCtrlStub = {
  index: 'widgetCtrl.index',
  show: 'widgetCtrl.show',
  create: 'widgetCtrl.create',
  update: 'widgetCtrl.update',
  destroy: 'widgetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var widgetIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './widget.controller': widgetCtrlStub
});

describe('Widget API Router:', function() {

  it('should return an express router instance', function() {
    widgetIndex.should.equal(routerStub);
  });

  describe('GET /api/widgets', function() {

    it('should route to widget.controller.index', function() {
      routerStub.get
        .withArgs('/', 'widgetCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/widgets/:id', function() {

    it('should route to widget.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'widgetCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/widgets', function() {

    it('should route to widget.controller.create', function() {
      routerStub.post
        .withArgs('/', 'widgetCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/widgets/:id', function() {

    it('should route to widget.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'widgetCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/widgets/:id', function() {

    it('should route to widget.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'widgetCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/widgets/:id', function() {

    it('should route to widget.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'widgetCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
