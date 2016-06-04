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

        scope.save = function(page){
          if(!page.child){
            var item = new ItemResource(basicContainer);
            item.$create().then(function(){
              page.child = item._id;
              scope.app.$save();
            })
          } else {
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
