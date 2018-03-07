/* 引入样式文件
*/
import '@STYLES/base.less';
import '@STYLES/common.less';

console.log($);
console.log(jQuery);

if(!PRODUCTION){
  // 非生产环境代码
}

function component () {
  import(/* webpackChunkName: "dist/print" */ './print.js').then(({print})=>{
  // import(/* webpackChunkName: "dist/moment" */ /* webpackMode: "lazy" */ 'moment').then((print)=>{
    console.log('加载成功');
    console.log(print);
  }).catch(()=>{
    console.log('加载失败');
  });
}

setTimeout(function(){
  component();
}, 2000);
