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
      'show' : this.isAdmin()
    },{
      'title': 'Connect',
      'link' : '/connect',
      'icon' : 'fa fa fa-compress',
      'show' : this.isLoggedIn()
    },{
      'title': 'Settings',
      'link' : '/settings',
      'icon' : 'fa fa-cogs',
      'show' : this.isLoggedIn()
    },{
      'title': 'Logout',
      'link' : '/logout',
      'icon' : 'fa fa-sign-out',
      'show' : this.isLoggedIn()
    },{
      'title': 'Sign up',
      'link' : '/signup',
      'icon' : 'fa fa-user-plus',
      'show' : !this.isLoggedIn()
    },{
      'title': 'Login',
      'link' : '/login',
      'icon' : 'fa fa-sign-in',
      'show' : !this.isLoggedIn()
    }];
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('gpAppApp')
  .controller('NavbarController', NavbarController);
