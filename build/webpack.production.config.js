var path = require('path');
var Webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var DefinePlugin = Webpack.DefinePlugin;

var CONFIGURATION = require('./config/webpack.common.config');

//定义指定文件夹的路径
const ROOT_PATH = CONFIGURATION._PATH.ROOT_PATH;
const SRC_PATH = CONFIGURATION._PATH.SRC_PATH;
const DIST_PATH = CONFIGURATION._PATH.DIST_PATH;

var productionConifg = {
  // mode: 'production',
  entry: {
    'dist/main': path.resolve(SRC_PATH, 'main.js'),
  },
  output: {
    path: DIST_PATH,
    // 实际发布产品的时候很少使用到publicPath去指定CDN加速服务器资源
    // publicPath: '../dist/',
    // publicPath: 'http://localhost:5004/dist/',
    filename: '[name].bundle.[hash:8].js',
    chunkFilename: "[name].chunk.[chunkhash:8].js"
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
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle:   true,
        warnings: true,
        compress: true,
        output: {
          beautify: false
        }
      }
    }),
    // 作用域提升，以加快代码在浏览器中的执行速度
    new Webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

productionConifg.plugins = productionConifg.plugins.concat(CONFIGURATION.plugins);

// 测试、优化发布包的条件处理
if(process.env.NODE_ENV === 'development'){
  productionConifg.plugins = productionConifg.plugins.concat(CONFIGURATION.analysePlugins);
}

module.exports = productionConifg;
