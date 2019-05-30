# Nuxt
[Nuxt Document](https://zh.nuxtjs.org/guide/)

**单页SPA应用有哪些缺点?**
- 不利于SEO
  - 可通过SSR/phantomjs headlessChrome(无头浏览器) 来解决
    - 动态渲染配置繁琐
- 首屏渲染时间长
  - 预渲染 Prerendering 
    - 只适用于静态页面

**Nuxt的出现解决的问题**
- 静态站点
- 动态渲染
- 简化配置

**Nuxt原理**

![Nuxt底层原理](https://raw.githubusercontent.com/luobosiji/blog/master/resources/Vue/Nuxtsrc.png)





**无头浏览器**
> 没有图形界面的浏览器\
> 通过`User-Agent`字段 来判断是真实用户还是爬虫\
> 渲染数据之后返回给搜索引擎, 间接达到SEO的目的