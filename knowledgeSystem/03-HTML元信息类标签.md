# 元信息类标签
>HTML用于描述文档自身的一类标签，通常出现在head标签中，一般都不会在页面被显示出来\
>多出情况是给浏览器、搜索引擎等机器阅读
- head标签
  - 盛放其它语义类标签的容器
  - 必须是html中的第一个标签
  - 必须包含一个title
    - `title` 作为元信息，可能会被用在浏览器收藏夹、微信、微博等各种场景，\
      这时往往是上下文缺失的，所以title应该完整概括整个网页内容
  - 最多只能包含一个`base`
    - 给页面上所有的URL相对地址提供一个基础（不建议使用）
- meta标签
  - name表示元信息的名、content表示元信息的值
  - `<meta charset='UTF-8'>`，描述HTML文档编码形式
  - `http-equiv`表示执行一个命令
    - `<meta http-equiv='content-type' content="text/html"; charset=UTF-8>` \ 表示添加了 content-type这个http头，并指定了http编码方式
  - `name='viewport'` 它的content是一个复杂结构，用逗号分隔的键值对 key=value
    - `<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">`




## 补充
**http-equiv的命令**
![http-equiv的命令](https://github.com/luobosiji/blog/blob/master/resources/knowledgeSystem/http-equiv.png)

**viewport属性**
![viewport属性](https://github.com/luobosiji/blog/blob/master/resources/knowledgeSystem/viewport.png)

**其它预定义meta**
![其它预定义meta](https://github.com/luobosiji/blog/blob/master/resources/knowledgeSystem/other.png)