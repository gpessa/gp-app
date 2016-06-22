'use strict';

class LoginController {

  constructor(Auth, $state) {
    this.errors = {};

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to page
          this.$state.go('page');
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
  
}

angular.module('gpAppApp')
  .controller('LoginController', LoginController);
