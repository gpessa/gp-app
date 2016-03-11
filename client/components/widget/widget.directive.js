'use strict';

angular.module('gpAppApp').directive('widget', ($compile, WidgetService) => {

  var schema = {
      'type' : 'object',
      'properties' : {
          'name' : {
              'type' : 'string',
              'title' : 'Name'
          },
          'dimension'  : {
              'type' : 'number',
              'title' : 'Dimension',
              'enum' : [1,2,3,4,5,6,7,8,9,10,11,12]
          }
      }
  };

  var formcontrols = ['*', {
      type: 'submit',
      title: 'Save',
      style: 'btn btn-block btn-primary'
  }];

  return {
    'templateUrl' : 'components/widget/widget.html',
    'restrict' : 'E',
    'require' : '^^container',
    'replace' :true,
    'scope' : {
        'data' : '=data'
    },
    'controller'  : function($scope){

      this.$scope = $scope;
      this.$scope.isWidgetLoading = false;

      this.extendConfigurationProperties = (property) => {
        this.$scope.schema.properties.configuration = {
          'type' : 'object',
          'title' : 'Preferences',
          'properties': {}
        };
        angular.extend(this.$scope.schema.properties.configuration.properties, property);
      };

      this.toggleLoading = () => {
        this.$scope.toggleLoading();
      };

      this.getConfiguration = () => {
        return this.$scope.data.configuration;
      };

      return this;
    },
    'link' : function(scope, element, attr, container){
      var template = $compile('<div class="' + scope.data.type + '-widget"></div>')(scope);
      angular.element(element[0].querySelector('.widget-body')).append(template);

      scope.schema = angular.copy(schema);
      scope.formcontrols = formcontrols;
      scope.isWidgetLoading = false;
      scope.isSettingsOpen = false;

      scope.toggleSettings = () => {
        scope.conf = angular.copy(scope.data || {});
        scope.isSettingsOpen = !scope.isSettingsOpen;
      };

      scope.toggleLoading = () => {
        scope.isWidgetLoading = !scope.isWidgetLoading;
      };

      scope.remove = () => {
        container.unlinkChild(scope.data);
        WidgetService.remove(scope.data);
      };

      scope.update = (form) => {
        scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
          scope.data = scope.conf;
          WidgetService.update(scope.data);
          scope.isSettingsOpen = false;
        }
      };
    }
  };
});
