## JavaScript 面试知识点总结

本部分主要是笔者在复习 JavaScript 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [1.介绍js的基本数据类型](#1-介绍js的基本数据类型)
- [2.const与let和var的区别](#2-const与let和var的区别)
- [3.说下你理解的作用域和作用域链](#3-说下你理解的作用域和作用域链)
- [4.说说对于闭包的理解](#4-说说对于闭包的理解)
- [5.JS的执行上下文](#5-JS的执行上下文)
- [6.变量提升和函数声明提前](#6-变量提升和函数声明提前)
- [7.深拷贝和浅拷贝的理解](#7-深拷贝和浅拷贝的理解)
- [8.理解JSON的stringify和parse](#8-理解JSON的stringify和parse)
- [9.浏览器的缓存localStorage和sessionStorage](#9-浏览器的缓存)
- [10.this指向的问题](#10-this指向的问题)
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-

#### 1. 介绍js的基本数据类型.
```javascript
js 一共有六种基本数据类型，分别是 Undefined、Null、Boolean、Number、String，还有在 ES6 中新增的 Symbol 和 BigInt 类型。
Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。
BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。
```
**[:arrow_up: 返回目录](#目录)**

#### 2. const与let和var的区别
**let和var声明的是变量，const声明的是常量 **
常量：只能取值不能赋值，就是只读不写   
常量的声明：
```javascript
var es = 'ES6';
```
let和var的区别
###### let不允许重复声明，var可以
```javascript
var str = 'es6';
var str = 'es2015';
console.log(str);


let es = 'es6';
let es = 'es2015';
console.log(es);    
//Uncaught SyntaxError: Identifier 'es' has already been declared
```
###### let不属于顶层对象window,var可以
```javascript
let str = 'es6';
console.log(window.str);   //undefined
```
###### 不存在变量提升[5.JS的执行上下文](#JS的执行上下文)
```javascript
console.log(str);
let str = 'es2015';  
//Uncaught ReferenceError: Cannot access 'str' before initialization

console.log(str);               var str;
var str = 'es2015';    =>       console.log(str);
                                str = 'es6';    
//结果是undefined，具体细节参照执行上下文分析								
```
###### 暂时性死区,和变量先声明后使用本质没有区别？
```javascript
if(true) {
    console.log(str);
    let str = 'es6';
}
```
###### 块级作用域
```javascript
if(true) {
    let str = 'es6';
}
console.log(str);
//Uncaught ReferenceError: str is not defined
```
###### let的特性const都有，不能重复声明、不存在变量提升、存在块级作用域也有暂时性死区，唯一的区别const声明常量，一旦声明无法修改。
###### 但是有一点特别注意，上面的列子中不能修改的都是基本数据类型，对于数组或者对象都是引用数据类型，引用数据类型可以修改的是存在堆内存中的数据
```javascript
const esObj = {
    name: 'es6',
    year: 2015
}
esObj.name = 'es2015';
console.log(esObj);


const arr = ['es6', 'es7', 'es8'];
arr[0] = 'es2015';
console.log(arr);
```
###### let定义的变量，只能在块作用域里访问，不能跨块作用域访问，也不能跨函数作用域访问,ES6新增的命令
###### var定义的变量，可以跨块作用域访问, 不能跨函数作用域访问,
###### const用来定义常量，创建时必须赋值，只能在块作用域里访问，并且不能修改引用数据类型的指向地址，但是可以修改引用数据指向地址内的数据。
**[:arrow_up: 返回目录](#目录)**

#### 3. 说下你理解的作用域和作用域链
作用域是变量和函数的作用域范围和生命周期,当在当前作用域查找不到某变量时,就会去上层作用域查找，此行为一直找到全局对象window(非严格模式)，此查找的过程就是所谓的作用域链
PS:函数作用域的含义：属于这个函数的全部变量可以在整个函数的范围内使用及复用。

<font color=red>顺便理解下静态作用域和动态作用域</font>
*静态作用域指的是一段代码，在它执行之前就已经确定了它的作用域，简单来说就是在执行之前就确定了它可以应用哪些地方的作用域(变量)。
动态作用域–函数的作用域是在函数调用的时候才决定的*


```javascript
//静态作用域
var a = 10;

function fn() {
    var b = 1;
    console.log(a + b);
}

fn(); // 11
```

*在创建fn函数时的时候就已经确定了它可以作用哪些变量，如果函数fn里面有变量a就直接操作变量a，如果没有就往上一级查找，这就是静态作用域*

```javascript
//  动态作用域：
function foo() {
    console.log(a);
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;
bar(); // 2;
```
*bar 调用，bar里面foo被调用，foo函数需要查找变量a，由于JavaScript是词法作用域(即静态作用域)，foo被解析时在全局作用域.
所以只能在全局作用域中找a,输出结果为2，而非bar作用域中的a。如果js采用的时动态作用域，那么foo在bar中调用，就会先在bar中查询a,输出为3。*

> ES6中let为javascript添加了块级作用域，

> 函数作用域：变量在定义的函数内及嵌套的子函数内处处可见；

> 块级函数域：变量在离开定义的块级代码后马上被回收。
    
**[:arrow_up: 返回目录](#目录)**

#### 4. 说说对于闭包的理解
闭包是指能够访问其他作用域自由变量的函数，即使该作用域已经销毁，理论上说在Javascript中Function都是闭包，
闭包无非满足以下两点：
>闭包首先得是一个函数。

>闭包能访问外部函数作用域中的自由变量，即使外部函数上下文已销毁。
```javascript
var name = "听风是风";
var obj = {
    name: "行星飞行",
    sayName: function () {
        return function () {
            console.log(this.name);
        };
    }
};
obj.sayName()(); // 听风是风
```
** 这里主要涉及到函数的作用域和闭包的this指向问题**
> 函数作用域在定义时就已经确定了，而不是调用时确定

> this在最终调用时才确定，而不是定义时确定
```javascript
var name = "听风是风";
var obj = {
    name: "行星飞行",
    sayName: function () {
        var that = this;
        return function () {
            console.log(that.name);
        };
    }
};
obj.sayName()(); // 听风是风
```
##### 闭包的用途
可以节流防抖，模拟私有属性和工厂函数等

参考链接：《[一篇文章看懂JS闭包，都要2020年了，你怎么能还不懂闭包？](https://www.cnblogs.com/echolun/p/11897004.html)》

**[:arrow_up: 返回目录](#目录)**

#### 5. JS的执行上下文
JS代码在执行前，JS引擎会做一些准备工作，对应的就是创建对应的上下文，上下文创建分为创建阶段和执行阶段，
上下文分为三种，**①全局执行上下文**，一般有浏览器创建为window对象，通过this访问**②函数上下文**，可以存在无数个，每次调用函数就创建一个③eval上下文，很少用也不建议使用
JS上下文的创建阶段主要负责三件事：绑定this---创建词法环境组件(LexicalEnvironment)---创建变量环境组件(VariableEnvironment)
用伪代码表示：

```javascript
ExecutionContext = {  
    
    ThisBinding = <this value>, // 确定this的值
    
    LexicalEnvironment = {}, // 创建词法环境组件
    
    VariableEnvironment = {}, // 创建变量环境组件
};
```

参考链接：《[一篇文章看懂JS执行上下文](https://www.cnblogs.com/echolun/p/11438363.html)》    《[理解JavaScript 中的执行上下文和执行栈](https://www.muyiy.cn/blog/1/1.1.html)》

**[:arrow_up: 返回目录](#目录)**

#### 6. 变量提升和函数声明提前
变量提升的表现是，无论我们在函数中何处位置声明的变量，好像都被提升到了函数的首部，我们可以在变量声明前访问到而不会报错,*第五个问题已经说过*。
函数声明提前，类似于变量提升，但是有两种方法，区别在于是函数名提前吗，还是函数体提前
*通过 var fn=function(){}定义函数，只是将函数名提前了，函数体没有提前，如果在函数体前使用fn()调用函数就会报错*
```javascript
fn();
var fn = function(){
	console.log('函数体没有提前')
}
//结果：报错！Uncaught TypeError: fn is not a function
```
*通过function fn(){}定义函数，是将整个函数体提前了，此时使用fn()调用函数就会正常*
```javascript
fn();
function fn() {
	console.log('函数体提前');
}
```
**[:arrow_up: 返回目录](#目录)**

#### 7. 深拷贝和浅拷贝的理解
深拷贝(deep clone)其实是针对引用对象类型来说的，要介绍深浅拷贝，得站在基本类型数据与引用类型数据存储区别上去理解。事实上基本类型，比如数字，字符串，JavaScript都没提供可以修改它们的方法，正因为不可变性，基本类型数据存放在栈中。

而对象就不一样了，比如数组可以增加元素，对象也可以添加属性，删除属性。对象大小不确定，所以我们声明一个对象，对象的key因为是基本类型（不考虑map结构的情况），所以key会存在栈中，而值是对象，所以放在堆中。这就导致了一个问题，当我们拷贝一个对象时，其实拷贝的是指向堆中value的指针，这也导致其中一方修改了对象值，会影响另一个对象。

而对于对象的深拷贝实现，乞丐版，JSON的两个方法，缺点是不能拷贝函数，undefined等。好一点可以递归层层遍历拷贝，或者有其它三方拷贝。
```javascript
//递归遍历实现
function deepClone(obj) {
	let objClone = Array.isArray(obj)? [] : {}
	if(obj && typeof obj === "object") {
		for(key in obj) {
			if(obj.hasOwnPropety(key)) {
				if(obj[key] && typeof obj[key] === "object") {
					objClone[key] = deepClone(obj[key])
				} else {
					objClone[key] = obj[key]
				}
			}
		}
	}
	return objClone
}

//JSON的stringify和parse,
//这个原理是先利用JSON.stringify()将对象转变成基本数据类型，然后使用了基本类型的拷贝方式，再利用JSON.parse()将这个字符串还原成一个对象，达到了深拷贝的目的
function deepClone(obj) {
	let tmp = JSON.stringify(obj)
	let objClone = JSON.parse(tmp)
	return objClone
}
```
**[:arrow_up: 返回目录](#目录)**

#### 8. 理解JSON的stringify和parse
上一问学习过这两个方法,现在再深入学习一下，
###### MDN中
> JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串...
一句话就是JSON.stringify()将值转换为相应的JSON格式：
```javascript
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'
```

>JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换(操作)。
一句话就是JSON.parse()将JSON文本转成对应的对象/值
```javascript
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
```

注意：若传入的字符串不符合 JSON 规范，则会抛出 SyntaxError 异常，即你的字符串必须符合JSON格式，键值都必须使用双引号包裹。
```javascript
let a = '["1","2"]';
let b = "['1','2']";
console.log(JSON.parse(a));// Array [1,2]
console.log(JSON.parse(b));// 报错
```
![SyntaxError](https://github.com/BGround/Web-Front-End-Interview/blob/main/image/JSON-SyntaxError.png)

JSON.stringify的作用
> 判断数组是否包含某对象，或者判断对象是否相等(慎用，undefined、任意的函数以及 symbol 值，
> 在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
> 函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).)
```javascript
//判断数组是否包含某对象
let data = [
    {name:'echo'},
    {name:'听风是风'},
    {name:'天子笑'},
    ],
    val = {name:'天子笑'};
JSON.stringify(data).indexOf(JSON.stringify(val)) !== -1;//true

//判断两数组/对象是否相等
let a = [1,2,3],
    b = [1,2,3];
JSON.stringify(a) === JSON.stringify(b);//true
```
> 让localStorage/sessionStorage可以存储对象
```javascript
//存
function setLocalStorage(key,val){
    window.localStorage.setItem(key,JSON.stringify(val));
};
//取
function getLocalStorage(key){
    let val = JSON.parse(window.localStorage.getItem(key));
    return val;
};
//测试
setLocalStorage('demo',[1,2,3]);
let  a = getLocalStorage('demo');//[1,2,3]
```
> 实现对象深拷贝
例子上文已经说过

参考链接：《[json.stringify()的妙用，json.stringify()与json.parse()的区别](https://www.cnblogs.com/echolun/p/9631836.html)》
《[MDN中关于JSON.stringify的描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)》
**[:arrow_up: 返回目录](#目录)**

#### 9. 浏览器的缓存
这里指的是LocalStorage和SessionStorage,主要是从使用和区别去理解这两个缓存

使用方面：
>他们都是以key/value的形式保存在浏览器的端中，

区别方面：
>localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。

>sessionStorage生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。
>不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），
>但是不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标 签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。

![storage](https://github.com/BGround/Web-Front-End-Interview/blob/main/image/cookie-sessionStoge-LocalStorage.png)

**[:arrow_up: 返回目录](#目录)**

#### 10. this指向的问题


**[:arrow_up: 返回目录](#目录)**
