/**
 * @author: @mreinhardt
 */

const webpack = require('webpack');
const util = require('util');
const debugLog = util.debuglog('@holisticon/angularjs-common/webpack.common');
const path = require('path');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();

debugLog('Using following appConfig:', appConfig);

/*
 * Webpack Plugins
 */
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/*
 * Webpack Constants
 */
const METADATA = {
  title: appConfig.title,
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};


/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
var config = {

  bail: true,

  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: appConfig.entry,

  resolveLoader: {
    root: appConfig.modulesPath
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js', '.jsx', '.json'],

    // Make sure root is src
    root: appConfig.src,

    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],

    // remove other default values
    modulesDirectories: appConfig.modulesDirectories || [appConfig.modulesPath]

  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    noParse: [
      /lie.js/,
      path.resolve(appConfig.modulesPath, 'angular/angular.min.js')
    ],

    /*
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [

      /*
       * Tslint loader support for *.ts files
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          /node_modules/,
          /\.(html|css|sass)$/
        ]
      },
      /*
       * Source map loader support for *.js files
       * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      // note that babel-loader is configured to run after ts-loader
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader']
      },
      /*
       *  Babel- and ESLint-Loader
       */
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: [/\.ts$/]
      },
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/svg+xml'
      }, {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/png'
      }, {
        test: /\.jpeg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/png'
      }, {
        test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/png'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      // https://github.com/jtangelder/sass-loader#usage
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      /*
       * to string and css loader support for *.css files
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.xml/,
        loader: 'raw-loader'
      }
    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    /**
     * Advanced typescript path resolution
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
     */
    new TsConfigPathsPlugin(),

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),
    new webpack.ProvidePlugin(appConfig.globals || {
        PouchDB: "pouchdb",
        jquery: "jQuery",
        "windows.jQuery": "jquery"
      }),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: path.join(appConfig.src, 'images'),
      to: path.join(appConfig.dist, 'images')
    }, {
      from: path.join(appConfig.src, 'views'),
      to: path.join(appConfig.dist, 'views')
    }, {
      from: path.join(appConfig.templates),
      to: path.join(appConfig.dist, appConfig.templates.replace(appConfig.src, ''))
    }, {
      context: path.join(appConfig.src),
      from: '*.*',
      to: path.join(appConfig.dist)
    }, {
      context: path.join(appConfig.gen),
      from: '*.*',
      to: path.join(appConfig.dist)
    }]),
    // annotate angular
    new NgAnnotatePlugin({
      add: true,
      single_quotes: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NoErrorsPlugin()

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
for (var indexConfig of appConfig.indexFiles) {
  config.plugins.push(new HtmlWebpackPlugin(indexConfig));
}

// add additional settings here
if (appConfig.additionalWebpackOptions) {
  config = webpackMerge(config, appConfig.additionalWebpackOptions);
}
debugLog('Using following webpack common config:', config);
module.exports = config;
