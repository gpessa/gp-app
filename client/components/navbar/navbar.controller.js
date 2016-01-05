'use strict';

angular.module('gpAppApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [/**{
      'title': 'Home',
      'link': '/'
    }**/];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
