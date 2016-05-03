'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
  }

  login(form) {

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$location.path('/');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('gpAppApp')
  .controller('LoginController', LoginController);
