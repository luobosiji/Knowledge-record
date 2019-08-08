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

# Virtual DOM
>UI以虚拟的表现形式保存于内存中，并通过ReactDom使之与真实的DOM同步
- diff算法
  - 时间复杂度 O(n)
  - 从根节点开始进行同层比较
    - 同层交换
    - 跨层（先删除，在创建）
  - key属性提高性能
    - 帮助React识别哪些元素改变了


**开发版本的CDN**
```javascript
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

**生产版本的CDN 可以把 16 替换成所需加载的版本号。**
```javascript
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

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

## 快速创建项目的三种方式
- create React App
- Rekit 
  - `npm install -g rekit`
  - `rekit create my-app`
- Codesandbox （在线创建，不需要搭建环境）


## other
- 同构 （服务端渲染）
- prop-tyeps （类型检测）
- [Mbox-React](https://cn.mobx.js.org/)
  - @observable 一个装饰器，用于将对象的某一部分变成可观察的
  - @computed一个装饰器，计算值，根据现有状态或其他计算值衍生出的值
  - @computed.struct 用于比较结构，设置为 true 时，表达式的输出在结果上与先前的值进行比较，然后通知观察者相关的更改
  - @computed.equals(comparer) 用于自定义比较结构,comparer 是一个自定义比较函数，mobx 提供三个内置比较器 同过 import { comparer } from ‘mobx’ 得到 comparer.default 等
  - Autorun 当需要创建一个响应式函数，但是函数本省并不需要观察者时，可以使用此 api，与 computed 相同点是都会响应依赖的变化，不同点是 computed 会返回一个新的值，用作观察者观察，而 autorun 没有观察者，他只是响应变化后执行一段代码
  - @observer 由 mobx-react 提供的装饰器，用来将 react 组件转换为响应式的组件，需要确保 observer 是最深处（第一个应用）
  - Provider 组件，由 mobx-react 提供，它使用了 react 的上下文(context)机制，可以用来向下传递 stores
  - @inject() 将组件链接到 stores，需要传递一个 stores 名称的列表给 inject 使得 stores 可以作为组件的 props 使用
  - componentWillReact 声明周期钩子，当组件因为它观察的数据发生变化，他会被安排重新渲染，这个时候 componentWillReact 钩子会被触发
  - action 动作，动作是用来修改状态的

## UI库
- 考虑因素
  - 组件库是否齐全
  - 样式风格是否符合业务需求
  - API是否便捷灵活
  - 技术支持是否完善
  - 开发是否活跃
- Ant Design
- material-ui
- semantic UI
