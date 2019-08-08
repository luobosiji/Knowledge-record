# React Router
- 三种路由实现方式
  - url路径 BrowserRouter
  - hash路由 HashRouter
  - 内存路由  MemoryRouter 
    - 一般做服务端渲染时使用
    - 不会显示在url上
    - `<MemoryRouter> 包裹 route</MemoryRouter>`
  

```javascript 
<Router>
  <div>
    <Link to='/home'>home</Link>
    // 这里是展示对应组件的位置
    <div id="page-container">
      <Route path='/home' component={Home}/>
    </div>
  </div>
</Route>

```
- `<Link>` 普通链接，不会触发浏览器刷新
  ```javascript
  import { Link } from 'react-router-dom'
  <Link to='/about'>About</Link>
  ```
- `<NavLink>` 类似Link 但是会添加当前选中状态
  ```javascript
  import { NavLink } from 'react-router-dom'
  <NavLink to='/about' activeClassName='selected'>About</NavLink>
  ```
- `<Prompt>` 满足条件时提示用户是否离开当前页面
  ```javascript
  import { Prompt } from 'react-router'
  <Prompt when={formIsHalfFilledOut} message='Are you sure you want to leave'/>
  ```
- `<Redirect>` 重定向当前页面，例如登录判断
  ```javascript
  import { Route, Redirect } from 'react-router'
  <Switch exact path='/' render={()=>(
    loggedIn ? (
        <Redirect to='/dashboard'/>
      ) : (
        <PublicHomePage/>
      )
  )}/>
  ```
- `<Router>` 路由配置的核心标记，路径匹配时显示对应组件
  ```javascript
  // exact 标识是否精确匹配path
  // 默认不是排他的，如果两个path都匹配 则都显示
  import { BrowserRouter as Router, Route } from 'react-router-dom'
  <Router when={formIsHalfFilledOut} message='Are you sure you want to leave'>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/news' component={News}/>
    </div>
  </Router>
  
  ```
- `<Switch>` 只显示第一个匹配的路由
  ```javascript
  import { Switch, Route } from 'react-router'
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/about' component={About}/>
    <Route path='/:user' component={User}/>
    <Route component={NoMatch}/>
  </Switch>
  ```

**通过URL传递参数**
>c16 c17
- 通过url传递参数
  - `<Route path='/topic/:id' .../>`
  - 嵌套组件路由，需要匹配上一级路径
- 获取阐述
  - `this.props.match.params`
```javascript
const Topic = ({ match }) => (
  <h1>Topic {match.params.id}</h1>
);
export default class RouterParams extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/topic/1">Topic 1</Link>
            </li>
          </ul>
          <div id="page-container">
            <Route path="/topic/:id" component={Topic} />
          </div>
        </div>
      </Router>
    );
  }
}
```
- https://github.com/pillarjs/path-to-regexp