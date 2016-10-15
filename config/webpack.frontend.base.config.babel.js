import config from './config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    config.frontend.appRoot,
  ],

  output: {
    filename: 'bundle.js',
    path: config.frontend.dist,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: config.frontend.src,
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: config.frontend.index,
      inject: true,
    }),
  ],

  devtool: 'inline-source-map',
};
