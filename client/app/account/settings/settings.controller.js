'use strict';

class SettingsController {

  constructor(Auth) {
    this.Auth = Auth;
    this.errors = {};
  }

  changePassword(form) {
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('gpAppApp')
  .controller('SettingsController', SettingsController);
