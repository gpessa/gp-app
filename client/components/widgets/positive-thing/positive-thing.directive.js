
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
          'limit' : {
            type: 'number',
            title: 'Positive things to show'
          }
        });

        scope.addThing = (positiveThing, form) => {
          if (form.$valid) {
            var newThing = angular.copy(positiveThing.newThing);
            delete positiveThing.newThing;

            positiveThing.list.push(newThing);
            positiveThing
              .$save()
              .then(scope.get);
          }
        };

        scope.removeThing = (positiveThing, item) => {
          positiveThing.list.remove(item);
          positiveThing
            .$save();
        };

        scope.create = () => {
          var positiveThing = new PositiveThingResource({});
          positiveThing
            .$create()
            .then(scope.get);
        };

        scope.remove = (positiveThing) => {
          positiveThing
            .$remove()
            .then(scope.get);
        };

        scope.save = (positiveThing) => {
          positiveThing
            .$save();
        };

        scope.get = () => {
          item.toggleLoading();
          scope.positiveThings = PositiveThingResource.query(item.model.configuration, () => item.toggleLoading());
        };

        scope.get();
      }
  };
});
