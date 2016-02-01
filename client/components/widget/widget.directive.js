'use strict';

angular.module('gpAppApp')
  .directive('widget', ($compile) => ({
    templateUrl: 'components/widget/widget.html',
    restrict: 'E',
    require: "^widgetContainer",
    // controller: 'WidgetController',
    // controllerAs: 'widget',
    // bindToController: true,
    scope: {
        widget: '=data'
    },
    link : function(scope, element, attrs, widgetContainer){
        var content = $compile('<div class="' + scope.widget.type + '-widget"></div>')(scope);
        element.find('.widget-body').append(content);
        
        scope.remove = function() {
            widgetService.remove(scope.widget, widgetContainer.showWidgetContainer);
        };
        
        scope.setting = function() {
            scope.conf = angular.copy(scope.widget || {});
            scope.widget.isSettingsOpen = !scope.widget.isSettingsOpen;
        };

        scope.$watch('widget.dimension', function(newVal, oldVal){
            element
                .removeClass('col-md-' + oldVal)
                .addClass('col-md-' + newVal);
        })

        scope.saveConfiguration = function(form){
            scope.$broadcast('schemaFormValidate');
            if (form.$valid) {
              scope.widget = scope.conf;
              widgetService.update(scope.widget);
              scope.widget.isSettingsOpen = false;
            }
        };

        scope.cancelConfiguration = function(form){
            scope.widget.isSettingsOpen = false;
        }

        scope.schema = {
            "type" : "object",
            "properties" : {
                "name" : {
                    "type" : "string",
                    "title" : "Name"
                },
                "dimension"  : {
                    "type" : "range",
                    "title" : "Dimension",
                    "enum" : [1,2,3,4,5,6,7,8,9,10,11,12]
                }
            }
        };

        scope.formcontrols = ["*", {
            type: "submit",
            title: "Save",
            style: 'btn btn-block btn-primary'
        },{
            type : "submit", 
            title : "Cancel",
            style: 'btn btn-block btn-secondary',
            onClick: "cancelConfiguration()"
        }];
    }
  }));