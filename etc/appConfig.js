var path = require("path"),
  srcPath = 'test';

var appConfig = {
  appName: 'app.js',
  srcPath: srcPath,
  testPath: 'test',
  junit: {
    title: 'AngularJSCommon',
    dir: 'dist/test-reports'
  },
  templatesPath: 'templates',
  distPath: 'dist',
  genPath: 'src-gen',
  globals: {
    $: "jquery",
    jquery: "jQuery",
    "windows.jQuery": "jquery"
  },
  chunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  indexFiles: [{
    template: path.resolve(srcPath, 'index.html'),
    chunks: ['app', 'polyfills', 'vendor'],
    chunksSortMode: 'dependency'
  }],
  entry: {
    app: srcPath + '/app.js'
  },
  mangle: {
    except: ['jQuery', 'angular']
  },
  proxy: {
    '*': 'http://localhost:8080' // REST service
  },
  title: 'App',
  additionalWebpackOptions: false
};

// export default config
module.exports = appConfig;
