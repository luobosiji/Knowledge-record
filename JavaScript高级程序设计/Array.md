# Array类型

>如何确定某个对象是不是数组 ？
  >1. `value instanceof Array`  一个全局作用域下使用
  >2. `Array.isArray()`  多个全局作用域下使用（如多个框架）

**栈方法** 

通过`push() + pop()`数组可以表现的像栈一样，先进后出
  - `push()` 方法在数组末尾添加数据
  - `pop()` 方法从数组末尾移除数据

**队列方法**

通过`shift() + unshift()`数组可以表现的像队列一样，先进先出
  - `shift()` 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
  - `unshift()` 方法可向数组的开头添加一个或更多元素，并返回新的长度。

**重排序方法**

- `resvers()` 反转数组项的顺序
- `sort()`  参数是比较函数，比较的是通过`toString()`的字符串
  - 规则：比较函数 想要第一个在第二个参数之前则返回负数
    ```javascript
    //升序
    array.sort(function(value1, value2){
      return value1 - value2
    })
    ```
**操作方法**
- `concat()` 基于当前数组创建一个新数组(先创建一个副本,将参数添加到副本之后,返回新的数组)
- `slice()` 基于当前数组一项或多项,创建一个数组
  - `slice(0,2)` 获取数组`[0, 2)`位置的数组
  - 一个参数则返回该位置到末尾
  - 参数为负则 数组长度+该数 计算
- `splice(index, deleteLength, ...argList)`
  - 起始位置
  - 删除长度
  - 新增数据列表

**位置方法**
- `indexOf()` 从前往后查找
- `lastIndexOf()` 从后往前查找
  - (查找项, (可选)查找起点)

**迭代方法**

参数:`(function(item, index, array){}, thisValue)`

thisValue可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"
- `every()` 每一项为true 返回true
- `some()` 只要有一项为true 返回true
- `filter()` 返回数组( 为true的项 组成返回数组)
- `map()` 返回数组( 为每一项执行操作, 返回执行操作后的数组)
- `forEach()` 无返回 循环

**归并方法**
- `reduce()` 从前往后
- `reduceRight()` 从后往前
  - 迭代数组所有项,构建一个最终返回值
  ```javascript
  //参数
  (function(prev, cur, index, array){
    //函数返回值作为第一个参数 prev
    return xxx
  }, baseValue)
  //baseValue 是归并基础知识
  ```
