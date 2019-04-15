# Function 类型
**函数声明与函数表达式**

- 代码开始执行之前,解析器就通过**函数声明提升**将函数声明添加到执行环境中
- 函数表达式不存在函数声明提升 因为函数位于初始化语句中
```javascript
fun() //正常执行
function fun(){
  //这是函数声明
}
fun2() //报错 'unexpected identifier' 意外标识符
var fun2 = function(){
  //这是函数表达式
}
```
**函数内部属性**
- `arguments` 数组 包含传入函数的参数
  - `callee` 指针 指向拥有*arguments*的函数
- `this` 指向函数据以执行的环境对象
- `caller` 保存着当前函数的调用者的引用
  ```javascript
  function outer(){
    inner()
  }
  function inner(){
    //指向的事 outer()
    console.log(arguments.callee.caller)
  }
  ```

**prototype属性**
保存所有实例方法的真正所在

**方法**

方法 | 区别 | 作用 
-----|-----|-----
apply() | 参数是数组 | 扩充函数作用域
call() | 参数必须逐个列出来 
bind() | 返回是函数，它的参数和 call 一样

- 第一个参数都是 this 的指向对象
- 选用哪个方法取决于参数的使用方式