'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: './[name]-[hash].min.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '/app.min.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname)],
        exclude: /node_modules/
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: [/\.css$/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
            'postcss-loader'
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: [/\.scss$/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
            'sass-loader?sourceMap'
          ]
        }),
        exclude: /node_modules/
      }
    ],
  },
  node: {
    fs: 'empty'
  }
};
