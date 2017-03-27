const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
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
const LoaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
});
const UglifyJSPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true,
  },
  compress: {
    screw_ie8: true,
  },
  comments: false,
});

const EnvironmentConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});

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
      flags: 'node_modules/flag-icon-css/sass/_flag-icon.scss',
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
      ],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: ExtractFlags.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
          },
        }],
      }),
    }, {
      test: /\.sass$/,
      use: ExtractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: { plugins: () => [autoprefixer] },
        }, {
          loader: 'sass-loader',
        }],
      }),
    }],
  },
  plugins: [
    EnvironmentConfig,
    LoaderOptionsPluginConfig,
    HtmlWebpackPluginConfig,
    ExtractFlags,
    ExtractSass,
    UglifyJSPluginConfig,
  ],
};

module.exports = config;
