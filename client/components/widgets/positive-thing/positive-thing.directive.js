
'use strict';

angular
  .module('gpAppApp')
  .directive('widgetPositiveThing', function ($window, $interval, socket, PositiveThingResource) {
    return {
      'templateUrl' : 'components/widgets/positive-thing/positive-thing.html',
      'require' : '^^item',
      'restrict' : 'C',
      'scope'  : true,
      'link' : function(scope, element, attr, item) {
        item.addConfigurations({
          'Thing' : {
            type: 'number',
            title: 'Positive things to show'
          }
        });

        scope.addThing = function(positiveThing, form) {
          if (form.$valid) {
            var newThing = angular.copy(positiveThing.newThing);
            delete positiveThing.newThing;

            positiveThing.list.push(newThing);
            positiveThing
              .$save()
              .then(scope.get);
          }
        };

        scope.removeThing = function(positiveThing, item) {
          positiveThing.list.remove(item);
          positiveThing
            .$save();
        };

        scope.create = function() {
          var positiveThing = new PositiveThingResource({});
          positiveThing
            .$create()
            .then(scope.get);
        };

        scope.remove = function(positiveThing) {
          positiveThing
            .$remove()
            .then(scope.get);
        };

        scope.save = function(positiveThing) {
          positiveThing
            .$save();
        };

        scope.get = function() {
          item.toggleLoading();
          scope.positiveThings = PositiveThingResource.query({}, () => item.toggleLoading());
        };

        scope.get();
      }
  };
});
