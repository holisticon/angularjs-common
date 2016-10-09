/**
 * @author: @martinreinhardt
 */
const path = require('path');

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require(path.resolve(__dirname, '..', 'etc', 'webpack.prod')); // eslint-disable-line
    break;
  case 'test':
  case 'testing':
    module.exports = require(path.resolve(__dirname, '..', 'etc', 'webpack.test')); // eslint-disable-line
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require(path.resolve(__dirname, '..', 'etc', 'webpack.dev')); // eslint-disable-line
}
