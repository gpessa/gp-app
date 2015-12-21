'use strict';

angular.module('gpAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngMessages',
    'btford.socket-io',
    'ui.bootstrap',
    'validation.match',
    'chart.js',
    'html5.sortable'
  ])

  .factory("chartConfiguration", function() {
    return {
        options : {
          bezierCurve : false,
          scaleFontColor: '#fff',
          scaleLineColor: '#fff',
          resposinve:true,
          pointDotRadius : 2,
          scaleFontFamily : 'Roboto',
          tooltipFontFamily : 'Roboto',
          animation: false,
          showTooltips: false,
          scaleStepWidth : 1,
          datasetStrokeWidth : 1,
          showXAxisLabel:false,
          maintainAspectRatio: true
        },
        colours : [{
          fillColor: 'rgba(49, 147, 198, 0.3)',
          pointColor: 'rgba(27, 188, 157, 1)',
          pointHighlightFill: 'rgba(26, 188, 156, 1)',
          pointHighlightStroke: 'rgba(26, 188, 156, 1)',
          pointStrokeColor: 'rgba(65, 215, 185, 1)',
          strokeColor: 'rgba(255, 255, 255, 1)'
        }]
    }
  })

  .config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function($rootScope, $q, $cookies, $location) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and the user is not logged in
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (next.authenticate) {
        Auth.isLoggedIn(function(loggedIn) {
          if (!loggedIn) {
            event.preventDefault();
            $location.path('/login');
          }
        });
      }
    });
  });
