var path = require("path"),
  srcPath = 'test';

var appConfig = {
  appName: 'app.js',
  appPath: srcPath + '/app.js',
  srcPath: srcPath,
  testPath: 'test',
  templates: 'templates',
  distPath: 'dist',
  genPath: 'src-gen',
  globals: {
    $: "jquery",
    jquery: "jQuery",
    "windows.jQuery": "jquery"
  },
  entry: {
    app: srcPath + '/app.js'
  },
  mangle: {
    except: ['jQuery', 'angular']
  },
  proxy: {
    '*': 'http://localhost:8080' // REST service
  },
  title: 'App'
};

// export default config
module.exports = appConfig;
