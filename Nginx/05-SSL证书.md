# SSL证书

**证书分类**
- 域名验证（DV证书）验证域名归属是否正确（免费）
- 组织验证（OV证书）可以验证证书填写信息是否正确（付费）
- 扩展验证（EV证书）会在浏览器输入框最左侧显示公司信息

**证书申请及使用程流**
- PKI公钥基础设施
![证书申请及使用流程](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/certificate.png)
- 证书申请人通过登记机构向CA机构发出证书申请
- CA认证通过后 返回公钥和私钥 并保存公钥
- 证书申请人拿到证书 部署到服务器
- 浏览器访问站点 第一步请求证书 服务器将公钥证书发给浏览器
- 浏览器需要验证公钥是否合法、有效（一般证书是一年有效期）去CA指定服务器查询
- CA机构会把过期证书放到指定服务器
  - CRL服务器（将过期证书生成链条，性能差）
  - OCSP响应程序（可以就一个证书去查询是否过期，性能有所提高 但还是差）

一般情况下服务器有一个OCSP开关 可主动去查询证书是否有效，\
所以，浏览器可通过服务器获取到证书是否有效

CA机构不对网站可用性负责

**证书链**
![证书链](https://raw.githubusercontent.com/luobosiji/blog/master/resources/nginx/certificateChain.png)
- 根证书 （验证是非常谨慎的，被浏览器内置，不需要发送）
- 二级证书 （签发机构是根证书）
- 主证书

服务器向客户端发送两个证书（二级证书+主证书）

验证证书，本质是验证颁发机构的根证书是否有效