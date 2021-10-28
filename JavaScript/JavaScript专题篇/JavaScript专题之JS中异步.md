## 引言

异步编程的发展史是，
链式调用 => callback => Promise => async/await

在JavaScript中的异步机制可以分为一下几种实现方式

* 回调函数：调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱
* Promise：有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确
* generator：以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来
* async函数：async 函数是 generator 和 promise 实现的一个自动执行的语法糖，可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。


#### 1. promise的理解
promise是异步编程的一个解决方案，是一个对象，避免了地狱回调

(1)promise实例有三个状态
* Pending (进行中)
* Resolved (已完成)
* Rejected (已拒绝)

(2)promise实例有两个过程
* pending -> fulfilled : Resolved
* pending -> rejected : Rejected

**promise的特点**
* 对象的状态不受外界的影响。promise对象代表一个异步操作，有三种状态，只有异步的操作的结果，可以决定当前是什么状态，其他任何操作都无法改变这个状态
* 一旦状态改变就不会再变，promise对象状态的改变只有两种情况。
* 如果状态已经改变，你再对promise对象添加回调函数，也会立即得到这个结果

**promise的缺点**
* 无法取消promise，一旦新建promise就会立即执行，无法中途取消
* 如果不设置回调函数，promise内部抛出错误，不会反应到外部
* 当处于pending状态时，无法得知进展到哪个阶段

#### 2. promise的基本用法
(1)创建promise对象
**new Promise构造函数接受一个函数做为参数，该函数的两个参数分别时resolve和rejecte**
```js
const promise = new Promise(function(resolved, rejected) {
	//... some code
	if(/* 异步操作成功 */) {
		resolve(value)
	}else {
		reject(value)
	}
})
```
一般情况下都会使用new Promise()来创建promise对象，但是也可以使用promise.resolve或者promise.reject这两个方法

**Promise.resolve**
Promise.resolve(value)的返回值也是一个promise对象，可以对返回值进行then链式调用
```js
Promise.resolve('done').then(function(value) {
	console.log(value)
})
```
resolve('done')代码中，会让promise对象进入确定(resolve状态)，并将参数'done'传递给后面的then所指定的onFulfilled 函数；

**Promise.reject**
Promise.reject 也是new Promise的快捷形式，也创建一个promise对象。代码如下：
```js
Promise.reject(new Error('it is wrong'))
```

(2)Promise方法
Promise有五个常用的方法，then(), catch(), all(), race(), finally(), 主要介绍一下then和all
**then**
```js
let promise = new Promise((resolve,reject)=>{
    ajax('first').success(function(res){
        resolve(res);
    })
})
promise.then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    
})

```

**all**
all方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个promise对象。当数组中所有的promise的状态都达到resolved的时候，all方法的状态就会变成resolved，如果有一个状态变成了rejected，那么all方法的状态就会变成rejected
```js
javascript
let promise1 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(1);
	},2000)
});
let promise2 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(2);
	},1000)
});
let promise3 = new Promise((resolve,reject)=>{
	setTimeout(()=>{
       resolve(3);
	},3000)
});
Promise.all([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果为：[1,2,3]
})

```

#### 3. Promise.all和Promise.race的区别的使用场景
（1）Promise.all
Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
Promise.all中传入的是数组，返回的也是是数组，并且会将进行映射，传入的promise对象返回的值是按照顺序在数组中排列的，但是注意的是他们执行的顺序并不是按照顺序的，除非可迭代对象为空。
需要注意，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，这样当遇到发送多个请求并根据请求顺序获取和使用数据的场景，就可以使用Promise.all来解决。

（2）Promise.race
顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。当要做一件事，超过多长时间就不做了，可以用这个方法来解决：

```js
Promise.race([promise1,timeOutPromise(5000)]).then(res=>{})
```

#### 4. 





手写一个promise.all函数，主要考察的是promise.all中有哪些特性
 - 参数可能不是都是promise，也可能是常量
 - 参数中的promise是同步执行的，所以返回结果需要按照索引进行存贮

promise缓存，举个常见的场景：在调用接口前都需要做一个权限check











