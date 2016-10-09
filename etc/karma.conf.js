require('babel-register');

var path = require('path');
var webpackConfig = require('./webpack.test.js');
webpackConfig.entry = {};

var appConfig = require(process.env.APP_CONFIG || './appConfig');

var srcPath = appConfig.srcPath;
var srcApp = appConfig.srcApp;
var testPath = appConfig.testPath;
var testSpecs = appConfig.testSpecs;
var appPath = appConfig.srcApp;
var templatesPath = appConfig.templatesPath;


module.exports = function (config) {
  'use strict';
  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    basePath: '.',

    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      srcApp,
      {pattern: testSpecs, watched: false}
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9001,

    // Start these browsers, currently available:
    // Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    reporters: [
      'progress',
      'junit',
      'kjhtml'
    ],

    junitReporter: {
      outputDir: './target/test-reports', // results will be saved as $outputDir/$browserName.xml
      suite: appConfig.testsuiteName || 'app'
    },

    coverageReporter: {
      dir: '../target/coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'}
      ]
    },

    preprocessors: {
      [templatesPath]: ['ng-html2js'],
      [srcApp]: ['webpack', 'sourcemap'],
      [testSpecs]: ['webpack', 'sourcemap']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: '.*/frontend/scripts/',
      prependPrefix: 'scripts/'
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        colors: true
      }
    },

    singleRun: false,

    colors: true,

    logLevel: config.LOG_INFO
  });
  config.proxies = {
    '/scripts/': 'http://localhost:' + config.port + '/base/src/main/frontend/scripts/'
  }
};
