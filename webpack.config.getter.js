'use strict';

module.exports = function(BUILD_ENV){
  var path = require('path');
  var webpack = require('webpack');
  var assign = require('object-assign');
  var isDevelopment = (BUILD_ENV || process.env.BUILD_ENV) !== 'PROD';
  var isProduction = !isDevelopment;

  function resolve(pathName){
    return path.resolve(__dirname, pathName);
  }

  var node_modules = resolve("node_modules");
  var depPaths = {
    // add alias:path to already minified versions
  };

  if(isDevelopment) {

  }

  console.log('* Starting Webpack');
  console.log('* isProduction = ' + isProduction);

  /* Plugins */
  var basePlugins = [
      new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
      new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': isProduction ? '"production"' : '"development"'
        }
      })
  ];

  var developmentPlugins = [];

  var productionPlugins = [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false    
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
  ];

  var plugins = basePlugins.concat(isDevelopment ? developmentPlugins : productionPlugins);

  /* ------- */
  return {  
    entry: resolve('src/js/main.js'),
    output: {
      path: resolve('dist/js'),
      filename: 'main.js',
      publicPath : 'js/'
    },
    module: {
      preLoaders: [
        {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "eslint-loader"}
      ],
      loaders: [
        {test: /\.js$/, exclude: /(node_modules|bower_components)/, loaders: ['babel-loader', 'react-map-styles']},
        {test: /\.scss$/, loaders: ["style","css?root=" + resolve("src"),"sass?sourceMap"]},
        {test: /\.css$/, loaders: ["style","css"]},
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
       // {test: /\.(ttf|eot|svg|woff)$/, loader: 'file-loader?name=assets/[name].[ext]'}
      ],
      noParse : Object.keys(depPaths).map(function(k){return depPaths[k]})
    },
    eslint: {
        configFile: './.eslintrc'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', './src'],
        alias: assign({
          // custom aliases here
        }, depPaths)
    },
    plugins: plugins,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'source-map' : false
  };
}