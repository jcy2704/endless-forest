const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
        },
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'audio/',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
