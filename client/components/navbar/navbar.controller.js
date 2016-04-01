'use strict';

class NavbarController {

  constructor($location, Auth) {
    this.isCollapsed = true;
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.menu = [{
      'title': 'Admin',
      'link' : '/admin',
      'icon' : 'fa fa-users',
      'show' : function(){
        return Auth.isAdmin();
      }
    },{
      'title': 'Link',
      'link' : '/link',
      'icon' : 'fa fa fa-compress',
      'show' : function(){
        return Auth.isLoggedIn();
      }
    },{
      'title': 'Settings',
      'link' : '/settings',
      'icon' : 'fa fa-cogs',
      'show' : function(){
        return Auth.isLoggedIn();
      }
    },{
      'title': 'Sign up',
      'link' : '/signup',
      'icon' : 'fa fa-user-plus',
      'show' : function(){
        return !Auth.isLoggedIn();
      }
    },{
      'title': 'Login',
      'link' : '/login',
      'icon' : 'fa fa-sign-in',
      'show' : function(){
        return !Auth.isLoggedIn();
      }
    },{
      'title': 'Logout',
      'link' : '/logout',
      'icon' : 'fa fa-sign-out',
      'show' : function(){
        return Auth.isLoggedIn();
      }
    }];
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('gpAppApp')
  .controller('NavbarController', NavbarController);
