import path from 'path';
import fs from 'fs';
import config from './config';

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
const nodeModules = {};
fs.readdirSync(config.nodeModules)
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

export default {
  entry: [
    `${config.backend}/server.js`,
  ],
  target: 'node',
  output: {
    path: path.join(config.root, '/dist/backend/'),
    filename: 'server.js',
  },
  resolve: {
    alias: config.alias,
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
