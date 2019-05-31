# JavaScript类型
1. Undefined
   1. 表示未定义，这个类型只有一个值 就是undefined
   2. undefined是一个变量，而不是关键字
   3. 为了避免undefined变量被篡改 建议使用`void 0 `来获取undefined值
2. Null
   1. null 语义表示空 null是js中的关键字
3. Boolean
   1. true false
4. String
   1. 一旦字符串构造出来，无法用任何方式改变字符串的内容，所以字符串具有值类型的特征
   2. 字符串的最大长度受字符串的编码长度影响
5. Number
   1. 为了不让除以0出错，而引入无穷大
   2. NaN
   3. Infinity 无穷大
   4. -Infinity 负无穷大
   5. 区分 +0 -0
      - 1/x === Infinity 则是 +0
      - 1/x === -Infinity 则是-0
6. Symbol
   1. Symbol 是 ES6 中引入的新类型，它是一切非字符串的对象key的集合
7. Object