### 引言
本期开始介绍 JavaScript 中的高阶函数，在 JavaScript 中，函数是'一等公民'，这是因为函数一种特殊类型的对象，它们是 Function objects。
那什么是高阶函数呢？本节将通过高阶函数的定义来展开介绍.

### 目录
- [1.高阶函数浅析](#1-高阶函数浅析)
- [2.柯里化](#2-深入高阶函数应用之柯里化)
- [3.惰性函数](#3-惰性函数)
-




### 1. 高阶函数浅析
**高阶函数**:英文名是High-order function，它的定义很简单，就是至少满足下列条件之一
 
 - 接受一个或多个函数作为输入
 
 - 输出一个函数
 
简单来说，高阶函数就是一个接受函数做为`参数传递`或者将函数作为`返回值`输出的函数.

**函数作为参数传递**
JavaScript语言中内置了一些高阶函数，比如 Array.prototype.map，Array.prototype.filter 和 Array.prototype.reduce，它们接受一个函数作为参数，并应用这个函数到列表的每一个元素
```js
const arr = [1,2,3,4]
const arrNew = arr.map(item => item*2)
console.log(arr,arrNew)
//(4) [1, 2, 3, 4]
//(4) [2, 4, 6, 8]
```

**函数作为返回值输出**
这个很好理解就是返回一个函数，通过一个常考的面试题理解下
```js
//JS实现一个无线累加的函数add
add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6

// 以此类推

//ES5
function add(a) {
	function sum(b) {
		a = a + b;
		return sum;
	}
	sum.toString = function() { // 打印函数时会自动调用 toString()方法,重写toString()方法
		return a;
	}
	
	return sum //返回一个函数
}
```
函数 add(a) 返回一个闭包 sum(b)，函数 sum() 中累加计算 a = a + b，只需要重写sum.toString()方法返回变量 a 就可以了

### 2. 深入高阶函数应用之柯里化
**柯里化**：又叫部分求值
>维基百科中定义：
在数学和计算机科学中，柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

在上面的累加的add函数就是一个柯里化函数，下面使用一个通用的ES6写法
```js
//ES6
function add(){
	var _args = [...arguments]
	function fuc() {
		_args.push(...arguments)
		return fuc
	}
	func.toString = function() {
		return _args.reduce((sum,cur) => sum + cur)
	}
	return fuc
}
```
### 3. 惰性函数
惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。
DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：
```js
// 简化写法
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}
addEvent()
```
问题在于我们每当使用一次 addEvent 时都会进行一次判断。

利用惰性函数，我们可以这样做：
```js
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
}
addEvent()
```
当然我们也可以使用闭包的形式：
```js
var addEvent = (function(){
    if (window.addEventListener) {
        return function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
})();
addEvent()
```
当我们每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变的时候，想想是否可以考虑使用惰性函数。






详情请参考：
[《深入高阶函数应用之柯里化》](https://www.muyiy.cn/blog/6/6.2.html#%E6%9F%AF%E9%87%8C%E5%8C%96)
[《JavaScript专题之惰性函数》](https://github.com/mqyqingfeng/Blog/issues/44)