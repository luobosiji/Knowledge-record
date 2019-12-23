# Node.js 初识
> 任何能用JavaScript实现的应用系统，最终都必将用JavaScript实现。

- JavaScript简述
  - JavaScript 诞生于1995年
    - 第一版名称为LiveScript，为了蹭Java热度改名
  - 1997年欧洲计算机制造商协会 指定39号技术委员会 将其标准化
    - 计算机制造商协会（European Computer Manufactures Association, ECMA）
    - 39号技术委员会（TC39）
    - 2009年 ES5发布 该标准被人熟知
  - 2009年 Node.js横空出世
    - 2015年ES6发布，Node.js从4.x版本开始支持ES6特性
- Node.js简述
  - JavaScript 是编程语言，Node.js是JavaScript的运行时环境
  - 基于ChromeV8引擎构建
    - ChromeV8 是Google发布的开源JavaScript引擎
  - 由事件循环（Event Loop）分发I/O任务
  - 最终工作线程（Work Thread）将任务放到线程池(Thread Pool)中执行，事件循环等待执行结果

## Node.js 应用场景
- 跨平台开发
- 后端开发
  - 提供API
  - RPC服务（Remote Procedure Call ，远程过程调用）
  - BFF中间层（Backend for Frontend）
    - 对用户提供HTTP服务
    - 使用后端RPC服务
- 前端开发
  - 辅助开发及工程化演进过程（脚手架、构建工具）
  - 服务端渲染SSR
- 工具开发
  - npm上的各种工具开发，预编译工具、构建工具、脚手架、命令行工具