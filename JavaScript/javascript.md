## JavaScript 面试知识点总结

本部分主要是笔者在复习 JavaScript 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [1.介绍js的基本数据类型](#1-介绍js的基本数据类型)
- [2.const与var和let的区别](#2-const与var和let的区别)
- [3.说下你理解的作用域和作用域链](#3-说下你理解的作用域和作用域链)
- [4.说说对于闭包的理解](#4-说说对于闭包的理解)
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
###### 不存在变量提升
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

#### 4. 说说对于闭包的理解
https://www.cnblogs.com/echolun/p/11897004.html