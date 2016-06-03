'use strict';

angular
  .module('gpAppApp')
  .directive('navigation', function ($location, $filter, Auth, PagesResource, editMode, availableItems) {
    return {
      'templateUrl' : 'components/navigation/navigation.html',
      'controllerAs' : '$ctrl',
      'restrict' : 'E',
      'replace' :true,
      'scope' : true,
      'link' : function(scope){
        scope.editMode = editMode;
        var basicContainer = $filter('filter')(availableItems.Container, { 'subtype' : 'base'})[0];

        scope.$watch(() => { return Auth.isLoggedIn(); }, function(loggedIn){
            if(loggedIn){
              scope.app = new PagesResource();
              scope.app.$get();
            } else {
              scope.app = undefined;
            }
        });

        scope.add = function(){
          scope.app.pages.push({});
        };

        scope.save = function(form){
          form.submitted = true;

          if(form.$valid){
            scope.app.$save();
          }
        };

        scope.remove = function(page){
          scope.app.pages.remove(page);
          scope.app.$save();
        };

        scope.isActive = function(route){
          return route === $location.path();
        };
      }
    };
  });
