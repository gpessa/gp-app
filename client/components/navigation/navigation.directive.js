'use strict';

angular
  .module('gpAppApp')
  .directive('navigation', function ($location, $filter, Auth, PagesResource, editMode, availableItems, ItemResource) {
    return {
      'templateUrl' : 'components/navigation/navigation.html',
      'controllerAs' : '$ctrl',
      'restrict' : 'E',
      'replace' :true,
      'scope' : true,
      'link' : function(scope){
        scope.editMode = editMode;
        var simpleContainer = $filter('filter')(availableItems.Container, { 'subtype' : 'simple'})[0];

        scope.$watch(() => { return Auth.isLoggedIn(); }, (loggedIn) => {
            if(loggedIn){
              scope.app = new PagesResource();
              scope.app.$get();
            } else {
              scope.app = undefined;
            }
        });

        scope.add = () => {
          scope.app.pages.push(angular.copy(simpleContainer));
        };

        scope.save = (page) => {
          scope.app.$save()
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
