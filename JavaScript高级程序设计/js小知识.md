1. 延迟脚本 defer 
   - 在`</html>`之后执行
   - 脚本之间有先后顺序
2. 异步脚本  async 没有先后顺序
3. 严格模式 `"use script"` 编译指示
4. ECMAScript最值
   - Number.MIN_VALUE
   - Number.MAX_VALUE
   - 当进行浮点数比较时 应该使用最值进行比较 因为0.1+0.2≠0.3
5. 垃圾回收机制如何触发
   - 临界值
   - 周期运行
6. 管理内存：手动将全局变量置为`null`
7. 为什么基本类型可以使用实例方法?
     ```javascript
     var s1 = "string"
     var s2 = s1.substring(2)
      //实际上后台自动做如下处理
     var s1 = new String('string')
     var s2 = s1.substring(2)
     s1 = null
     ```
   执行s1.substring() 方法时 会进入读取模式
    1. 创建string实例 
    2. 调用实例方法
    3. 销毁实例(因为会销毁,所以不能添加属性和方法)

**内置对象**

(Object/Array/String)

由ECMAScript提供,不依赖宿主环境,程序执行之前就已经存在,不需要显示地实例化

**单体内置对象**

1. Global对象 "兜底对象" 全局变量/函数 都是Global属性
   1. 编码方法
      1. `encodeURIComponent()`
      2. `decodeURIComponent()`
   2. `eval()` 最强方法 相当于解析器,解析参数中的语句,成为实际代码,不存在变量提升
2. Math对象
    ```javascript
    Math.max() Math.min()
    //求数组最大值 
    Math.max.apply(Math, arrays)
    Math.ceil(25.9) // 26  向上舍入
    Math.floor(25.9) // 25 向下舍入
    Math.round(25.9)// 26 四舍五入
    //求一定范围内的随机值
    function selectFrom(lowerValue, upperValue){
      var choices = upperValue - lowerValue + 1
      return Math.floor(Math.random * choices + lowerValue)
    }
    ```
