# webpack基础
- 为什么需要构建工具？
  - 转换ES6语法
  - 转换JSX
  - CSS 前缀补全/预处理器 （使CSS有可编程性，易维护）
  - 压缩混淆（使代码逻辑不易暴露）
  - 图片压缩

**安装**
- 安装nvm（用来管理node版本）
  - [安装nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)
  - `nvm ls` 查看已安装版本
  - `nvm use xxx` 切换版本
- 安装Node.js和NPM
- 安装nrm (用来切换npm源)
  - `npm i -g nrm` 安装
  - `nrm add xxx http://xxx` 添加源
  - `nrm use xxx` 使用对应源
  - `nrm ls` 列出所有源
- 安装webpack
  - `npm install --save-dev webpack`
  - `npm install --save-dev webpack-cli`


**配置文件**
- 默认配置文件 webpack.config.js
- 可通过 webpack --config 指定配置文件 可以用来区分代码执行环境
  - webpack.dev.js 开发环境
  - webpack.prod.js 生产环境
- 使用laoder及plugins时 需要暗转对应依赖
  - `npm i style-loader css-loader -D`
  - `npm i less less-loader -D`
```javascript
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports ={
  entry:'./src/index.js', //单页应用 一个入口起点
  entry: { //多页应用 多个入口起点
    home: './home.js',
    about: './about.js',
  },
  output:'./dist/main.js', //打包输出
  output: { //占位符 输出多文件
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js'
  },
  //development
  mode:'production', // 用来指定当前的构建环境，也可以使用webpack内置的函数设置
  module:{
    // 原生只支持 js、json 其它则通过loader处理 转化成有效模块
    // loader 本质是函数，接受源文件作为参数，返回转换结果
    rules:[ //loader 配置
      //test指定匹配规则，use指定使用loader名称
      // raw-loader可以将文件作为字符串导入
      {test:/\.txt$/, use:'raw-loader'},
      // 使用babel-loader 解析ES6
      {test:/\.js$/, use:'babel-loader'},
      {test:/\.css$/, use:[
        'style-loader', //将样式通过<style>标签插入到head中
        'css-loader' //用于加载.css文件 并且转换成commonjs对象
      ]},
      // loader执行是从后往前
      {test:/\.less$/, use:[
        'style-loader', 
        'css-loader',
        'less-loader' //将less 转换成css
      ]},
      //url-loader 类似于 file-loader 可以处理图片和字体，当如果文件小于字节限制limit 则自动base64，可以返回DataURL
      {
        test:/\.(png|svg|jgp|gif)$/, 
        use:[
          loader:'url-loader',
          options:{
            limit:10240,
            //当超出limit限制 则使用的备用加载程序 默认：'file-loader'
            fallback: 'file-loader'}
          ]
      },
      //file-loader 可以处理图片和字体，
      {test:/\.(png|svg|jgp|gif)$/, use:['file-loader']},
      {test:/\.(woff|woff2|eot|ttf|otf)$/, use:['file-loader']}
    ]
  },
  // 用于bundle文件的优化，资源管理和环境变量注入，作用于整个构建过程
  plugins:[ //插件配置
    new HtmlwebpackPlugin({ //自动创建html去承载生成的js
      template:'./src/index.html'
    }),
    // 这里在编译之前先删除dist文件夹
    // 默认删除output指定的输出目录
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
  ]
}
```
**babel配置.babelre**
- 需要使用npm安装对应依赖
  - `npm i @babel/core @babel/preset-env babel-loader -D`
  - `npm i react react-dom @babel/preset-react -D`
```javascript
{
  //是一系列plugins的集合
  "presets":[
    "@babel/preset-env", //增加ES6的babel preset 配置
    "@babel/preset-react" //增加React的babel preset 配置 解析 React JSX
  ],
  //一个plugins对应一个功能
  "plugins":[
    "@babel/proposal-class-properties"
  ]
}
```

**前端构建工具的演变**
![前端构建工具的演变](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/build.png)

**常见的loader**
![常见的loader](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/loader.png)

**常见的的plugins**
![常见的plugins](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/plugins.png)

**解析mode内置函数功能**
![mode](https://raw.githubusercontent.com/luobosiji/blog/master/resources/webpack/mode.png)