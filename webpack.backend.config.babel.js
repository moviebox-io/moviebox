import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  entry: [
    './backend/server.js',
  ],
  target: 'node',
  output: {
    path: path.join(__dirname, '/dist/backend/'),
    filename: 'server.js',
  },
  externals: nodeModules,
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
    ],
  },
};
