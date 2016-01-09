'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules|lib/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          cacheDirectory: true,
          plugins: [
            './build/babelRelayPlugin',
            'transform-react-display-name',
            'transform-runtime',
            'transform-decorators-legacy',
            ['react-transform', {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                // this is important for Webpack HMR:
                'locals': ['module']
              }, {
                'transform': 'react-transform-catch-errors',
                // the second import is the React component to render error
                // (it can be a local path too, like './src/ErrorReporter')
                'imports': ['react', 'redbox-react']
              }]
            }]
          ]
        },
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]!sass'),
        exclude: /node_modules|lib/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  node: {
    fs: 'empty'
  }
};
