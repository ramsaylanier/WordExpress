'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const devServer = {
    contentBase: path.resolve(__dirname, './dist'),
    outputPath: path.join(__dirname, './dist'),
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/',
    historyApiFallback: false,
    host: '127.0.0.1',
    proxy:{
      '/graphql': {
        target: 'http://localhost:8080'
      }
    },
    port: 3000,
    hot: true
};

module.exports = {
  devtool: 'eval-source-map',
  debug: true,
  devServer: devServer,
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: devServer.publicPath
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
    new WriteFilePlugin(),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:3100/'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  node: {
    fs: 'empty'
  }
};
