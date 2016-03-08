
'use strict';

angular.module('gpAppApp')
  .directive('positiveThingWidget', function ($window, $interval, socket, positiveThingService) {
    return {
      'templateUrl' : 'components/widgets/positive-thing/positive-thing.html',
      'restrict' : 'C',
      'require' : '^^widget',
      'scope' : true,
      'link' : function(scope, element, attr, widget) {
        widget.extendConfigurationProperties({
          'Thing' : {
            type: 'number',
            title: 'Positive things to show'
          }
        });

        scope.get = function(){
          widget.toggleLoading();
          positiveThingService.get()
            .then((positiveThings) => {
              scope.positiveThings = positiveThings;
              socket.syncUpdates('positive-things');
            })
            .catch(error => {
              scope.error = error;
            })
            .finally(widget.toggleLoading);
        };

        scope.create = function(){
          positiveThingService.create().then(scope.get);
        };

        scope.update = function(positiveThing){
          positiveThingService.update(positiveThing);
        };

        scope.remove = function(positiveThing){
          positiveThingService.remove(positiveThing).then(scope.get);
        };

        scope.addThing = function(positiveThing, form){
          form.submitted = true;

          if(form.$valid){
            var newThing = angular.copy(positiveThing.newThing);
            delete positiveThing.newThing;
            positiveThing.list.push(newThing);
            positiveThingService.update(positiveThing).then(scope.get);

            form.submitted = false;
          }
        };

        scope.removeThing = function(positiveThing, thing){
          positiveThing.list.remove(thing);
          portfolioService.update(positiveThing).then(scope.get);
        };

        scope.configuration = widget.getConfiguration();

        scope.get();
      }
  };
});
