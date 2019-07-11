const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MainWebpackPlugin = require('./plugins/MainWebpackPlugin');

module.exports = {
  context: resolve('src'),
  entry: "./app.js",
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new MainWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: ['**/*.js']
      },
    ]),
  ],
  mode: 'production',
}
