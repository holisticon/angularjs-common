const path = require('path');
const util = require('util');
const debugLog = util.debuglog('@holisticon/angularjs-common/helpers');
const defaultAppConfig = require('./appConfig');
const appConfig = require(process.env.APP_CONFIG || './appConfig');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server$/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}

function getAppConfig() { /*eslint complexity: [error, 23]*/

  var basePath = path.resolve(process.cwd()),
    appName = appConfig.appName || defaultAppConfig.appName,
    srcPath = appConfig.srcPath || defaultAppConfig.srcPath,
    testPath = appConfig.testPath || defaultAppConfig.testPath,
    sourceResolved = path.resolve(basePath, srcPath),
    testPathResolved = path.resolve(basePath, testPath),
    templatesPath = appConfig.templatesPath || defaultAppConfig.templatesPath,
    distPath = appConfig.distPath || defaultAppConfig.distPath,
    genPath = appConfig.genPath || defaultAppConfig.genPath,
    templatesResolved = path.resolve(basePath, templatesPath),
    appPath = appConfig.appPath || defaultAppConfig.appPath;
  var indexFiles = defaultAppConfig.indexFiles;
  if (appConfig.indexFiles) {
    indexFiles = appConfig.indexFiles;
  } else {
    // refresh with current source path
    indexFiles[0].template = path.resolve(srcPath, 'index.html');
  }
  var config = {
    srcPath: srcPath,
    testPath: testPath,
    appPath: appPath || srcPath + '/' + appName,
    src: sourceResolved,
    test: testPathResolved,
    templates: templatesResolved || srcPath + '/' + templatesPath,
    app: path.resolve(basePath, appPath),
    templatesPath: templatesPath,
    srcSASS: appConfig.srcSASS || path.resolve(sourceResolved, 'scss'),
    srcI18N: appConfig.srcI18N || path.resolve(sourceResolved, 'app', 'i18n'),
    srcIMG: appConfig.srcIMG || path.resolve(sourceResolved, 'img'),
    modulesPath: appConfig.modulesPath || path.resolve(basePath, 'node_modules'),
    testSpecs: testPath + '/specs/**/*.js',
    distPath: distPath,
    dist: appConfig.dist || path.resolve(distPath),
    genPath: genPath,
    indexFiles: indexFiles,
    gen: appConfig.gen || path.resolve(genPath),
    chunks: appConfig.chunks || defaultAppConfig.chunks,
    globals: appConfig.globals || defaultAppConfig.globals,
    entry: appConfig.entry || defaultAppConfig.entry,
    mangle: appConfig.mangle || defaultAppConfig.mangle,
    proxy: appConfig.proxy || defaultAppConfig.proxy,
    title: appConfig.title || defaultAppConfig.title
  };
  debugLog('Using following appConfig:', config);
  return config;
}

exports.getAppConfig = getAppConfig;
exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.checkNodeImport = checkNodeImport;
