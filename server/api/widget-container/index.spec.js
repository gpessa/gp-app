'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var widgetContainerCtrlStub = {
  index: 'widgetContainerCtrl.index',
  show: 'widgetContainerCtrl.show',
  create: 'widgetContainerCtrl.create',
  update: 'widgetContainerCtrl.update',
  destroy: 'widgetContainerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var widgetContainerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './widget-container.controller': widgetContainerCtrlStub
});

describe('WidgetContainer API Router:', function() {

  it('should return an express router instance', function() {
    widgetContainerIndex.should.equal(routerStub);
  });

  describe('GET /api/widget-containers', function() {

    it('should route to widgetContainer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'widgetContainerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/widget-containers/:id', function() {

    it('should route to widgetContainer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'widgetContainerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/widget-containers', function() {

    it('should route to widgetContainer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'widgetContainerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/widget-containers/:id', function() {

    it('should route to widgetContainer.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'widgetContainerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/widget-containers/:id', function() {

    it('should route to widgetContainer.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'widgetContainerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/widget-containers/:id', function() {

    it('should route to widgetContainer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'widgetContainerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
