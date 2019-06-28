# 堆栈和队列
> 20/232/225
- Stack
  - 先进后出
- Queue
  - 先进先出
- 相同点
  - 查找时间复杂度为O(n)
  - 插入删除为O(1)

- 20.有效的括号
```javascript
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
var isValid = function(s) {
    let map = new Map([[')','('],['}','{'],[']','[']])
    let stack = []
    let x = s.split('').some(item=>{
        if(map.has(item)){
            if(stack.pop() !== map.get(item)){
                return true
               }
        } else {
            stack.push(item)
        }
    })
    if(stack.length === 0 && !x){
       return true
       }
    return false
};

```