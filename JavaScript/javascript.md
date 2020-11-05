## JavaScript 面试知识点总结

本部分主要是笔者在复习 JavaScript 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [1.介绍js的基本数据类型](#1-介绍js的基本数据类型)
- [2.const与var和let的区别](#2-const与var和let的区别)
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
###### let定义的变量，只能在块作用域里访问，不能跨块作用域访问，也不能跨函数作用域访问,
###### var定义的变量，可以跨块作用域访问, 不能跨函数作用域访问,
###### const用来定义常量，创建时必须赋值，只能在块作用域里访问，并且不能修改。