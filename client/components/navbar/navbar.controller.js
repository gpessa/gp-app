'use strict';

class NavbarController {

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.menu = [{
      'title': 'Dashboard',
      'link' : '/',
      'icon' : 'fa fa-tachometer',
      'show' : this.isLoggedIn()
    },{
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
