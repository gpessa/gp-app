'use strict';

describe('Directive: addItem', function() {

  // load the directive's module and view
  beforeEach(module('gpAppApp'));
  beforeEach(module('components/add-item/add-item.html'));

  var element, parentScope, elementScope, editMode;

  beforeEach(module(function ($provide) {

    $provide.constant('availableItems', {
      'Widget': [{
        'icon': 'fa fa-test',
        'type': 'widget',
        'subtype': 'test-subtype',
        'attributes': {
          'name': 'Test name'
        }
      }]
    });
  }));

  var compileDirective = function(template) {
    inject(function($compile) {
      element = angular.element(template);
      element = $compile(element)(parentScope);
      parentScope.$digest();
      elementScope = element.isolateScope();
    });
  };

  beforeEach(inject(function($rootScope) {
    parentScope = $rootScope.$new();
  }));

  describe('When editMode is enabled', function(){
    beforeEach(inject(function (_editMode_) {
      editMode = _editMode_;
      editMode.enabled = true;
    }));

    it('should have the add item bar visible', function() {
      compileDirective('<add-item></add-item>');
      expect(element.hasClass('ng-hide'))
        .to.equal(false);
    });

    it('should have at least a widget', function() {
      compileDirective('<add-item></add-item>');
      expect(element.find('.add-item-item').length)
        .to.be.at.least(1);
    });
  });

  describe('When editMode is enabled', function(){
    beforeEach(inject(function () {
      editMode.enabled = false;
    }));

    it('should have the add item bar visible', function() {
      compileDirective('<add-item></add-item>');
      expect(element.hasClass('ng-hide'))
        .to.equal(true);
    });
  });


});
