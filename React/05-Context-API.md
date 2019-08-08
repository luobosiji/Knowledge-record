# Context API
- Provider 提供数据
- Consumer 获取数据
- 一定要有父子组件包含关系

```javascript
// 创建上下文
const LocaleContext = React.createContext(enStrings);

<LocaleContext.Provider value={this.state.locale}>
  {this.props.children}
  // 一定要将子组件内容包含到里边
  // 如果不是父子组件包含关系，则取到的是LocaleContext 默认值
</LocaleContext.Provider>


<LocaleContext.Consumer>
// 函数作为子组件
  {locale => (
    // 这里的locale就是 provider传过来的value
  )}
</LocaleContext.Consumer>

```