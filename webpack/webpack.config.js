import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import * as Paths from '../config/paths';
import * as Endpoints from '../config/endpoints';
import babelrc from './babel.config.json';

export default () => ({
  entry: [
    Paths.ENTRY_MAIN_FILE_PATH,
  ],
  output: {
    path: Paths.DIST_DIR_PATH,
    filename: Paths.OUTPUT_BUNDLE_FILE_NAME,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          ...babelrc,
        },
      }],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Paths.INDEX_TEMPLATE_FILE_PATH,
    }),
    new CopyPlugin([
      {
        from: Paths.PUBLIC_DIR_PATH,
        to: Paths.DIST_DIR_PATH,
      },
    ]),
  ],
  devServer: {
    contentBase: Paths.DIST_DIR_PATH,
    port: Endpoints.WEBPACK_DEV_SERVER_PORT,
    proxy: {
      '/api': Endpoints.API_ENDPOINT,
    },
  },
});
