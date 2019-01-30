const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});
const ExtractSass = new ExtractTextPlugin({
  filename: 'style.css',
});
const ExtractFlags = new ExtractTextPlugin('flags.css');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules',
    ],
    alias: {
      flags: 'node_modules/flag-icon-css/sass/flag-icon.scss',
      styles: 'src/sass/style.sass',
    },
  },
  module: {
    rules: [{
      test: /\.svg$/,
      use: [{
        loader: 'svg-url-loader',
      }],
    }, {
      test: /\.js?$/,
      loaders: [
        'babel-loader',
        'eslint-loader',
      ],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: ExtractFlags.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true,
          },
        }],
      }),
    }, {
      test: /\.sass$/,
      use: ExtractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true,
          },
        }],
      }),
    }],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractFlags,
    ExtractSass,
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8080,
    publicPath: 'dist',
    watchContentBase: true,
  },
  devtool: 'cheap-module-eval-source-map',
};

module.exports = config;
