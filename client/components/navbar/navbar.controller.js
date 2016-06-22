'use strict';

class NavbarController {

  constructor(Auth) {
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.menu = [{
      'title': 'Admin',
      'state' : 'admin',
      'icon' : 'fa fa-users',
      'show' : function(){
        return Auth.isAdmin();
      }
    },{
      'title': 'Link',
      'state' : 'link',
      'icon' : 'fa fa fa-compress',
      'show' : function(){
        return Auth.isLoggedIn();
      }
    },{
      'title': 'Settings',
      'state' : 'settings',
      'icon' : 'fa fa-cogs',
      'show' : function(){
        return Auth.isLoggedIn();
      }
    },{
      'title': 'Sign up',
      'state' : 'signup',
      'icon' : 'fa fa-user-plus',
      'show' : function(){
        return !Auth.isLoggedIn();
      }
    },{
      'title': 'Login',
      'state' : 'login',
      'icon' : 'fa fa-sign-in',
      'show' : function(){
        return !Auth.isLoggedIn();
      }
    },{
      'title': 'Logout',
      'state' : 'logout',
      'icon' : 'fa fa-sign-out',
      'show' : function(){
        return Auth.isLoggedIn();
      }
    }];
  }

}

angular.module('gpAppApp')
  .controller('NavbarController', NavbarController);
