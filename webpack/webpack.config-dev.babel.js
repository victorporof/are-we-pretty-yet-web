import webpack from 'webpack';

import baseConfigFactory from './webpack.config';

export default (env = {}) => (baseConfig => ({
  ...baseConfig,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    ...baseConfig.plugins,
    new webpack.NamedModulesPlugin(),
  ],
}))(baseConfigFactory(env));
