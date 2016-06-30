'use strict';

angular
  .module('gpAppApp')
  .directive('settings', () => {
    return {
      'templateUrl' : 'components/settings/settings.html',
      'restrict' : 'E',
      'scope' : {
        'model' : '=',
        'schema' : '=',
        'onSave' : '='
      },
      'link' : function(scope){

        scope.formcontrols = ['*', {
          type: 'submit',
          title: 'Save',
          style: 'btn btn-block btn-primary'
        }];

        scope.save = (form) => {
          if (form.$valid) {
            scope.onSave();
          }
        };
      }
    };
  });
