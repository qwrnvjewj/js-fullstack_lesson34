const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { Generator } = require('webpack');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    stat: './statistics.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@model': path.resolve(__dirname, 'src/assets/model'),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]'
        }
      }
    ]
  }

};