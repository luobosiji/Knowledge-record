# Vuex 状态管理
## 运行机制
![运行机制](https://raw.githubusercontent.com/luobosiji/blog/master/resources/Vue/Vuex.png)

## Vuex 使用
1. `npm install vuex --save`
2. `import Vuex from 'vuex'`
3. `Vue.use(Vuex)`
   ```javascript
   const app = new Vue({
     el: '#app',
     // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
     //需调用 Vue.use(Vuex)
     store,
     //子组件能通过 this.$store 访问到。
   })
      ```
4. 通过`this.$store.state.xxx`来访问
5. 通过`this.$store.commit('xxx',{arg})`来提交修改数据操作(Mutation)
6. 通过`this.$store.dispatch('xxx',{arg})`来进行异步修改数据操作(Action)
7. 通过`this.$store.getter.xxx` 来访问store的计算属性
8. 
**store**
```javascript
const store = new Vuex.Store({
  state: {
    count: 1, //响应式数据
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  // mutation 必须是同步函数
  mutations: {
    //应该使用常量替代 mutation 事件类型
    increment (state, payload) {}
  },
  //Action 提交的是 mutation，而不是直接变更状态
  //Action 可以包含任意异步操作
  actions: {
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment (context) {
      context.commit('increment')
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```



**简写形式**
```javascript
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
//带命名空间
...mapState('some/nested/module',{})
//命名空间辅助函数
// createNamespacedHelpers
//在 `some/nested/module` 中查找
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
computed: {
    ...mapState({
       // 箭头函数可使代码更简练
       count: state => state.count,
       // 传字符串参数 'count' 等同于 `state => state.count`
       countAlias: 'count',
       // 为了能够使用 `this` 获取局部状态，必须使用常规函数
       countPlusLocalState (state) {
         return state.count + this.localCount
       }
    }),
    //当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    ...mapState([
     // 映射 this.count 为 store.state.count
     'count'
    ]),
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ]),
    //如果起别名使用对象模式
    ...mapGetters({
     // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
     doneCount: 'doneTodosCount'
   })
},
methods: {
 ...mapMutations([
   'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

   // `mapMutations` 也支持载荷：
   'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
 ]),
 ...mapMutations({
   add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
 }),
 ...mapActions([
   'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

   // `mapActions` 也支持载荷：
   'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
 ]),
 ...mapActions({
   add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
 })
}
```


**使用常量替代 Mutation 事件类型**
```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})

```

### Module
```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

**命名空间 namespaced**
```javascript
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```