# JSX
>在js中直接写HTML标记
- 本质是动态创建组件的语法糖
```javascript
const name = 'hah'
const element = <h1>hello,{name}</h1>
// 等价于
const element = React.createElement(
  'h1',
  null,
  'hello,',
  name
)
```
- JSX表达式
  - 本身就是表达式,也可以包含表达式
    - `<li>{props.message}</li>`
  - 属性表达式
    - `<MyComponent foo={1+2}>`
  - 延展属性
  ```javascript
  const props = {first:'haha', last:'xixi'}
  const greeting = <Greeting {...props}>
  ```
- JSX优点
  - 直观
  - 灵活
  - 无需学习新的模板语言
  