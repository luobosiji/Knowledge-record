# Node.js是如何执行的

## process
- 是Node.js内置的全局对象，无须引用。
- 包含所有进程信息
- 继承EventEmitter
- `node -e 'console.log(process)'`
  - version node版本号
  - versions node依赖模块的版本信息
  - title 终端上显示的标题
  - pid node进程版本号
  - moduleLoadList 加载的模块列表
    - Binding 模块 通过process.binding 绑定的C++模块
    - NativeModule 模块 内部JavaScript 模块
  - env 当前进程使用的环境变量
  - config node构建时使用的配置信息，可以辅助定位
  - features node版本开启和关闭的新功能
- process的用法
  - process.cpuUsage() 统计cpu 内存
  - 事件循环(维持了一个队列)
    - `process.nextTick(laterCallback)` 将laterCallback放到下一个事件循环中去执行 入队列
    - `process._tickCallback()` 非公开方法 在当前事件循环结束后调用 出队列
  - uncaughtException事件
    - 当node.js发现一个未捕获的异常时 会触发这个事件，如果这个事件中存在回调函数，则node.js不会强制结束进程
    ```javascript
      process.on('uncaughtException',err=>{
        ...
      })
    ```
  - exit/kill 进程管理
  - stdout/stderr/stdin I/O 相关
  - cwd/chdir 路径处理

## 事件循环机制
> EventLoop 是 libuv 的核心，也称为I/O Loop 建立在所有的I/O内容操作的基础之上
- 生命周期
  - timers  执行setTimeout() 和 setInterval() 设定的回调
  - I/O callbacks 执行绝大部分回调 除了 close、timers、setImmediate() 回调
  - idle，prepare 仅内部使用
  - poll 获取新的I/O事件，在适当的条件下，Node.js会在这里阻塞
    - 在这个阶段，任何一步操作都可能会调度更多操作和新的被处理事件
  - check setImmediate() 设定的回调会在这一阶段执行
  - close callbacks socket.on('close',callback) 的回调会在这个阶段执行
  - 每个阶段都有一个先入先出的执行回调队列，
    - 当事件循环运行到某个阶段时，Node.js会先执行该阶段的操作，然后执行队列中的回调，
    - 直到队列已耗尽或者执行的回调数量达到最大，事件循环就会进入下一个阶段
    - 如从往复，直至进程结束
- microtask 微任务 & macrotask 宏任务
  - 一次循事件环中 先执行微任务 在执行宏任务