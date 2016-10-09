import webpackBase from './webpack.backend.base.config.babel';
import merge from 'webpack-merge';

const webpackProd = merge(webpackBase, {
  debug: false,
});

export default webpackProd;
