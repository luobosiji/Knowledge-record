# webpack热更新及原理

**文件监听**
>发现源码发生变化时，自动重新构建出新的输出文件。\
>但需要手动刷新浏览器

- 开启监听模式两种方式
  - 启动`webpack`命令时 带上`--watch`参数
  - 在配置`webpack.config.js`中设置 `watch:true`
- 文件监听原理
  - 轮询判断文件的最后编辑时间是否变化
  - 某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等aggregateTimeout
```javaScript
module.export = {
  // 默认为false
  watch:true,
  // 开启监听模式 这个选项才有意义
  watchOptions:{
    ignored:/node_modules/, //忽略文件，支持正则，默认为空
    aggregateTimeout:300, // 监听到变化后 会等300ms在执行，默认300ms
    poll:1000 //每秒轮询次数，默认每秒1000次
  }
}
```
**热更新 webpack-dev-server**
- `webpack-dev-server --open` open是自动打开浏览器
- 不需要手动刷新浏览器
- 不输出文件，而是放在内存中
- 使用`HotModuleReplacementPlugin`插件
```javascript
plugins:[
  new webpack.HotModuleReplacementPlugin()
],
devServer:{
  contentBase:'./dist', //根目录
  hot: true //热更新
}
```
**热更新 webpack-dev-middleware**
- 适用于灵活的定制场景

![webpack-dev-middleware](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/webpack-dev-middleware.png)

**热更新原理分析**

![热更新原理分析](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/hot.png)