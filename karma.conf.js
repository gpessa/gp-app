// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/Chart.js/Chart.js',
      'client/bower_components/angular-chart.js/dist/angular-chart.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/html5-sortable-angularjs/lib/html5-sortable.js',
      'client/bower_components/tv4/tv4.js',
      'client/bower_components/objectpath/lib/ObjectPath.js',
      'client/bower_components/angular-schema-form/dist/schema-form.js',
      'client/bower_components/angular-schema-form/dist/bootstrap-decorator.js',
      'client/bower_components/angular-schema-form-bootstrap/bootstrap-decorator.min.js',
      'client/bower_components/ngGeolocation/ngGeolocation.js',
      'client/bower_components/angular-i18n/angular-locale_it-it.js',
      'client/bower_components/ifvisible.js/src/ifvisible.js',
      'client/bower_components/angular-click-outside/clickoutside.directive.js',
      'client/bower_components/angular-elastic-input/dist/angular-elastic-input.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'node_modules/socket.io-client/socket.io.js',
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': 'babel'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
