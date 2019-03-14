import webpack from 'webpack';

import baseConfigFactory from './webpack.config';

export default (env = {}) => (baseConfig => ({
  ...baseConfig,
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    new webpack.HashedModuleIdsPlugin(),
  ],
}))(baseConfigFactory(env));
