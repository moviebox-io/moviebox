import config from './config';
import merge from 'webpack-merge';
// import webpack from 'webpack';
import webpackBackendBaseConfig from './webpack.backend.base.config.babel';

const testWebpackConfig = merge(webpackBackendBaseConfig, {
  resolve: {
    alias: merge(config.testAlias, config.alias),
  },
  devtool: '#inline-source-map',
});

// no need for app entry during tests
delete testWebpackConfig.entry;

export default testWebpackConfig;
