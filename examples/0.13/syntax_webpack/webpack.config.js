
var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devtool: 'eval',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    publicPath: __dirname + '/build/'
  },

    resolve: {
        alias: {
            'react$': require.resolve('../../../node_modules/react'),
            'react-style$': require.resolve('../../../lib/index')
        }
    },
    
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          ReactStylePlugin.loader(),
          'jsx-loader?harmony',
          require.resolve('react-style-syntax')
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader'
      }
    ]
  },
    plugins: [
        new ReactStylePlugin('bundle.css'),
        new webpack.DefinePlugin({
            'process.env': {
                // To enable production mode:
                // NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
