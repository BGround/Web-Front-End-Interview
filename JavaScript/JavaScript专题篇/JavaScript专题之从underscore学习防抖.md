## 引言
本期开始介绍 JavaScript 中的防抖函数 debounce()，节流是频繁时间触发 n 秒之后再执行，防抖是在频繁时间停止触发后 n 秒再执行。
同样`debounce函数`不但在面试中是常考点，而且在工作中也是常常用到，所以还是要重点学习理解。


## 目录
- [1.什么是debounce函数?](#1-什么是-debounce-函数)
- [2.为什么用debounce函数?](#2-为什么用-debounce-函数)
- [3.怎么实现debounce函数?](#3-怎么实现-debounce-函数)
- [4.underscore中学习优化debounce](#4-underscore中学习优化debounce)


### 1. 什么是 debounce 函数
防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。假如我们设置了一个等待时间 3 秒的函数，
在这 3 秒内如果遇到函数调用请求就重新计时 3 秒，直至新的 3 秒内没有函数调用请求，此时执行函数，不然就以此类推重新计时

### 2. 为什么用 debounce 函数
点击 这个[页面](http://demo.nimius.net/debounce_throttle/) 查看节流和防抖的可视化比较。
其中 Regular 是不做任何处理的情况，throttle 是函数节流之后的结果，debounce 是函数防抖之后的结果（下一小节介绍）
![](JavaScript专题之从underscore学习节流_files/1.jpg)


### 3. 怎么实现 debounce 函数
实现原理就是利用定时器，函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
```js
const debounce = (func, wait) => {
	var context, args
	var timeout
	return function() {
		context = this
		args = arguments
		timeout = setTimeout(() => {
			if(timeout) clearTimeout(timeout)
			func.apply(context, agrs)
		},wait)
	}
}
```
**第一次触发就执行**
```js
const debounce = (func, wait,immediate) => {
	var context, args
	var timeout
	return function() {
		context = this
		args = arguments
		
		// 新增参数immediate，传入true表示第一次就执行回调
		// timeout为空，表示首次就触发
		if(immediate && !timeout) {
			func.apply(context, args)
		}
		
		timeout = setTimeout(() => {
			if(timeout) clearTimeout(timeout)
			func.apply(context, agrs)
		},wait)
	}
}
```

**加强版throttle**，就是用户频繁的操作，导致函数func也就是用户操作一直得不到响应，所以需要加一个时间判断，只要等待时间超过了就立即执行函数，响应用户的操作
```js
const debounce3 = (func, wait) => {
	var context, args
	// 上一次执行func的时间戳
	var prev = 0
	// 定时器id
	var timeout = null
	
	return function() {
		var now = +new Date()
		context = this
		args = arguments
		
		// 判断本次触发的时间和上次触发的时间间隔
		if(now - prev < wait) {
			// 如果小于等待时间就添加一个定时器，定时器结束之后执行func函数
			if(timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				prev = now
				func.apply(context,args)
			},wait)
		} else {
			// 如果大于等待时间，就立即想用用户的操作
			prev = now
			func.apply(context, args)
		}
	}
}
```

### 4. underscore中学习优化debounce
下面学习下underscore中作者优秀的思想`"version": "1.12.0"`
```js
export default function debounce(func, wait, immediate) {
  var timeout, previous, args, result, context;

  var later = function() {
	// 判断两次执行触发的间隔时间
    var passed = new Date().getTime() - previous;
	// 如果小于等待时间，就添加一个定时器，wait - passed时间后执行later函数
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      // 如果大于等待时间，就清空定时器
      timeout = null;
      if (!immediate) result = func.apply(context, args);
      // This check is needed because `func` can recursively invoke `debounced`.
      if (!timeout) args = context = null;
    }
  };

  var debounced = restArguments(function(_args) {
    context = this;
    args = _args;
    previous = new Date().getTime();
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args);
    }
    return result;
  });

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}

// 根据给定的毫秒 wait 延迟执行函数 func
_.delay = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
});

```

参考文章：
> [《深入浅出节流函数 throttle》](https://www.muyiy.cn/blog/7/7.2.html)
[《JavaScript专题之跟着 underscore 学节流》](https://github.com/mqyqingfeng/Blog/issues/26)
