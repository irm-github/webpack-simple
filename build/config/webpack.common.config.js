var path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ROOT_PATH = path.resolve(__dirname, '../../');
const SRC_PATH = path.resolve(ROOT_PATH, './src');
const DIST_PATH = path.resolve(ROOT_PATH, './dist');
const DLL_PATH = path.resolve(ROOT_PATH, './dll');
const BUILD_PATH = path.resolve(ROOT_PATH, './build');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, './node_modules');

const ASSETS_PATH = path.resolve(ROOT_PATH, './src/assets/');
const VIEWS_PATH = path.resolve(ROOT_PATH, './src/views/');
const COMPONENTS_PATH = path.resolve(ROOT_PATH, './src/components/');
const IMG_PATH = path.resolve(ROOT_PATH, './src/assets/images/');
const STY_PATH = path.resolve(ROOT_PATH, './src/assets/styles/');

const extractCSS = new ExtractTextPlugin('[name]_css.[hash:8].css');
const extractLESS = new ExtractTextPlugin('[name]_less.[hash:8].css');
const extractSASS = new ExtractTextPlugin('[name]_sass.[hash:8].css');

module.exports = {
  _PATH: {
    ROOT_PATH: ROOT_PATH,
    SRC_PATH:  SRC_PATH,
    DIST_PATH: DIST_PATH,
    DLL_PATH: DLL_PATH,
    BUILD_PATH:BUILD_PATH,
    NODE_MODULES_PATH: NODE_MODULES_PATH,
  },

  resolve: {
    alias: {
      '@SRC': SRC_PATH,
      '@IMAGES': IMG_PATH,
      '@STYLES': STY_PATH,
      '@VIEWS': VIEWS_PATH,
      '@COMPONENTS': COMPONENTS_PATH,
    }
  },

  externals: {
    jQuery: 'window.jQuery',
    $: 'window.jQuery',
  },

  plugins: [
    // 生成页面插件
    new HtmlWebpackPlugin({
      title: 'webpack',
      filename: 'index.html',  //默认目录路径为output.path
      template: 'index.html.js', //默认目录路径为根目录
      inject: true,
    }),

    extractCSS,
    extractLESS,
    extractSASS,
  ],

  // 分析调试用的插件
  analysePlugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 3004
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.ejs$/,
        use: 'ejs-loader'
      },
      {
        test: /\.js$/,
        include: SRC_PATH,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: SRC_PATH,
        use: extractCSS.extract(['css-loader', 'postcss-loader']),
        // use: ['style-loader', 'css-loader', 'postcss-loader'],
        // use: extractCSS.extract([
        //   { loader: 'css-loader', options: { sourceMap: true } },
        //   { loader: 'postcss-loader', options: { sourceMap: true } },
        // ]),
      },
      {
        test: /\.less$/,
        include: SRC_PATH,
        use: extractLESS.extract(['css-loader', 'postcss-loader', 'less-loader']),
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        // use: extractLESS.extract([
        //   { loader: 'css-loader', options: { sourceMap: true } },
        //   { loader: 'postcss-loader', options: { sourceMap: true } },
        //   { loader: 'less-loader', options: { sourceMap: true } },
        // ]),
      },
      {
        test: /\.(scss|sass)$/,
        use: extractSASS.extract(['css-loader', 'postcss-loader', 'sass-loader']),
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        // use: extractLESS.extract([
        //   { loader: 'css-loader', options: { sourceMap: true } },
        //   { loader: 'postcss-loader', options: { sourceMap: true } },
        //   { loader: 'sass-loader', options: { sourceMap: true } },
        // ]),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf)$/,
        use: [
          { loader: 'url-loader', options: { limit: 2000, name: 'dist/[name].[hash:8].[ext]' } }
        ],
      },
    ]
  },

};
