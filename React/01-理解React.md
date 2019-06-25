# 理解React
- 理解React组件
  - props + state => view
  - 组件一般不提供方法，而是某种状态机
  - 可以理解为纯函数
  - 单向数据绑定
  - 始终整体刷新页面
- 单一职责原则
  - 每个组件只做一件事
  - 如果组件变得复杂，那么应该拆分成小组件
- Flux架构：单向数据流
  - views -> actions -> store -> views
- 数据状态管理：DRY原则
  - 能计算得到的状态就不要单独存储
  - 组件尽量无状态，所需数据通过props获取
- 受控组件&非受控组件
  - 受控组件：表单元素状态由使用者维护
  - 非受控组件：表单元素状态DOM自身维护




**开发版本的CDN**

<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

**生产版本的CDN 可以把 16 替换成所需加载的版本号。**

<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>

- 使用crossorigin 能在 React 16 及以上的版本中有更好的错误处理体验。

npm init -y

<!-- 这可以压缩js代码 -->
npm install terser -D
npx terser -c -m -o like_button.min.js -- like_button.js

<!-- JSX 配置环境 将JSX编译为js代码-->
npm install babel-cli@6 babel-preset-react-app@3 -D
npx babel --watch src --out-dir . --presets react-app/prod 

# 创建单页应用的最佳方式
> Node >= 6 和 npm >= 5.2
npx create-react-app my-app
cd my-app
npm start
