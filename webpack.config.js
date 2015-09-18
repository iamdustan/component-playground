'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  cache: true,
  debug: false,
  devtool: 'source-map',
  context: __dirname,
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=1'
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  resolve: {
    root: [__dirname],
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['','.js','.jsx']
  }
};
