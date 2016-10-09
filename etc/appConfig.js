var path = require("path"),
  basePath = path.resolve(__dirname, '..'),
  sourcePath = 'test',
  testPath = 'test',
  templatesPath = 'scripts/templates',
  sourceRoot = path.resolve(basePath, sourcePath),
  genRoot = path.resolve(basePath, 'src-gen'),
  testRoot = path.resolve(basePath, testPath),
  distRoot = path.resolve(basePath, 'dist');

var appConfig = {
  src: sourceRoot,
  test: testRoot,
  templates: path.resolve(__dirname, '..', templatesPath),
  srcPath: sourcePath,
  templatesPath: templatesPath,
  srcSASS: path.resolve(sourceRoot, 'scss'),
  srcI18N: path.resolve(sourceRoot, 'app', 'i18n'),
  srcIMG: path.resolve(sourceRoot, 'img'),
  appPath: path.resolve(sourceRoot, 'app.js'),
  srcApp: sourcePath + '/scripts/app.js',
  templatesResolvedPath: sourcePath + '/' + templatesPath + '/*.html',
  modulesPath: path.resolve(__dirname, '..', 'node_modules'),
  testPath: testPath,
  testSpecs: testPath + '/specs/**/*.js',
  dist: distRoot,
  gen: genRoot,
  globals: {
    $: "jquery",
    jquery: "jQuery",
    "windows.jQuery": "jquery"
  },
  index: path.resolve(sourceRoot, 'index.html'),
  entry: {
    app: sourcePath + '/app.js'
  },
  mangle: {
    except: ['jQuery', 'angular']
  },
  proxy: {
    '*': 'http://localhost:8080' // REST service
  },
  title: 'App'
};

module.exports = appConfig;
