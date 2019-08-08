# 异步action&Middleware
- 异步action不是特殊action，而是多个同步action的组合使用
- 中间件在dispatcher中截获action做特殊处理
  - 截获action
  - 发出action
```javascript
// 异步 action 创建函数
// 当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。
// 这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。
// 这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。
export function fetchPosts(subreddit) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function (dispatch) {
    // API 请求发起了。
    dispatch(requestPosts(subreddit))

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。
    // 这个案例中，我们返回一个等待处理的 promise。

    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        // 不要使用 catch，因为会捕获
        // 在 dispatch 和渲染中出现的任何错误，
        // 导致 'Unexpected batch number' 错误。
        // https://github.com/facebook/react/issues/6895
         error => console.log('An error occurred.', error)
      )
      .then(json =>
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。
        dispatch(receivePosts(subreddit, json))
      )
  }
}
```

**Action/Reducer**
- 每个Action和相关Reducer 应放在单独文件
  - 如果所有Action放在一个文件，会无线扩展，且不够直观
  - 如果Action、Reducer分开，实现业务逻辑需要来回切换
```javascript
//actions.js 导出所有actions
export { addTodo } from './addTodo';
export { completeTodo } from './completeTodo';
//constants.js 导出所有 ActionsType
export const TODO_ADD_TODO = 'TODO_ADD_TODO';
export const TODO_COMPLETE_TODO = 'TODO_COMPLETE_TODO';
// addTodo.js（单个action和reducer 放在一个文件）
import { TODO_ADD_TODO } from './constants';

export function addTodo(text) {
  return {
    type: TODO_ADD_TODO,
    text,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODO_ADD_TODO:
      return {
        ...state,
        todos: ...
      };

    default:
      return state;
  }
}
// reducers.js 导出所有的reducers
import initialState from './initialState';
import { reducer as addTodoReducer } from './addTodo';
import { reducer as completeTodoReducer } from './completeTodo';
import { reducer as deleteTodoReducer } from './deleteTodo';
import { reducer as clearCompletedReducer } from './clearCompleted';
import { reducer as completeAllReducer } from './completeAll';
import { reducer as editTodoReducer } from './editTodo';

const reducers = [
  addTodoReducer,
  completeTodoReducer,
  deleteTodoReducer,
  clearCompletedReducer,
  completeAllReducer,
  editTodoReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}

```



**不可变数据（Redux运行基础）**
>不可以直接修改的数据
- 复制值，返回新对象
  - 性能优化（判断数据是否变化，根据对象的引用就可以，不用比较具体的值）
  - 易于调试跟踪
- 如何操作
  - .../Object.assign({},xxx,xxx)
    ```javascript
    const state = {filter: 'completed', todos: ['learn react']}
    const newState = {...state, todos:[
      ...state.todos,
      'learn redux'
    ]}
    const newState2 = Object.assign({}, state, {todos:[
      ...state.todos,
      'learn redux'
    ]})
    ```
  - immutability-helper （用于层次比较深的更新）
    ```javascript
    import update from 'immutability-helper'

    const state = {
      filter:'completed',
      todos:['Learn React']
    }

    const newState = update(state, {todos:{$push:['Learn Redux']}})
    ```
  - immer（适用小型应用、性能略差）
    ```javascript
    import produce from 'immer'

    const state = { filter:'completed', todos:['learn react']}

    const newState = produce(state, draftState =>{
      draftState.todos.push('learn redux')
    })
    ```