var path = require('path');
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

function getAppConfig() { /*eslint complexity: ["error", 22]*/

  var basePath = path.resolve(__dirname, '..'),
    appName = appConfig.appName || defaultAppConfig.appName,
    srcPath = appConfig.srcPath || defaultAppConfig.srcPath,
    testPath = appConfig.testPath || defaultAppConfig.testPath,
    sourceResolved = path.resolve(basePath, srcPath),
    testPathResolved = path.resolve(basePath, testPath),
    templatesPath = appConfig.templates || defaultAppConfig.templates,
    distPath = appConfig.distPath || defaultAppConfig.distPath,
    genPath = appConfig.genPath || defaultAppConfig.genPath,
    templatesResolved = path.resolve(basePath, templatesPath),
    appPath = appConfig.appPath || defaultAppConfig.appPath;
  return {
    srcPath: srcPath,
    testPath: testPath,
    appPath: appPath || srcPath + '/scripts/' + appName,
    src: sourceResolved,
    test: testPathResolved,
    templates: templatesResolved || srcPath + '/scripts/' + templatesPath,
    app: path.resolve(basePath, appPath),
    templatesPath: templatesPath,
    srcSASS: appConfig.srcSASS || path.resolve(sourceResolved, 'scss'),
    srcI18N: appConfig.srcI18N || path.resolve(sourceResolved, 'app', 'i18n'),
    srcIMG: appConfig.srcIMG || path.resolve(sourceResolved, 'img'),
    modulesPath: appConfig.modulesPath || path.resolve(__dirname, '..', 'node_modules'),
    testSpecs: testPath + '/specs/**/*.js',
    distPath: distPath,
    dist: appConfig.dist || path.resolve(distPath),
    genPath: genPath,
    gen: appConfig.gen || path.resolve(genPath),
    globals: appConfig.globals || defaultAppConfig.globals,
    index: appConfig.index || path.resolve(srcPath, 'index.html'),
    entry: appConfig.entry || defaultAppConfig.entry,
    mangle: appConfig.mangle || defaultAppConfig.mangle,
    proxy: appConfig.proxy || defaultAppConfig.proxy,
    title: appConfig.title || defaultAppConfig.title
  }
}

exports.getAppConfig = getAppConfig;
exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.checkNodeImport = checkNodeImport;
