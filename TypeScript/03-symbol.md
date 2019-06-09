# symbol
>用来表示独一无二的值，通过Symbol函数生成
- 创建
  ```javascript
  const s = Symbol();
  typeof s; // 'symbol'

  const s1 = Symbol("lison");
  const s2 = Symbol("lison");
  console.log(s1 === s2); // false
  //可以转换为字符串和布尔类型值
  console.log(s1.toString()); // 'Symbol(lison)'
  console.log(Boolean(s1)); // true
  ```
- 作为属性名
  ```javascript
  let name = Symbol();
  let obj = {
    [name]: "lison"
  };
  console.log(obj); // { Symbol(): 'lison' }
  console.log(obj[name]); // 'lison'

  ```
- 属性名遍历
  - Symbol类型值作为属性名，不会被for...in遍历,也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()获取到
  - 可通过`Object.getOwnPropertySymbols(obj)` 来获取对象的所有symbol类型属性名
  - 可通过`Reflect.ownKeys(obj)` 来获取所有类型的属性名
- Symbol.for()
  - 使用这个方法创建的symbol 会在全局范围进行注册
  - 会先检查有没有使用该字符串调用Symbol.for方法创建的symbol值，有就返回，没有就创建
- Symbol.keyFor(）
  - 传入symbol值，返回该值在全局注册的键名
```javascript
const s3 = Symbol.for("lison");
const s4 = Symbol.for("lison");
s3 === s4; // true
const sym = Symbol.for("lison");
console.log(Symbol.keyFor(sym)); // 'lison'
```

## 11个内置的symbol值
- Symbol.hasInstance
  - 对象使用instanceof判断是否为这个对象的实例时，会调用定义的方法，参数是该对象
```javascript
const obj = {
  [Symbol.hasInstance](otherObj) {
    console.log(otherObj); // 这里会输出对象 { a: "a" }
  }
};
// 这里你可以使用类型断言，将obj改为obj as any
console.log({ a: "a" } instanceof obj ); // false
```
- Symbol.isConcatSpreadable 为false时 数组在concat方法中不会被扁平化
```javascript
let arr = [1, 2];
console.log([].concat(arr, [3, 4])); // 打印结果为[1, 2, 3, 4]，length为4
let arr1 = ["a", "b"];
console.log(arr1[Symbol.isConcatSpreadable]); // undefined
arr1[Symbol.isConcatSpreadable] = false;
console.log(arr1[Symbol.isConcatSpreadable]); // false
console.log([].concat(arr1, [3, 4])); 
// 打印结果如下： 
// Symbol(Symbol.isConcatSpreadable): false 这个是数组的属性值
// [ ['a', 'b', Symbol(Symbol.isConcatSpreadable): false], 3, 4 ]
// arr1[Symbol.isConcatSpreadable] = true; 则为默认情况
// ['a','b',3,4]
```
- Symbol.species
  - 定义一个静态get存取器方法，方法名为Symbol.species
  - 在这个方法中返回要构造衍生数组的构造函数
```javascript
// 只想让衍生数组是Array的实例
class C extends Array {
  static get [Symbol.species]() {
    return Array;
  }
  getName() {
    return "lison";
  }
}
const c = new C(1, 2, 3);
const a = c.map(item => item + 1);
console.log(a); // [2, 3, 4]
console.log(a instanceof C); // false
console.log(a instanceof Array); // true
console.log(a.getName()); // error a.getName is not a function
// 这时 a不是c的实例 所有访问不到 getName方法
```
- Symbol.match
- Symbol.replace
- Symbol.search
- Symbol.split
  - 指向一个内部方法，当调用match、replace、search、split方法时会调用这个方法
```javascript
let obj = {
  [Symbol.match](string) {
    return string.length;
  }
};
console.log("abcde".match(obj)); // 5
```
- Symbol.iterator 指向默认遍历器方法
```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator);  //Array Iterator {}
console.log(iterator.next());//{value: 1, done: false}
console.log(iterator.next());//{value: 2, done: false}
console.log(iterator.next());//{value: 3, done: false}
console.log(iterator.next());//{value: undefined, done: true}
```
- Symbol.toPrimitive 指向一个方法，当对象被转为原始类型时会调用，参数为被转为的类型
```javascript
let obj = {
  [Symbol.toPrimitive](type) {
    console.log(type);
  }
};
// const b = obj++ // number
const a = `abc${obj}`; // string
```
- Symbol.toStringTag 
  - 当对象上调用toString方法时调用
  - 返回值”[object xxx]“ 中的xxx
  - 可以是字符串
  - 可以是存取器get方法
```javascript
let obj = {
  [Symbol.toStringTag]: "lison"
};
obj.toString(); // "[object lison]"
let obj2 = {
  get [Symbol.toStringTag]() {
    return "haha";
  }
};
obj2.toString(); // "[object haha]"
```
- Symbol.unscopables
  - 指向一个对象，包含了当使用with关键字时，哪些属性被with环境过滤掉
```javascript
console.log(Array.prototype[Symbol.unscopables]);
/*
{
    copyWithin: true
    entries: true
    fill: true
    find: true
    findIndex: true
    includes: true
    keys: true
    values: true
}
*/
```

## 在TS中使用symbol
- `let sym: symbol = Symbol()`
- `const key1: unique symbol = Symbol()`
  - unique symbol 是symbol的子类
  - 只能由Symbol()或Symbol.for()创建
  - 仅可用于常量的定义（const）、属性名
```javascript
const key1: unique symbol = Symbol()
let key2: symbol = Symbol()
const obj = {
    [key1]: 'value1',
    [key2]: 'value2'
}
console.log(obj[key1]) //value1
console.log(obj[key2])
// Type 'symbol' cannot be used as an index type
// error 类型“symbol”不能作为索引类型使用。
```