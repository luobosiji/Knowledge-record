# Nginx 进程
>nginx服务 要保证高可用性、高可靠性

- 多进程
  - 通过内存通信
  - 进程和CPU内核绑定、占有CPU核，使用最大性能
  - 为什么不是用多线程？
    - 多线程会共享一个地址空间，如果其中一个发生错误，则整个都会挂掉

## Nginx进程结构
- Master Process （父进程）（不执行业务代码，通常不会挂掉）
  - cache Manage 管理缓存的子进程
  - cache Loader 载入缓存的子进程
  - 多个worker 干活进程（每个worker 占有一个CPU核）

## Nginx进程间管理
![nginx进程间管理](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/progress-manage.png)
- Master
  - 监控worker进程 当worker终止时 会向Master进程发送CHLD信号，Master会重新拉起worker
  - 管理worker进程
  - 接收信号
    - TERM/INT 立刻停止
    - QUIT 优雅停止
    - HUB 重载配置文件
    - USR1 重新打开日志文件，做日志切割
    - **USR2** 只能使用kill
    - **WINCH** 只能使用kill
- Worker进程 （也可以直接接收信号，但是一般建议使用Master来管理 ，不直接操作）
  - TERM/INT 立刻停止
  - QUIT 优雅停止
  - USR1 重新打开日志文件，做日志切割
  - **WINCH** 只能使用kill
- nginx命令行（本质是向进程发送信号、命令和信号一一对应）
  - 当我们启动nginx服务时，会把pid记录到nginx.pid文件 记录master进程pid
  - 执行命令 就回去nginx.pid文件中读取master的pid 向pid发送信号

`kill -sighub 进程号` 重载配置文件
`kill -sigterm 进程号` 要求nginx立即关闭服务

## Nginx请求处理流程
![nginx请求处理流程](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/request-deal.png)