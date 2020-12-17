## 一道简单的面试题来考查JS的基础知识点
涉及到的知识点有JS的执行机制，定时器，闭包和立即执行函数，作用域，ES6中let，Promise，ES7中Async和Await
### Ⅰ★简单的变形题
```js
for(var i = 0; i < 5 ; i++) {
	console.log(i)
}
```
*以上代码会输出什么？*

这只是一个简单的for循环，无可厚非，输出`0，1，2，3，4`.
```js
for(var i = 0; i < 5 ; i++) {
	setTimeout(() => {
		console.log(i,new Date().getSeconds())
	}, 1000)
}
```
*这段代码会输出什么？*

这里涉及到`定时器setTimeout`，因为for循环条件是`同步任务`，setTimeout的回调函数中console.log(i)是异步任务执行的，
所以再任务队列中创建了五个一样的setTimeout回调，执行栈中同步任务for循环条件i=5不满足条件跳出循环，开始执行异步任务，
结果同时输出：`5,5,5,5,5`
```js
for(var i = 0; i < 5 ; i++) {
	setTimeout(() => {
		console.log(i,new Date().getSeconds())
	}, i * 1000)
}
```
*这时代码会输出什么？*

这题是上一题的简单变形，也是异步执行，真正考查点是`定时器时间间隔的真正含义`，
输出结果是每隔1秒输出5: `5 -> 5 -> 5 -> 5 -> 5`

### Ⅱ★那么针对上面的代码问题来了，现在想让代码每隔一秒输出，结果是：`0 -> 1 -> 2 -> 3 -> 4`

做法有很多种：

**1.首先想到的是立即执行函数和闭包**
```js
for(var i = 0; i < 5 ; i++) {
	(function(j){   // j = i
		setTimeout(() => {
			console.log(j,new Date().getSeconds())
		}, i * 1000)
	})(i)
}
```
for循环以后i就会变成5，剩下的我们可以使用立即执行函数来做。
首先 JS中调用函数传递参数都是值传递 ，所以当立即执行函数执行时，首先会把参数 i 的值复制一份，然后再创建函数作用域来执行函数，循环5次就会创建5个作用域，
所以每隔1秒后分别输出 0 1 2 3 4 。

上面的现象也可以说是闭包，因为在外层的 function 里面还包含着 setTimeout 里面的 function 函数，
而里面的 function 函数就访问了外层 function 的 i 的值，由此就形成了一个闭包。
每次循环时，将 i 的值保存在一个闭包中，当 setTimeout 中定义的操作执行时，就会访问对应闭包保存的 i 值
```js
// 内部其实没有对 i 保持引用
for(var i = 0; i < 5 ; i++) {
	(function(){   
		setTimeout(() => {
			console.log(i,new Date().getSeconds())
		}, i * 1000)
	})(i)
}
// 输出: 5 -> 5 -> 5 -> 5 -> 5


for(var i = 0; i < 5 ; i++) {
	(function(i){
		setTimeout(() => {
			console.log(i,new Date().getSeconds())
		}, 1000)
	})(i)
}
//同一时间输出：0，1，2，3，4
```

**2.按值传递性**
从上面的闭包可以得到JS中函数的基本数据类型参数的按值传递性，可以先定义一个function
```js
var outPut = i => {
	setTimeout(() => console.log(i,new Date().getSeconds()), i * 1000)
}

for(var i = 0; i < 5 ; i++) {
	outPut(i)
}
```

**3.ES6中的let**
```js
for(let i = 0; i < 5 ; i++) {
	setTimeout(() => {
		console.log(i,new Date().getSeconds())
	}, i * 1000)
}
```
这里只是小小的改动了下，用`let`声明i,用到了let声明变量的块级作用域

```js
for(var i = 0; i < 5 ; i++) {
	setTimeout(() => {
		console.log(i,new Date().getSeconds())
	}, i * 1000)
}

console.log(i,new Date().getSeconds())
```
*根据上面的学习，这段代码输出什么？*

### Ⅲ★变形题再升级一下，想上面这段代码输出 0 -> 1 -> 2 -> 3 -> 4 -> 5
```js
const tasks = []
for(var i = 0; i < 5 ; i++) {    // 这里 i 的声明不能改成 let，如果要改该怎么做？
	((j) => {
		tasks.push(new Promise((resolve) => {
			setTimeout(() => {
				console.log(j,new Date().getSeconds())
				resolve()  // 这里一定要 resolve，否则代码不会按预期 work
			}, j * 1000)   // 定时器的超时时间逐步增加
		}))
	})(i)
}

Promise.all(tasks).then(() => {
	setTimeout(() => {
		console.log(i,new Date().getSeconds())
	},1000)    // 注意这里只需要把超时设置为 1 秒
})

```

**ES7中的 async 和 await 的特性让代码变得更简洁**
```js
// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
});

(async () => {  // 声明即执行的 async 函数表达式
    for (var i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(new Date, i);
    }

    await sleep(1000);
    console.log(new Date, i);
})();
```


参考文章：[《80% 应聘者都不及格的 JS 面试题》](https://juejin.cn/post/6844903470466629640)



