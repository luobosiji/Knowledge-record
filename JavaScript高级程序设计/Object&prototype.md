# 理解对象&继承
 **创建对象的两种方式**
   1. `new Object()`
   2. 字面量  {}

**对象的属性类型**
 - 数据属性(包含数据值)
   - 数据属性的特性
     - `configurabale` true 能否delete 或修改数据特性(只能修改一次)
     - `enumerable` true 能否通过for-in遍历
     - `writable` true 能否改值
     - `value`  undefined 值
 - 访问器属性(不包含数据值)
   - 特性
     - `configurabale`
     - `enumerable`
     - `get`
     - `set`
  >要修改单个属性默认特性 使用  `object.defineProperty(obj, 'attrNmae', {describe key:value})`\
  >要修改多个属性 `object.defineProperties(obj,{attr-key-value})`
- 读取属性
  - `Object.getOwnPropertyDescriptor(obj, 'attrName')`

**创建对象的多种模式**
1. 工厂模式
   - 抽象了具体创建方式
     - 解决了创建多个相似对象产生大量重复代码的问题
     - 问题: 无法识别对象(不知道对象类型)
   ```javascript
   function createObj(name){
     var obj = new Object()
     obj.name = name
     obj.fun = function(){}
     return obj
   }
   var obj = createObj("name")
   ```
2. 构造函数模式
   - 要创建Person实例必须new 
     1. 创建一个新对象
     2. 将构造函数的作用域赋给新对象(this指向新对象)
     3. 执行构造函数中的代码(为新对象添加属性和方法)
     4. 返回新对象
   
   ```javascript
   function Person(name){
     this.name = name
     this.fun = function(){}
     //本质是创建了对象
     this.fun = new Function("")
     //问题: 当创建两个Person实例时 创建了两个完成同样任务的fun有点浪费
     //如果将函数定义转到全局在赋值给 person的fun
     //则: 1.全局函数只能被某个对象调用 不合理
     //   2.如果定义多个方法 则需要多个全局函数?
   }
   var person = new Person()
   ```
3. 原型模式(让所有对象实例共享原型对象中包含的属性和方法)
   - **理解原型**
       ![原型](https://raw.githubusercontent.com/luobosiji/blog/master/resources/proto.png)
     - 先访问实例中的属性和方法,没有则会去原型中找
     - 原型可以动态添加属性和方法`Person.prototype.name = 'name'`
     - **重写原型对象**会切断现有原型与任何之前已经存在的对象实例之间的联系
       ![重写原型](https://raw.githubusercontent.com/luobosiji/blog/master/resources/rewriteproto.png)
     - 通过原型可以修改原生对象的原型`String.prototype.newFun = function(){}`
     -  扩充类型的基础功能
       ```javascript
       Function.prototype.method = function(name, func){
         if(!this.prototype[name]){
           this.prototype[name] = func
         }
         return this
       }
       String.method('trim', function(){
         return this.replace(/^\s+|\s$/g, '')
       })
       "  as ".trim()
       ```
     - 缺点: 对于引用类型值的属性多个实例会修改同一份数据
    ```javascript
     //返回ture 则证明person.__proto__ = Person.prototype
     Person.prototype.isPrototypeOf(person)
     //返回person.__proto__指向的原型对象 Person.prototype
     Object.getPrototypeOf(person)
     //返回true 则属性或方法在实例中 而不是原型上
     obj.hasOwnProperty('attrNmae')
     //in 操作符 会在通过对象能够访问给定属性时返回true
     name in obj
     //获得所有实例属性
     Object.keys(Person.prototype)
     Object.getOwnPropertyNames(Person.prototype) //包含不可枚举
     //原型对象赋值简写形式(重写原型对象)
     Person.prototype = {
       constructor: Person,
       ...
     }
   ```
4. 组合 构造函数+原型模式
   - 构造函数用来定义属性
   - 原型模式用于定义方法和共享属性
   - 每个实例都有自己的一份实例属性副本,又共享方法的引用,最大限度节省内存
   ```javascript
   function Person(name) {
     //这里添加属性
     this.name = name
   }

   Person.prototpye = {
     constructor: Person,
     //这里添加方法
     fun...
   }
   var person = new Person('name')
   ```

## 通过原型链实现继承
>原型对象等于另一个对象的实例\
>原型对象包含一个指向另一个原型对象的指针,另一个原型对象包含指向另一个构造函数的指针.\
>另一个原型又是另一个对象的实例
>层层递进 构成**原型链**
![原型链](https://raw.githubusercontent.com/luobosiji/blog/master/resources/protoChain.png)
![继承](https://raw.githubusercontent.com/luobosiji/blog/master/resources/inheritance.png)
- 问题一: 引用类型的值,所有实例共享一份
  - **函数只不过是在特定环境中执行代码的对象**
  - 解决方式: 借用构造函数 (通过apply() call() 在新创建的对象上执行构造函数)
  
**组合继承**(原型链+ 借用构造函数)
  - 问题: 每次都会调用两次父类构造函数
```javascript
function SuperType() {}
function SubType() {
  //借用构造函数 继承属性
  SuperType.call(this)
}
//改变原型 继承方法
SubType.prototype = new SuperType()
//指向SubType 弥补重写原型而丢失的默认的constructor属性
SubType.prototype.constructor = SubType
var sub = new SubType()

```
**寄生组合式继承**
```javascript
function superType(){}
function subType(){
  superType.call(this)
}
inheritPrototype(subType, superType)
var sub = new subType()
//创建父类原型副本,添加constructor属性, 赋值给子类型的原型
function inheritPrototype(subType, superType){
  //Object.create方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
  var prototype = Object.create(superType.prototype) 
  prototype.constructor = subType //
  subType.prototype = prototype
}
```

