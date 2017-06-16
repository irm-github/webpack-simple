var path = require('path');
var Webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var DefinePlugin = Webpack.DefinePlugin;
var DllReferencePlugin = Webpack.DllReferencePlugin;
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var OccurrenceOrderPlugin = Webpack.optimize.OccurrenceOrderPlugin;

var CONFIGURATION = require('./config/webpack.common.config');

//定义指定文件夹的路径
const ROOT_PATH = CONFIGURATION.PATH.ROOT_PATH;
const SRC_PATH = CONFIGURATION.PATH.SRC_PATH;
const DIST_PATH = CONFIGURATION.PATH.DIST_PATH;

var productionConifg = {
  entry: {
    'dist/main': path.resolve(SRC_PATH, 'main.js'),
  },
  output: {
    path: DIST_PATH,
    // 实际发布产品的时候很少使用到publicPath去指定CDN加速服务器资源
    // publicPath: '/dist/',
    // publicPath: 'http://localhost:5004/dist/',
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: "[name].[chunkhash:8].js"
  },
  resolve: CONFIGURATION.resolve,
  module: CONFIGURATION.module,
  plugins: [
    new CleanPlugin([
      'dist',
    ],{
      root: ROOT_PATH, //指定根目录
    }),
    new DefinePlugin({
      PRODUCTION: true, // 现在是生产环境
    }),
    new DllReferencePlugin({
      context: ROOT_PATH,
      manifest: path.resolve(ROOT_PATH, 'manifest.json'),
      // name: "dll", // 不需要都可以了
    }),
    // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
    new OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
        mangle:   true,
        compress: {
            warnings: false, // Suppress uglification warnings
        },
    }),
  ],
};

productionConifg.plugins = productionConifg.plugins.concat(CONFIGURATION.plugins);

// 测试、优化发布包的条件处理
if(process.env.NODE_ENV === 'development'){
  productionConifg.plugins = productionConifg.plugins.concat(CONFIGURATION.analysePlugins);
}

module.exports = productionConifg;
