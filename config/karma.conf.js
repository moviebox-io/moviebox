import config from './config';
// import webpack from 'webpack';

const webpackConfig = {
  resolve: {
    alias: config.alias,
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
    ],
  },
  devtool: '#inline-source-map',
};

export default {
  frameworks: ['mocha'],
  files: [
    '../test/unit/index.js',
  ],
  preprocessors: {
    '../test/unit/index.js': ['webpack', 'sourcemap'],
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true,
  },
};
