const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin')

new EslintWebpackPlugin({
  extensions: ['js'],
  configType: 'eslintrc',
  fix: true
})


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => ({
  splitChunks: {
    chunks: 'all'
  },
  minimizer: [
    '...',                      // оставляем стандартный Terser для JS
    new CssMinimizerWebpackPlugin(),
    new TerserPlugin()
  ]
})

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: ''
      }
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const setPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ]

  return plugins
}

const jsLoaders = (extra) => {
  const loaders = {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }

  if (extra) loaders.options.presets.push(extra)

  return loaders
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx',
    stat: './statistics.ts'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
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
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: false
  },
  devtool: isDev ? 'source-map' : false,
  plugins: setPlugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript')
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react')
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash:10][ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:10][ext]'
        }
      }
    ]
  }
};
