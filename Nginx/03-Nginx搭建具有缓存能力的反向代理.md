# Nginx搭建具有缓存能力的反向代理
- `ngx_http_proxy_module`
**nginx有哪些作用**
- 反向代理
  - 代理接收请求，转发到上游服务器
  - 缓存
- 负载均衡（通常服务器需要处理复杂业务逻辑，需要通过添加服务器来提升服务器处理性能，及稳定性）
  - 代理接收请求，转发给多台上游服务器
  - 某台上游服务器出现问题，会转交给其它正常服务器

```conf
http {
# proxy_cache_path  缓存文件路径 /tmp/nginxcache 这个路径指向电脑根路径可通过 cmd+shift+G 前往找到
# 参数 levels 设置缓存文件目录层次； 1：2 表示两级目录
# keys_zone 设置缓存名字和共享内存大小
# inactive 缓存时间 超过时间没人访问则会被删除
# max_size 最大缓存空间，如果缓存满则覆盖掉缓存时间最长的资源

    proxy_cache_path /tmp/nginxcache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m use_temp_path=off ;
    upstream local{ #这里是代理的上游服务器
        server 127.0.0.1:8083;
    }

    server {
        listen       8082;
        server_name  localhost;
        location / {
            # 自定义http header头 用于接收真实用户访问端的信息(不使用这种方法 取到的数据是代理服务器的)
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_cache my_cache; #使用名为my_cache的缓存

            proxy_cache_key $host$uri$is_args$args; 定义缓存唯一的key，通过key来进行hash存取 （可以用来指明哪个用户访问的那个资源）
            proxy_cache_valid 200 304 302 1d; #对对应状态缓存的时间为1天
            proxy_pass http://local; #这里是定义好的local 指代理后转发的路径 （被代理服务器的地址）
        }
    }
}

```

**注：** 
- 测试方法
  - 可在本地搭建两个nginx服务，一个代理另一个
  - 被代理服务 可通过配置`listen 127.0.0.1:8083;` 来设置 只能本地访问
- 代理后 可通过响应头的 `server` 字段查看响应来源