'use strict';
angular.module('gpAppApp').directive('widget', function($compile, widgetService) {
    return {
        templateUrl: 'components/widget/widget.html',
        restrict: 'E',
        require: "^widgetContainer",
        scope: {
            widget: '=data'
        },
        link: function(scope, element, attrs, widgetContainer) {
            scope.widget.isSettingsOpen = false;
            scope.widget.loading = true;
            
            var template = '<div class="' + scope.widget.type + '-widget"></div>';
            var content = $compile(template)(scope);
            element.find('.widget-body').append(content);
            
            scope.remove = function() {
                widgetService.remove(scope.widget, widgetContainer.showWidgetContainer);
            };
            
            scope.setting = function() {
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

            scope.conf = angular.copy(scope.widget || {});

            scope.schema = {
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

            scope.formcontrols = [
            "*", {
                type: "submit",
                title: "Save",
                style: 'btn btn-block btn-primary'
            },{
                type : "submit", 
                title : "Cancel",
                style: 'btn btn-block btn-link',
                onClick: "cancelConfiguration()"
            }];
        }
    };
});