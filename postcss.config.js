/**
 * 官方范例
 */
// module.exports = ({ file, options, env }) => ({
//   parser: file.extname === '.sss' ? 'sugarss' : false,
//   plugins: {
//     'postcss-import': { root: file.dirname },
//     'postcss-cssnext': options.cssnext ? options.cssnext : false,
//     'autoprefixer': env == 'production' ? options.autoprefixer : false,
//     'cssnano': env === 'production' ? options.cssnano : false
//   }
// })

module.exports = ({ file, options, env }) => ({
  indent: 'postcss',
  plugins: {
    // 自动补全浏览器前缀
    'autoprefixer': true,
    // 优化、压缩 CSS 代码
    'cssnano': env === 'production',
  }
});
