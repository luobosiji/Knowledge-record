# 虚拟Dom
>`createElement` 返回的不是一个实际的 DOM 元素。\
它更准确的名字可能是 `createNodeDescription`，\
因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。\
我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。\
“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

>背景:最初的框架 是通过更方便的操作Dom 来加快开发速度 如`jQuery`\
随着项目的变大,会出现很多地方操作Dom 不易维护\
便出现了 数据中间层 State 不直接操作Dom,通过事件更新数据,数据驱动视图的更新\
如何高效更新Dom?

`state + template => 生成虚拟Dom树`(数据+模板生成虚拟DOM树)\
虚拟Dom树 保存着节点信息/类型/属性/事件\
通过算法来比较 新旧Dom树 对比, 查找出要更新的节点 ,尽可能的复用Dom,提升我们的性能

**同层节点比较(两棵树双向对比)**
 ![同层节点比较](https://raw.githubusercontent.com/luobosiji/blog/master/resources/Vue/tongcengcompare.png)
 - 同层不同组件改变顺序,是移动Dom
   -  B C D => C B D
-  同层不同组件,改成上下层,是销毁在创建
   -  B C D => B(C) D (销毁C 创建C)
-  同层不同组件替换组件, 是销毁在创建
   -  B C(EF) D => B G(EF) D (销毁EFC 创建EFG)
-  同层相同组件改变顺序(无key)
   -  B1 B2(EF) B3 => B2(EF) B1 B3 (销毁EF 创建EF B1更新为B2 B2更新为B1) 
-  同层相同组件改变顺序(有key)
   -  B1 B2(EF) B3 => B2(EF) B1 B3 (更新B2)
-  相同组件插入组件(无key)
   -  B1 B2 B3 => B1 B4 B2 B3 (B2更新为B4 B3更新为B2 创建B3)
-  相同组件插入组件(有key)
   -  B1 B2 B3 => B1 B4 B2 B3 (创建B4)


**理解Vue的更新渲染机制/提升组件渲染性能/key的作用**

**思考: 为什么不能用index做key?**
>如果有ABC三个item，其中第一个A是选中的，这个时候如果我在A前面添加D，如果用index作为key就会变成D是选中的了