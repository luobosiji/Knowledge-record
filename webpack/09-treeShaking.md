# tree shaking（摇树优化）
>一个模块可能有多个方法，只要其中某个方法使用到了，则整个文件都会被打包到bundle中,\
tree shaking就是只把用到的方法打入 bundle，没用到的方法会在uglify阶段被擦除掉

注：webpack默认支持 在.babelrc 里设置`modules:false` 即可

**mode:production 默认开启**

必须是ES6语法，CJS的方式不支持（如：require）

- DCE（Elimination）
  - 代码不会执行，不可到达
  - 代码执行结果不会被用到
  - 代码只会影响死变量（只写不读）

**原理**
- 利用ES6模块特点：
  - 只能作为模块顶层的语句出现  import
  - import 的模块名 只能是字符创常量
  - import binding是 immutable的
- 代码擦除： uglify阶段删除无用代码 （静态分析，代码擦除）
