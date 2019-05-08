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

## 热部署
>升级本质是更换配置文件
- `ps -ef | grep nginx` 查看运行状态
- `cp nginx nignx.old.bak` 将当前nginx 备份
- `cp -r 新nginx ...旧nginx`  新版本的nginx 替换旧版本
- `kill -USR2 xxxx进程号` 根据进程号 新启一个nginx master进程
  - 使用了最新二进制文件, 现在新旧两个同时运行,老进程不在监听端口, 新master生成新worker 平滑过渡
- `kill -WINCH xxxx进程号` 优雅的关闭旧master的所有worker
  - 注意: 旧的master依然保留, 方便进行回退

![热部署](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/hot-deployment.png)

## 日志切割
- `mv xxx.log bak.date.log` 移动旧日志到备份文件中
- `nginx -s reopen` 重新生成记录文件
  - 可生成切割脚本,通过`crontab` 定时执行
![定时日志切割](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/bakLog.png)