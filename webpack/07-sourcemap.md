# sourcemap
>进行代码追踪，定位代码
- 关键字
  - `eval` 使用eval包裹模块代码
  - `source map` 产生 .map文件
  - `cheap`  不包含列信息
  - `inline` 将.map作为DataURI嵌入，不单独生成.map 文件
  - `module` 包含loader的sourcemap
- 类型（关键字组合）
```javascript
devtool:'xxx'
```
![sourcemap](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/sourcemap.png)