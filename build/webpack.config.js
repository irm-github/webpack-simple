var path = require('path');
var Webpack = require('webpack');
var ExtractPlugin = require('extract-text-webpack-plugin');
var DefinePlugin = Webpack.DefinePlugin;

// 优化调试信息的UI界面
const IS_PRETTIER_UI = false;
if (IS_PRETTIER_UI) {
  var Dashboard = require('webpack-dashboard');
  var DashboardPlugin = require('webpack-dashboard/plugin');
  var dashboard = new Dashboard();
}

var CONFIGURATION = require('./config/webpack.common.config');

//定义指定文件夹的路径
const ROOT_PATH = CONFIGURATION._PATH.ROOT_PATH;
const SRC_PATH = CONFIGURATION._PATH.SRC_PATH;
const DIST_PATH = CONFIGURATION._PATH.DIST_PATH;

var webpackConfig = {
  // mode: 'development',
  context: ROOT_PATH,
  entry: {
    'dist/main': path.resolve(SRC_PATH, 'main.js'),
  },
  output: {
    path: DIST_PATH,
    // publicPath: 'http://localhost:5004/dist/', //模拟静态资源存放在CDN
    publicPath: '/dist/', //静态资源存放于index.html同根目录下使用，即不分开部署时使用
    filename: '[name].bundle.[hash:8].js',
    chunkFilename: "[name].chunk.[chunkhash:8].js"
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: false,
    disableHostCheck: true,
  },
  resolve: CONFIGURATION.resolve,
  externals: CONFIGURATION.externals,
  module: CONFIGURATION.module,
  optimization: CONFIGURATION.optimization,
  plugins: (function(){
    var ret = [
      new DefinePlugin({
        PRODUCTION: false, // 现在是调试环境
      }),
      // 作用域提升，以加快代码在浏览器中的执行速度
      new Webpack.optimize.ModuleConcatenationPlugin(),
    ];
    if (IS_PRETTIER_UI) {
      ret.push(new DashboardPlugin(dashboard.setData))
    }
    return ret;
  })(),
};

webpackConfig.plugins = webpackConfig.plugins.concat(CONFIGURATION.plugins.slice(0));

module.exports = webpackConfig;
