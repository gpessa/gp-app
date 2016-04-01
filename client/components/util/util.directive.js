'use strict';

angular
  .module('gpAppApp')
  .directive('val', ($filter) => {
    return {
      'template' : '<span ng-if="value"><i class="dot" ng-class="cls"></i> {{value}}</span>',
      'restrict' : 'A',
      'scope' : {
        val: '=',
        isPositive: '=',
        filter: '@'
      },
      'link': function(scope) {

        scope.$watch('val', function(value) {
          if (value) {
            if (!angular.isUndefined(scope.isPositive)) {
              scope.cls = scope.isPositive ? 'dot-success' : 'dot-danger';
            } else {
              scope.cls = (value > 0) ? 'dot-success' : 'dot-danger';
            }

            switch (scope.filter) {
              case 'currency':
                scope.value = $filter('currency')(value);
                break;

              case 'percentage':
                scope.value = $filter('number')(value * 100, 2) + ' %';
                break;

              default:
                scope.value = value;
            }
          }
        });
      }
    };
  })

  .directive('subMenuBtn', () => {
    return {
      /*jshint multistr: true */
      'template' : '<span uib-dropdown dropdown-append-to-body>\
                      <a class="btn btn-link-light sub-menu-btn_toggle" icon="fa fa-ellipsis-h" uib-dropdown-toggle title="Show actions menu" on-toggle="toggled(open)"></a>\
                      <ul class="sub-menu-btn_dropdown" uib-dropdown-menu ng-transclude></ul>\
                    </span>',
      'restrict': 'C',
      'transclude': true,
      'replace': true
    };
  })

  .directive('icon', () => {
    return {
      'restrict': 'A',
      'link': function(scope, element, attr) {
        if (attr.icon) {
          element.prepend('<i class="fa-fw ' + attr.icon + '"></i>');
        }
      }
    };
  })

  .filter('offset', function() {
    return function(input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  })

  .directive('form', function() {
    return {
      'restrict' : 'E',
      'require' : 'form',
      'link' : function(scope, element, attrs, formCtrl) {
        var form = element[0];
        var groups = form.querySelectorAll('.form-group');

        [].forEach.call(groups, function(group) {
          var inputs = group.querySelectorAll('input[ng-model],textarea[ng-model],select[ng-model]');

          [].forEach.call(inputs, function(input) {

            scope.$watch(function() {
              return angular.element(input).hasClass('ng-invalid');
            }, function(isInvalid) {
              angular.element(group).toggleClass('has-error', (isInvalid && formCtrl.$submitted));
            });

            scope.$watch(function() {
              return formCtrl.$submitted && angular.element(input).hasClass('ng-invalid');
            }, function(isInvalid) {
              angular.element(group).toggleClass('has-error', (isInvalid && formCtrl.$submitted));
            });

          });
        });
      }
    };
  })
;
