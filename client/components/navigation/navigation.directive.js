'use strict';

angular
  .module('gpAppApp')
  .directive('navigation', function ($location, $filter, PagesResource, editMode, availableItems) {
    return {
      'templateUrl' : 'components/navigation/navigation.html',
      'controllerAs' : '$ctrl',
      'restrict' : 'E',
      'replace' :true,
      'scope' : true,
      'link' : function(scope){
        scope.editMode = editMode;
        var simpleWrapper = $filter('filter')(availableItems.Wrapper, { 'subtype' : 'simple'})[0];

        scope.app = new PagesResource();
        scope.app.$get();

        scope.add = () => {
          scope.app.pages.push(angular.copy(simpleWrapper));
          scope.app.$save();
        };

        scope.save = () => {
          scope.app.$save();
        };

        scope.remove = (page) => {
          scope.app.pages.remove(page);
          scope.app.$save();
        };

        scope.isActive = (route) => {
          return route === $location.path();
        };
      }
    };
  });
