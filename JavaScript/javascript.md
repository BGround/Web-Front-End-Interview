## JavaScript 面试知识点总结

本部分主要是笔者在复习 JavaScript 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [1.介绍js的基本数据类型](#1-介绍js的基本数据类型)
- [2.const与var和let的区别](#2-const与var和let的区别)
- [3.说下你理解的作用域和作用域链](#3-说下你理解的作用域和作用域链)
- [4.说说对于闭包的理解](#4-说说对于闭包的理解)
- [5.JS的执行上下文](#5-JS的执行上下文)
- [6.变量提升和函数声明提前](#6-变量提升和函数声明提前)
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

#### 2. const与var和let的区别
常量：只能取值不能赋值，就是只读不写  
常量的声明：
```javascript
var es = 'ES6';
```
const需要注意的点
###### const不允许重复声明，var可以
```javascript
var str = 'es6';
var str = 'es2015';
console.log(str);


const es = 'es6';
const es = 'es2015';
console.log(es);    
//Uncaught SyntaxError: Identifier 'es' has already been declared
```
###### const不属于顶层对象window,var可以
```javascript
const str = 'es6';
console.log(window.str);   //undefined
```
###### 不存在变量提升[5.JS的执行上下文](#JS的执行上下文)
```javascript
console.log(str);
const str = 'es2015';  
//Uncaught ReferenceError: Cannot access 'str' before initialization at 1_const.html:46

console.log(str);               var str;
var str = 'es2015';    =>       console.log(str);
                                str = 'es6';    
```
###### 暂时性死区,和变量先声明后使用本质没有区别？
```javascript
if(true) {
    console.log(str);
    const str = 'es6';
}
```
###### 块级作用域
```javascript
if(true) {
    const str = 'es6';
}
console.log(str);
//1_const.html:57 Uncaught ReferenceError: str is not defined at 1_const.html:57
```
###### const可以修改变量的本质
###### 上面的列子中不能修改的都是基本数据类型，对于数组或者对象都是引用数据类型，引用数据类型可以修改的是存在堆内存中的数据
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
###### const用来定义常量，创建时必须赋值，只能在块作用域里访问，并且不能修改。
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
闭包是指能够访问其他作用域自由变量的函数，即使该作用域已经销毁，理论上说在Javascript中Function都是闭包


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