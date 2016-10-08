import webpack from 'webpack';
import merge from 'webpack-merge';
import webpackBase from './webpack.backend.base.config.babel';

const webpackDev = merge(webpackBase, {
  debug: true,
  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false, environment: 'node' }),
  ],
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-source-map',
});

export default webpackDev;
