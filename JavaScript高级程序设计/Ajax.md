# XMLHttpReuqest
>Ajax核心技术 简称XHR
```javascript
//不考虑兼容性
var xhr = new XMLHttpRequest(); 
//监听响应 每当 readyState（存有 XMLHttpRequest 的状态）改变时，就会触发 onreadystatechange 事件。
xhr.onreadystatechange=function(){ 
    if (xhr.readyState==4 && xhr.status==200) {  
       xhr.responseText //获得字符串形式的响应数据。 
       //当Content-Type 的MIME类型被指为XML时返回
       //responseXML 获得 XML 形式的响应数据。
       //HTTP状态的说明
       xhr.statusText
    }
}
//xhr.readyState 的值
//0: 请求未初始化    还没有调用 open()）。
//1: 服务器连接已建立    还没有调用 send()
//2: 请求已接收    （通常现在可以从响应中获取内容头）。
//3: 请求处理中    通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
//4: 请求已完成，且响应已就绪

//设置头部信息
xhr.setRequestHeader('Content-Type','...')
//GET请求
xhr.open("GET","/try/ajax/demo_get.php",true); 
//POST请求
xhr.open("POST","/try/ajax/demo_post.php",true); 
// 参数是要发送的数据 ,没有则为null
xhr.send(null);
//暂停请求发送或者响应接收, 将XHR对象置为初始状态
xhr.abort()


```
- `overrideMimeType()` 重写MIME类型 决定XHR如何处理数据 在`send()`方法之前调用
- `send(new FormData(data))` 格式化数据,XHR可以识别FromData实例,配置适当的头部信息

**进度事件**
 - `loadstart` 接收到响应数据的第一个字节时触发
 - `progress` 周期性触发 包含进度 用作指示器
 - `error` 错误时触发
 - `abort` 终止连接触发
 - `load` 接收完整响应触发
 - `loadend` 通信完成或 触发 error/abort/load 事件后触发

**跨域相关**
>**跨域安全策略**: 默认情况下XHR对象 只能访问与包含它的页面位于同一个域中的资源,可以预防恶意行为.

解决方案:
- CORS(Cross-Origin Resource Sharing 跨资源共享)
  - 请求头添加 `Origin: (协议/域名/端口)`
  - 服务器认为可以接受 则在`Access-Control-Allow-Origin` 中返回*或相同源信息
  - 如果没有这个头部,则浏览器会驳回请求
  - *XHR对象实现了对CORS原生的支持,所以无需编写代码就可触发这个行为*
- 带凭据的请求(cookie/http认证/客户端SSL证明...)
  - `withCredentials` 设置为true
  - 如果服务器接受 会返回`Access-Controle-Allow-Credentials: true`

- 其它跨域技术
  - 图像Ping(单向跨域通信)
    - 使用`<img>`标签 通过侦听load error事件来看响应什么时候收到
      - 只能发送GET
      - 无法得到响应
      ```javascript
      var img = new Image()
      img.onload = img.onerror = function(){ ... }
      img.src="..."
      ```
  - JSONP
    - 本质是动态创建script标签
      - 不安全
      - 确定请求是否失败很不容易
    ```javascript
    function handleResponse(data){
      //回调
    }
    var script = document.createElement('script')
    script.src = "...?callback=handleResponse"
    document.body.insertBefore(script, document.body.firstChild)
    ```
  - webSocket
  ```javascript
  var scoket = new WebSocket("url")
  var message = {
    key: value,
    ...
  }
  socket.send(JSON.stringify(message))
  //socket.onopen
  //socket.onerror
  //socket.onclose
  socket.onmessage = function(event){
    //event.data
  }
  socket.close()
  ```