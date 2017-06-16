var path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var LoaderOptionsPlugin = Webpack.LoaderOptionsPlugin;

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

const extractCSS = new ExtractTextPlugin('[name]-1.[hash:8].css');
const extractLESS = new ExtractTextPlugin('[name]-2.[hash:8].css');
const extractSASS = new ExtractTextPlugin('[name]-3.[hash:8].css');

module.exports = {
  PATH: {
    ROOT_PATH: ROOT_PATH,
    SRC_PATH:  SRC_PATH,
    DIST_PATH: DIST_PATH,
    DLL_PATH: DLL_PATH,
    BUILD_PATH:BUILD_PATH,
    NODE_MODULES_PATH: NODE_MODULES_PATH,
  },

  resolve: {
    alias: {
      'IMAGES': IMG_PATH,
      'STYLES': STY_PATH,
      'VIEWS': VIEWS_PATH,
      'COMPONENTS': COMPONENTS_PATH,
    }
  },

  externals: {
    // empty
    jQuery: 'window.jQuery',
    $: 'window.jQuery',
  },

  plugins: [
    /*
    new Webpack.optimize.CommonsChunkPlugin({
      // name: 'common', //将依赖合并到主文件
      async: true, //不指定块名称的做法，让共同的依赖异步加载
      children: true, // 寻找所有子模块的共同依赖
      minChunks: 2, // 设置一个依赖被引用超过多少次就提取出来
    }),
    */

    // 生成页面插件
    new HtmlWebpackPlugin({
      title: 'webpack',
      filename: 'index.html',  //默认目录路径为output.path
      template: 'index.html.js', //默认目录路径为根目录
      inject: true,
    }),

    // 为loader统一提供plugin参数
    new LoaderOptionsPlugin({
      options: {
        postcss: function(){
          return [
            require('autoprefixer')({
              browsers: ['last 3 versions']
            })
          ]
        },
      }
    }),

    // ExtractTextPlugin
    // extractCSS,
    extractLESS,
    // extractSASS,
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
        // include: SRC_PATH,
        loader: 'html-loader'
      },
      {
        test: /\.ejs$/,
        // include: SRC_PATH,
        use: 'ejs-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.js$/,
        include: SRC_PATH,
        use: 'babel-loader',
        // 根目录下的.babelrc里可以设置
        // query: {
        //   presets: ['es2015'] //该参数是babel的plugin，可以支持最新的es6特性
        // }
      },
      {
        test: /\.css$/,
        include: SRC_PATH,
        // loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 5 versions'
        use: extractCSS.extract(['css-loader', 'postcss-loader?sourceMap']),
      },
      {
        test: /\.less$/,
        // include: SRC_PATH,
        // loader: 'style-loader!css-loader!less-loader!autoprefixer-loader?browsers=last 5 versions'
        use: extractLESS.extract(['css-loader', 'postcss-loader?sourceMap', 'less-loader']),
      },
      {
        test: /\.(scss|sass)$/,
        // loader: 'style-loader!css-loader!sass-loader!autoprefixer-loader?browsers=last 5 versions'
        use: extractSASS.extract(['css-loader', 'postcss-loader?sourceMap', 'sass-loader']),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader?limit=20000&name=dist/[name].[hash:8].[ext]'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: 'style-loader!css-loader!postcss-loader?sourceMap',
                less: 'style-loader!css-loader!postcss-loader?sourceMap!less-loader',
                sass: 'style-loader!css-loader!postcss-loader?sourceMap!sass-loader',
              }
            }
          }
        ]
      },
    ]
  },

};
