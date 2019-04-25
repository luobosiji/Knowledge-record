# Vue简介

```javascript
//采用cdn方式加载Vue
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
//v-model 双向绑定
<input type="text" v-model="msg" />
//@click 是 v-on:click 简写 绑定点击事件
<input type="button" @click="handleClick" value="添加" />

//创建Vue实例
new Vue({
  el: '#app',
  data() {
    return {
      msg: '',
      lists: []
    }
  },
  methods: {
    handleClick() {
      this.lists.push(this.msg)
      this.msg = ''
    }
  }
})

/**
* Vue.component 缺点
* 1.这是全局定义
* 2.字符串模板不支持高亮
* 3.组件化时不支持css
* 4.没有构建步骤, 不能使用bable, 没有热更新
*/
//注册全局组件
Vue.component('todo-item', {
    //向父组件
    // prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
    props: ['item'],
    template: '<li>{{ item }}</li>'
})

//使用自定义组件
//:item="item" 给子元素props传出的属性赋值
<todo-item
  v-for="(item, index) in lists"
  :key="index"
  :item="item"
></todo-item>
```

## 采用单文件形式
```javascript
//引入组件
import TodoItem from "./components/TodoItem.vue";

//引入后需要注册组件
components: {
    TodoItem
}

//组件中模板
<template>
  <li class="item">
    <input type="checkbox" v-model="checked">
    //通过插槽绑定值的情况 向父组件进行**作用域插槽**传值
    <slot name="item" v-bind="{checked}"></slot>
  </li>
</template>
//组件中声明的属性
data() {
    return {
      checked: false
    }
  }
//使用组件
//v-slot:item="itemProps" 绑定插槽name 且 接收插槽传过来的属性 checked的值
`<todo-item v-for="item in list" :key="item">
        <template v-slot:item="itemProps">
          <span :style="{fontSize: '20px', color: itemProps.checked ? 'red': 'blue'}">{{item}}</span>
        </template>
      </todo-item>`
```