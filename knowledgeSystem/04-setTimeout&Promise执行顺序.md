# setTimeout&Promise执行顺序
- setTimeout是宿主环境给JavaScript引擎提供的API，允许JavaScript在特定的时机执行（宏观任务）
- Promise 永远在队列尾部添加微观任务
- Promise 基本用法
```javascript
/*需要进行异步操作的函数，不返回真实结果，而返回一个“承诺”，
  函数调用方可以在合适的时机，选择等待这个承诺兑现（then方法回调）
*/ 
  function sleep(duration) {
      return new Promise(function(resolve, reject) {
          setTimeout(resolve,duration);
      })
  }
  sleep(1000).then( ()=> console.log("finished"));
```
- `async/await` 
  - 运行时基础是Promise
  - 提供了for、if 等代码结构来编写异步方法
  - async 函数必定返回Promise
  - async 函数可以嵌套
```javascript
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(name){
    await sleep(2000)
    console.log(name)
}
async function foo2(){
    await foo("a");
    await foo("b");
}

```


**概念：**
- JavaScript引擎会常驻于内存中，等待宿主传递代码或函数给它执行
  - 等待宿主环境分配宏观任务
  - 等待行为 是一个事件循环
- 宏观任务：每次执行的过程就是宏观任务（宿主发起的任务）
  - 在宏观任务中，promise会产生异步代码, js必须保证异步代码在一个宏观任务中完成
  - 每个宏观任务中又包含一个**微观任务队列**（JavaScript引擎发起的任务）
- 宏观任务队列：相当于事件循环
- 微任务始终先于宏任务
```javascript
    setTimeout(()=>console.log("d"), 0)
    var r = new Promise(function(resolve, reject){
        resolve()
    });
    r.then(() => { 
        var begin = Date.now();
        while(Date.now() - begin < 1000);
        console.log("c1") 
        new Promise(function(resolve, reject){
            resolve()
        }).then(() => console.log("c2"))
    });
//执行结果：c1 c2 d
```
- 如何分析异步执行顺序？
  - 首先分析有多少个宏任务
  - 每个宏任务中包含多少个微任务
  - 根据调用次序，确定红任务中的微任务执行次序
  - 根据红任务的触发规则和调用次序，确定宏任务的执行次序
  - 最后确定整个顺序