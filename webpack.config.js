const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: "url-loader",
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  mode: process.env.NODE_ENV,
  devServer: {
      host: 'localhost',
      port: 8080,
      static: {
        directory: path.join(__dirname, './build'),
        publicPath: '/',
      },
      proxy: {
        '/api': 'http://localhost:3000',
        '/assets': 'http://localhost:3000',
        '/login': 'http://localhost:3000',
        '/register': 'http://localhost:3000',
        '/protected-route': 'http://localhost:3000',
        '/logout': 'http://localhost:3000',
      },
      historyApiFallback: {
        index: '/'
      }
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: "index.html"
    }),
  ],
}