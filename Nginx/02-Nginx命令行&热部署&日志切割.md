# Nginx命令
**关于Nginx命令**
- `nginx -s reload`  格式
- `-?` `-h` 帮助命令
- `-c` 指定配置文件
- `-g` 指定配置指令
- `-p` 指定运行目录
- `-s` 发送信号
  - `stop` 立刻停止
  - `quit` 优雅停止
  - `reload` 重载配置文件
  - `reopen` 重新开始记录日志文件
- `-t/-T` 测试配置文件是否有语法错误
- `-v/-V` 打印nginx 的版本信息 编译信息



## 重载配置文件
`nginx -s reload`
>不停止服务,加载新的配置文件

**reload流程**
1. 向master进程发送HUP信号（reload命令）
2. master进程会校验配置语法是否正确
3. master进程会打开新的监听端口产生新master
4. 新master进程用新配置启动新的worker子进程
5. 旧master进程向老worker子进程发送QUIT信号
6. 老worker进程关闭监听句柄，处理完当前连接后结束进程(优雅退出)

![reload流程](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/reload.png)


## 热部署
>升级本质是更换配置文件

- `ps -ef | grep nginx` 查看运行状态
- `cp nginx nignx.old.bak` 将当前nginx 备份
- `cp -r 新nginx ...旧nginx`  新版本的nginx 替换旧版本
- `kill -USR2 xxxx进程号` 根据进程号 新启一个nginx master进程
  - 使用了最新二进制文件, 现在新旧两个同时运行,老进程不在监听端口, 新master生成新worker 平滑过渡
  - 旧master进程修改pid文件名，加后缀`.oldbin`
    - 因为通常不对worker直接发送信号，所以要保存旧的pid文件
  - 新master进程创建新的`pid.bin` 文件
- `kill -WINCH xxxx进程号` 优雅的关闭旧master的所有worker
  - 注意: 旧的master依然保留, 方便进行回退
  - 关闭老的master使用`QUIT`信号

![热部署](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/hot-deployment.png)

![热部署流程](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/hot-reload.png)

>**这里有个知识点：老master生成新master后，老master是新master的父进程，为什么父进程关闭后，子进程还在运行 ？**
- linux知识点： 父进程退出后，而子进程还在运行，则子进程会成为孤儿进程，将被init进程\（进程号为1）所收养，并由init进程对他们完成状态收集工作,所以老master退出后，新master不会退出


**worker进程优雅的关闭**
1. 设置定时器 `worker_shutdown_timeout`
   - 如果worker进程内部超过这个时间还没退出，则会立即退出
2. 关闭监听句柄
3. 关闭空闲连接
4. 在循环中等待全部连接关闭（这里有可能时间超过定时器）
5. 退出进程

## 日志切割
- `mv xxx.log bak.date.log` 移动旧日志到备份文件中
- `nginx -s reopen` 重新生成记录文件
  - 可生成切割脚本,通过`crontab` 定时执行
![定时日志切割](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/bakLog.png)


