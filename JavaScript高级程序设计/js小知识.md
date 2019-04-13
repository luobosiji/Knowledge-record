1. 延迟脚本 defer 
   - 在`</html>`之后执行
   - 脚本之间有先后顺序
2. 异步脚本  async 没有先后顺序
3. 严格模式 `"use script"` 编译指示
4. ECMAScript最值
   - Number.MIN_VALUE
   - Number.MAX_VALUE
   - 当进行浮点数比较时 应该使用最值进行比较 因为0.1+0.2≠0.3
5. 垃圾回收机制如何触发
   - 临界值
   - 周期运行
6. 管理内存：手动将全局变量置为`null`