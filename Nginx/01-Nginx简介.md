# Nginx
[官网地址](http://nginx.org/)

**mac下安装工具 homebrew**

- `brew update`  顺手更新一下 正常结果：1Already up-to-date.
- `brew search nginx`   查询要安装的软件是否存在
- `brew info nginx`   查看nginx信息
  ![brew info nginx](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/brew-info-nginx.png)
- `brew install nginx` 安装命令
  - `/usr/local/etc/nginx/`
  - `/usr/local/var/www/`
- `nginx`  启动
- `nginx -s reload`  修改配置后重新加载生效
- `nginx -s stop`  :快速停止nginx
- `nginx -s quit`  ：完整有序的停止nginx
- `brew uninstall nginx`  卸载命令

**从官网下载**

[地址](http://nginx.org/en/download.html)
> 这种方式下载的完整功能版
- 可以在官网直接下载安装
- 也可以给你通过命令行方式下载
  - `get+url`
  - `wget+url`
  
`tar -xzf nginx-1.16.0.tar.gz`  解压nginx安装包

下载/解压/configure编译/make编译/make install安装

**关于安装包目录**

`cd nginx-1.16.0`
- CHANGES		  版本有哪些变化
![CHANGES](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/changes.png)
- CHANGES.ru  俄罗斯版本文件
- LICENSE		
- README		
- auto/		脚本执行时看nginx 支持哪些模块 有什么特性供给nginx使用
  - cc/ 用于编译 
  - lib/  lib库
  - os/ 操作系统环境判断
  - ...
- conf/ **示例文件** 为方便维护 拷贝到安装目录
- configure **编译文件** 生成中间文件,执行编译前的必备动作	
- contrib/	提供脚本 及vim色彩工具(将contrib/vim目录 拷贝到自己vim目录中)
  - `cp -r contrib/vim/* ~/.vim/`
- html/ 标准文件
  - 50x文件  index文件
- man/  ngixn 帮助文件
- src/  nginx源码

`./configure --help | more` 查看编译文件 支持哪些参数
- 第一类参数 ngixn执行中 会去找哪些目录文件 作为辅助文件
```
--prefix=PATH                      set installation prefix **默认指定这一个参数** 其它参数会在这个下边建相应文件夹
--sbin-path=PATH                   set nginx binary pathname
--modules-path=PATH                set modules path 动态模块
--conf-path=PATH                   set nginx.conf pathname
--error-log-path=PATH              set error log pathname
--pid-path=PATH                    set nginx.pid pathname
--lock-path=PATH                   set nginx.lock pathname 确定nginx.lock文件的位置
```
- 第二类参数 
  - --with  默认没使用 加--with 使用
  - --without 默认在使用 加 --without 移除
- 第三类参数 是一些特殊参数

**开始编译**

`./configure --prefix=${指定目录}`
>执行命令后 会在当前目录生成一些中间文件 在 `objs/`目录下
- `objs/ngx_modules.c` 文件 决定编译中有哪些模块被编译进nginx

可以看到生成的目录结构
![目录](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/mulu.png)

执行`make` 编译

执行`make install` 安装
- 会在`objs/`下生成编译文件和二进制文件
- `objs/src` 编译文件

**nginx版本升级**
把`objs/nginx` 拷贝到安装目录中

打开安装的指定目录
- conf/ 配置文件 跟源目录的conf内容相同
- html/ 
- sbin/ 二进制文件
- logs/ 日志文件


**启动nginx**
- 在`sbin/`目录下 执行`./nginx`
- 重启执行 `./nginx -s reload`

**关于Nginx.conf配置**
- 由指令+指令块构成
  - http配置的指令块
    - `http` 表示所有指令都是有http模块解析的
    - `server` 对应的一个或一组域名
    - `location` url表达式
    - `upstream` 上游服务,需要与其它服务交互时使用
- 每条指令以 `;` 号结尾, 指令与参数 空格分隔
- 指令块{} 将多条指令组织在一起
- `include`允许组合多个配置文件, 提升可维护性
- `#`号添加注释
- `$` 使用变量
- 部分指令参数支持正则表达式
- 单位
  - 时间单位
    - ms 毫秒
    - s 秒
    - m 分
    - h 小时
    - d 天
    - w 周
    - M 月/30天
    - y 年/365天
  - 空间单位
    - 默认 bytes
    - k/K 字节
    - m/M 
    - g/G
```
http{
  gizp on;  采用gizp 压缩
  gzip_min_length 1;  小于多少字节 就不执行压缩
  gzip_comp_level 2;   压缩级别
  gizp_type ...;  针对哪些文件压缩


    #定义日志格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
      #                  '$status $body_bytes_sent "$http_referer" '
      #                  '"$http_user_agent" "$http_x_forwarded_for"';

  server{
    listen 8080 监听端口
    location / {  url路径   `/` 表示所有请求
      alias xxx/;  表示映射到xxx/目录 与url路径一一对应
      autoindex on; 显示url下的所有目录文件
      set $limit_rate 4k; 限制带宽(限制每秒传输速度)
    }
    所在位置决定日志打印哪一类请求
    access_log logs/access.log main;  路径+日志格式(main为提前定义好的)
  }
  
} 
```


**关于Nginx**
- 版本号
  - 双数 稳定版本 stable version 如 1.16.0
  - 单数 有新功能,暂时不稳定版本 mainline version(主线版本) 如1.15.12
    - Feature: 新增功能
    - Bugfix: 修复Bug
    - Change: 做了重构
- 优点
  - 高并发/高性能
  - 可扩展性好
  - 高可靠性
  - 热部署
  - BSD许可证
- 使用场景
  - 静态资源服务
    - 通过本地文件系统提供服务
  - 反向代理服务
    - 强大性能
    - 缓存
    - 负载均衡
  - API服务
    - OpenResty
- Nginx的组成
  - nginx.conf 配置文件
  - nginx 可执行的二进制文件
  - access.log 访问日志
  - error.log 错误日志