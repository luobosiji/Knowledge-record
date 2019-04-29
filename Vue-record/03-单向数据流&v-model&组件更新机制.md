# Vue是单向数据流
>所谓的双向绑定.是通过`v-model`实现的\
而`v-model` 其实是一个语法糖

```javascript
<PersonalInfo v-model="phoneInfo"/>
//相当于下边的简写形式
<PersonalInfo
      :phone-info="phoneInfo"
      @change="val => (phoneInfo = val)"
    />
//在子组件中 通过model的prop 来设置将传入的value传入到名为 phoneInfo的 prop中
//通过model的event 设置触发事件名称
model: {
    prop: "phoneInfo", // 默认 value
    event: "change" // 默认 input
  },
  props: {
    phoneInfo: Object
  },
// 子组件触发事件,通过 $emit传递给父组件,来修改内容
this.$emit("change", e.target.value);

```
**如果有多个需要 "双向绑定" 的值 则使用`.sync`修饰符**
```javascript
<PersonalInfo :zip-code.sync="zipCode" />
//等价于
<PersonalInfo
      :zip-code="zipCode"
      @update:zipCode="val => (zipCode = val)"
    />
// 子组件触发事件 通过如下方式 更新数据
this.$emit("update:zipCode", e.target.value);
```

**注: 触发组件更新机制**
 - `Object.defineProperty` 在实例化过程中会把Vue实例中的data选项中的所有属性转为`getter/setter`,它们让 Vue 能够追踪依赖,在属性被访问和修改时通知变更。
 - 每个组件实例都对应一个 `watcher` 实例，它会在组件渲染的过程中把**接触过的数据属性记录为依赖**。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
   - 必须在data中
   - 必须在模板中使用

**结论**
>`Object.defineProperty` 是用来响应式更新视图的,和双向绑定没有关系,\
双向绑定是通过`v-model` 语法糖来实现的,实际上是绑定数据,事件回调来修改数据的 , 修改数据 则触发setter, 通知 watcher