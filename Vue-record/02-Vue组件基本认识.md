## 组件的三大核心
## 属性
>Prop 是单向数据流\
单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行\
**不应该在一个子组件内部改变 prop**
### 自定义属性 props
- 子组件试图改变一个 prop 的情形:

```javascript
//通过传递值
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
//通过计算属性
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
- props的验证
```javascript
Vue.component('my-component', {
//不建议使用这种方式
//props: ['name', 'type', 'list', 'isVisible'],
//inheritAttrs: false //关闭原生属性的自动挂载
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    //这种形式可以调用父组件中定义方法 来改变props数据
    onChange: {
      type: Function,
      default: () => {}
    }
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})

```
### 原生属性 attrs
>没有声明,默认挂载到组件的根元素上,
>`关闭原生属性的自动挂载,//inheritAttrs: false,`

### 特殊属性 class style
>挂载到组件的根元素上, \
>`:style`优先级高于 `style` 内容会进行合并


## 事件
- 普通事件
    - v-on:click (简写 @click)
    - this.$emit('xxx', ...)
- 修饰符事件
    - @click.stop
    - @input.trim

## 插槽
- 普通插槽
    - slot='xxx' (2.6以下老语法,多个相同名称插槽会合并)
    - slot='xxx' slot-scope='props'(多个相同名称插槽会替换)
- 作用域插槽
    - v-slot:xxx='props' (多个相同名称插槽会替换)
    