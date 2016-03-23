'use strict';

angular.module('gpAppApp')
  .directive('navigation', function (PagesResource) {
    return {
      'templateUrl' : 'components/navigation/navigation.html',
      'controllerAs' : '$ctrl',
      'restrict' : 'E',
      'replace' :true,
      'scope' : true,
      'link' : function(scope, attrs, element){
        scope.app = new PagesResource();
        scope.app.$get()

        scope.add = function(){
          scope.app.pages.push({});
        }

        scope.save = function(form){
          form.submitted = true;

          if(form.$valid){
            scope.app.save();
          }
        }

        scope.remove = function(page){
          scope.app.pages.remove(page);
          scope.app.save();
        }

        scope.isActive = function(route){
          return route === this.$location.path();
        }
      }
    };
  });
