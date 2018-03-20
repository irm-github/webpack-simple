# 优秀或有用的 snippets 集合

## 动态导入 chunk 示例
```js
// print.js
export function print (sth) {
  console.log(sth);
}
```

```js
// some_app.js
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
```
