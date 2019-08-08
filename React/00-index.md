
**单元测试**
- React应用很少需要访问浏览器API
- 虚拟DOM可以在NodeJs环境运行和测试
- Redux隔离了状态管理，纯数据层单元测试

**工具**
- Jest facebook开源js单元测试框架
- JS DOM 浏览器环境的NodeJS模拟
- Enzyme React组件渲染和测试
- Nock 模拟HTTP请求
- sinon 函数模拟和调用跟踪
- istanbul 单元测试覆盖率

**开发调试工具**
- ESLint
  - airbnb
  - 代码规范
  - 报警告提示你
- Prettier
  - 格式化，保证风格一致
  - 强制自动化改变
- React Dev Tools
  - 查看React组件树
  - 查看哪些组件重新render
    - 查看是否有多余的render
- Redux Dev Tools


**理想架构**
- 易于开发
  - 开发工具是否完善
  - 生态圈是否繁荣
  - 社区是否活跃
- 易于维护
  - 代码是否容易理解
  - 文档是否健全
- 易于扩展
  - 增加新功能是否容易
  - 新功能是否会显著增加系统复杂度
- 易于构建
  - 使用通用技术和架构
  - 构建工具的选择
- 易于测试
  - 功能的分层是否清晰
  - 副作用少
  - 尽量使用纯函数

**拆分复杂度**
- 按领域模型（feature）组织代码，降低耦合度
  - 项目初期：规模小，模块关系清晰
  - 项目逐渐复杂，添加更多组件和其它元素
  - 项目收尾：文件结构，模块依赖错综复杂
  - 将业务逻辑拆分成高内聚松耦合的模块
    - 按功能划分模块成多个模块（文件夹）
- 文件夹结构
  - fratures组织源文件
  - 组件和样式文件同一级
  - Redux 单独文件夹
  - 单元测试保持同样目录结构放在tests文件夹
  - src
    - common
    - features
      - common
      - todo
      - home
        - redux
          - 每个actions+reducer 文件
          - reducer.js 包含所有reducer
          - actions.js 包含所有actions
        - 组件 .js .css
          - index.js 包含当前目录所有js
          - style.css 包含目录所有css
- 使用JSON定义顶层路由
  - 每个feature 都有自己的专属路由配置
  - 顶层路由使用json配置 更易维护和理解
    - 声明式导航 难以维护
  - 如何解析JSON配置到 React Router语法
  - routeConfig.js (根路由文件)
    - route1.js(单独定义个个feature模块)
    - route2.js ...


**react拖放库**
- beautiful-dnd

**性能问题**
- 网络性能优化
  - 按需加载
    - webpack的import API
    - react-loadable库实现React异步加载
- reselect库 避免重复计算
  - 创建自动缓存的数据处理流程
- 图片多
  - 虚拟滚动，只有当图片出现在可视区域再去显示
  
**下一代React 异步渲染**
- 时间分片（Time Slicing）
  - Dom操作的优先级低于浏览器原生行为，例如键盘和鼠标输入，从而保证操作的流畅
    - 虚拟Dom的diff操作可以分片进行
    - ReactAPI unstable_deferredUpdates
    - ChromeAPI requestldleCallback
      - 浏览器告诉你什么时候不忙了，cpu空闲
- 渲染挂起（Suspense）
  - 虚拟DOM节点可以等待某个异步操作的完成，并指定timeout，之后才完成真正的渲染