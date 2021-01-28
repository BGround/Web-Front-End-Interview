## 引言
本期开始介绍 JavaScript 中的节流函数throttle()，`throttle函数`不但在面试中是常考点，而且在工作中也是常常用到。所以还是要重点学习理解


## 目录
- [1.什么是throttle函数?](#1-什么是throttle函数)
- [2.为什么用throttle函数?](#2-为什么用throttle函数)
- [3.怎么实现throttle函数?](#3-怎么实现throttle函数)
- [4.underscore中学习优化throttle](#4-underscore中学习优化throttle)


### 1. 什么是throttle函数?
函数节流是指在一定时间间隔内(例如3S)某个函数只执行一次,在3S内无视后来函数的调用请求,也不会延长时间间隔。3S间隔结束之后第一次遇到函数调用会触发执行,
然后在这个3S内依旧无视后来函数的调用请求,以此类推

### 2. 为什么用throttle函数?
点击 这个[页面](http://demo.nimius.net/debounce_throttle/) 查看节流和防抖的可视化比较。
其中 Regular 是不做任何处理的情况，throttle 是函数节流之后的结果，debounce 是函数防抖之后的结果（下一小节介绍）
![](JavaScript专题之从underscore学习节流_files/1.jpg)

图中可视化结果可以看出,throttle非常适合函数被频繁调用的情况,例如:window.onresize事件,mousemove事件和上传进度等

### 3. 怎么实现throttle函数?
关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

**使用时间戳**

让我们来看第一种方法：使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，
然后更新时间戳为当前的时间戳，如果小于，就不执行。
```js
const throttle = (fn, wait) => {
	var context, args
	var prev = 0
	return function() {
		var now = +new Date() // 一元+运算符将其操作数转换为Number类型并反转其正负, 类似toNumber(new Date())
		context = this
		args = arguments
		if(now - perv > wait) {
			fn.apply(context,agrs)
			prev = now
		}
	}
}
```

**使用定时器**

当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
```js
const throttle = (fn, time) => {
	var context, args
	var timeout
	return function() {
		context = this
		args = arguments
		if(!timeout) {
			timeout = setTimeout(() => {
				timeout = null
				fn.apply(context, args)
			},time)
		}
	}
}
```

### 4. underscore中学习优化throttle
在模拟测试比较两个方法时发现：

`时间戳`会立刻执行，第二种事件会在 n 秒后第一次执行
`定时器`停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件

所以在underscore中实现了更高级的功能，

- 配置 { leading: false } 时，事件刚开始的那次回调不执行；
- 配置 { trailing: false } 时，事件结束后的那次回调不执行

**不过需要注意的是，这两者不能同时配置。**

下面来重点学习下underscore中throttle函数

```js
export default function throttle(func, wait, options) {
  var timeout, context, args, result;
  // 上一次执行回调的时间戳
  var previous = 0;
  // 如果options为空则置为空对象
  if (!options) options = {};

    // 当设置 { leading: false } 时
    // 每次触发回调函数后设置 previous 为 0
    // 不然为当前时间
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    // 释放内存
    if (!timeout) context = args = null;
  };

  // 每次触发事件回调都执行这个函数
  // 函数内判断是否执行 func
  // func 才是我们业务层代码想要执行的函数
  var throttled = function() {
    var _now = new Date().getTime();
    // 第一次执行时（此时previous为0，为上一次的时间戳）
    // 并且设置了 leading === false，表示第一次回调不执行
    // 再设置previous为当前值，表示刚执行过，本次不执行了
    if (!previous && options.leading === false) previous = _now;
	
    // 距离下次执行还需要等待的时间
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;
	
    // 要么是到了间隔时间了，立即触发回调方法 (remaining <= 0)
    // 要么是没有传入leading === false，且是第一次回调，此时previous = 0，也会立即触发
    // 还有一种特殊情况，手动改了系统时间，导致remaining > wait，也会立即触发
    // 之后会把 previous = _now
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 最后一次需要触发的情况
      // 如果存在一个定时器不会进入这个 else if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  //手动取消
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  // 执行 throttle 返回 throttled函数 
  return throttled;
}
```

最后学习实例参照[DEMO](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/Demo/throttle.html)


参考文章：
>[《深入浅出节流函数 throttle》](https://www.muyiy.cn/blog/7/7.1.html)
[《JavaScript专题之跟着 underscore 学节流》](https://github.com/mqyqingfeng/Blog/issues/26)

