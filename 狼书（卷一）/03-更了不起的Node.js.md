# 更了不起的Node.js

## API网关

### 请求转发

```javascript
const http = require('http')

const app = http
  .createServer((req, res) => {
    if('/remote' === req.url){
      let status = 200
      res.writeHead(status, { 'Content-Type': 'text/plain' })
      res.end('Hello Remote Page\n')
    } else{
      console.log(req.url)
      proxy(req,res)
    }
  })

function proxy(req,res){
  let options = {
    host: req.host,
    port: 9000,
    headers: req.headers,
    path:'/remote',
    agent: false,
    method:'GET'
  }
  // http.request 是一次完整的HTTP请求
  let httpProxy = http.request(options, response => {
    // 将res放到response流中
    response.pipe(res)
  })

  req.pipe(httpProxy) // 使req有新的代理请求
}

app.listen(9000,'127.0.0.1', function(){
  const PORT = app.address().port
  console.log(`Server running at http://127.0.0.1:${PORT}/`)
} )
// 说到底 req和res 还是原本的状态，只不过中间让httpProxy拦截了一层而已


```

### 跨域JSONP支持