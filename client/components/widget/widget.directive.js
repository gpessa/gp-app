'use strict';

angular.module('gpAppApp').directive('widget', ($compile, WidgetService) => {

  var schema = {
      "type" : "object",
      "properties" : {
          "name" : {
              "type" : "string",
              "title" : "Name"
          },
          "dimension"  : {
              "type" : "number",
              "title" : "Dimension",
              "enum" : [1,2,3,4,5,6,7,8,9,10,11,12]
          }
      }
  };

  var formcontrols = ["*", {
      type: "submit",
      title: "Save",
      style: 'btn btn-block btn-primary'
  },{
      type : "submit",
      title : "Cancel",
      style: 'btn btn-block btn-secondary',
      onClick: "toggleSettings()"
  }];

  return {
    templateUrl: 'components/widget/widget.html',
    restrict: 'E',
    require: "^^widgetContainer",
    scope: {
        widget: '=data'
    },
    controller : function($scope){
      this.extendConfigurationProperties = function(property){
        $scope.schema.properties.configuration = {
          "type" : "object",
          "title" : "Preferences",
          "properties": {}
        };
        angular.extend($scope.schema.properties.configuration.properties, property);
      }

      this.toggleLoading = function(){
        $scope.isWidgetLoading = !$scope.isWidgetLoading;
      }
    },
    link : function(scope, element, attrs, widgetContainer){
      var dom = $compile('<div class="' + scope.widget.type + '-widget"></div>')(scope);
      angular.element(element[0].querySelector('.widget-body')).append(dom);

      scope.$watch('widget.dimension', function(newVal, oldVal){
          element.removeClass('col-md-' + oldVal)
                 .addClass('col-md-' + newVal);
      });

      scope.isWidgetLoading = false;
      scope.schema = angular.copy(schema);
      scope.formcontrols = formcontrols;

      scope.removeWidget = function() {
          WidgetService.remove(scope.widget, function(){
            widgetContainer.refreshContainer()
          });
      };

      scope.toggleSettings = function() {
          scope.conf = angular.copy(scope.widget || {});
          scope.isSettingsOpen = !scope.isSettingsOpen;
      };

      scope.saveSettings = function(form){
          scope.$broadcast('schemaFormValidate');
          if (form.$valid) {
            scope.widget = scope.conf;
            WidgetService.update(scope.widget);
            scope.isSettingsOpen = false;
          }
      };
    }
  }
});
