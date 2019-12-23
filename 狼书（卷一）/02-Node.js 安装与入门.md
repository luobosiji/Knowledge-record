# Node.js 安装与入门

## 3m安装法
- nvm（node version manager）：用于开发阶段，解决多版本共存、切换、测试等问题
  - nvm --version 查看版本号
  - nvm ls-remote 查看可安装Node版本
    - LTS（Long-Term Support） 按本指长期支持版本 一般在生产环境使用
    - Current版本指 当前正在开发的尝鲜版本 一般用于开发者学习新功能
    - 一般奇数版本都是尝试性的，偶数版本 都是LTS 非常稳定
  - nvm install 12.13.1 安装指定版本node
    - which node 查看node命令的安装目录
    - node -v 查看当前node版本
  - nvm alias default 设置系统默认node版本
  - nvm ls 列出当前有哪些本地版本
  - nvm use 8 切换指定版本的 node
  - nvm reinstall-packages 一键安装全局模块
    - 切换版本全局模块需要重新安装
- npm（node package manager）：包管理器 用于模块安装
  - npm install xxx 安装包命令 到dependencies 里 生产依赖
  - npm install xxx -D 安装到devDependencies 里 仅供开发使用
  - npm install xxx -g 全局安装
  - npm v2.x 依赖都在当前模块下，所以目录层级较多
  - npm v3.x 结构是扁平式的，多个包依赖 都是同级目录下，当依赖同一个包的多个版本时 才会使用v2.x的方式
- nrm（node registry manager）：切换下载源
  - npm install -g nrm 安装nrm
  - nrm test 测速 确定哪个源下载速度快
  - nrm ls 查看当前有哪些源
  - nrm use xxx 切换源
  - nrm add xxx http://xxxx.. 添加源
    - 用于企业内网部署私有npm源，安装快，安全
- nodemon

## Hello Node.js
- `node xxx.js` 执行js文件
  - node命令是解释器，解释并执行 xxx.js中的代码
- CommonJS
  - module.export 定义模块
  - require 关键字引用模块
- 起一个本地服务
  ```javascript
    const http = require('http')
    http.createServer((req,res)=>{
      res.writeHead(200,{'Content-Type':'text/plain'})
      res.end('Hello Node.js')
    }).listen(3000, '127.0.0.1')
  ```
## 编辑器与调试
- VSCode
  - 安装 code 命令
    - cmd + shift + p
    - shell command: install 'code' command in path 安装
      - 任意目录下键入code 可以打开目录下所有文件
    - shell command: uninstall 'code' command from path 删除
  - 调试
    - F5
    - 在 DEBUG 中添加配置
      ```json
        {
          "version": "0.2.0",
          "configurations": [
            {
              "type": "node",
              "request": "launch",
              "name": "Launch Program",
              "skipFiles": [
                "<node_internals>/**"
              ],
              // 当前无任何选中的情况下 会调试下面这个固定文件
              "program": "${workspaceFolder}/Node/Crawler-for-Github-Trending-master/test.js"
            },
            {
              "type": "node",
              "request": "launch",
              "name": "Launch Program from current file",
              "program": "${file}" //当前选中文件执行调试
            }
          ]
        }
      ```