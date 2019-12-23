#  更了不起的Node.js

- 单线程会死吗?
  - 捕获`uncaughtException`异常，可以解决程序抛出异常,不会造成接口崩溃
  ```javascript
  process.on('uncaughtException',err=>{
    console.log(err)
  })
  ```
  - `try...catch...`捕获
    - 同步代码才能被捕获
    - 成本较高，除非必要，一般不建议使用
  - `forever` 进程崩溃，自动重启
    - `npm install forever -g`
    - `forever start app.js`
  - `PM2` 小集群：单台服务器上的多个实例  
    - `npm install pm2 -g`
    - `pm2 start app.js -i 0 --name "modern-nodejs"`
    - 支持无缝重载、0秒切换，可实现各种监控、部署等功能
  - 大集群：多台机器
    - SLB（Server Load Balancer）负载均衡
      - 基于Tengine 是阿里巴巴维护的Nginx的优化版本
    - 注意 需要提供健康检查 来判断负载节点是否可用
      - 在服务器里提供check_health.html 
      - 或者通过HEAD请求来检测实际的服务器节点是否存活
- ES.next 特性
  - call 和 apply
    - 为了改变某个函数运行时的context（上下文）而存在（改变函数内部this指向）
      ```javascript
      obj.call(thisObj,arg1,arg2,...)
      obj.apply(thisObj,[arg1,arg2,...])
      ```
  - bind
    - 会创建一个新的函数，不会立即执行，需要再显示执行一次此函数。
    ```javascript
    const c = obj.bind(thisObj,arg1,arg2,...)
    c();
    ```
  - Object.defineProperty(obj,prop,descriptor)
    - obj 目标对象
    - prop 需要被定义或修改的属性方法名
    - descriptor 需要被定义或修改的属性描述符
  - delegate
  - only
- 多模块管理器 Lerna
  - npm install --global lerna@^2.0.0-beta.0 安装lerna2.x版本
  - git init lerna-repo && cd lerna-repo  创建git仓库
  - lerna init 初始化 lerna仓库
  - lerna publish 模块发布 npm源是npmjs.org