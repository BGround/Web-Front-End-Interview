## JavaScript 面试知识点总结

本部分主要是笔者在复习 JavaScript 相关知识(ES6入门)和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

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
- [11.原型和原型链](#11-原型和原型链)
- [12.constuctor和typeof以及instanceof](#12-constuctor和typeof以及instanceof)
- [13.手动实现一个new方法](#13-手动实现一个new方法)
- [14.手动实现Call和Apply方法](#14-手动实现Call和Apply方法)
- [15.手动实现bind方法](#15-手动实现bind方法)
- [16.数组去重的方法](#16-数组去重的方法)
- [17.javaScript继承的几种方式及优缺点](#17-javaScript继承的几种方式及优缺点)
- [18.正则表达式和常用的正则表达式](#18-正则表达式和常用的正则表达式)
- [30.ES6入门-变量的解构赋值](#30-ES6入门之变量的解构赋值)
- [31.ES6入门-函数形参的扩展及箭头函数](#31-ES6入门之函数形参的扩展及箭头函数)
- [32.ES6入门-第七种数据类型Symbol](#32-ES6入门之第七种数据类型Symbol)
- [99.Object有哪些属性方法](#99-Object有哪些属性方法)
- [100.Array有哪些属性方法](#100-Array有哪些属性方法)
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
① let不允许重复声明，var可以
```javascript
var str = 'es6';
var str = 'es2015';
console.log(str);


let es = 'es6';
let es = 'es2015';
console.log(es);    
//Uncaught SyntaxError: Identifier 'es' has already been declared
```
② let不属于顶层对象window,var可以
```javascript
let str = 'es6';
console.log(window.str);   //undefined
```
③ 不存在变量提升[5.JS的执行上下文](#JS的执行上下文)
```javascript
console.log(str);
let str = 'es2015';  
//Uncaught ReferenceError: Cannot access 'str' before initialization

console.log(str);               var str;
var str = 'es2015';    =>       console.log(str);
                                str = 'es6';    
//结果是undefined，具体细节参照执行上下文分析								
```
④ 暂时性死区,在代码块内，使用let命令声明变量之前，该变量都是不可用的
```javascript
if(true) {
    console.log(str);
    let str = 'es6';//Uncaught ReferenceError: Cannot access 'str' before initialization
}
```
因为暂时性死区, 所以要特别注意typeof的使用

⑤ 块级作用域
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

[面试题](https://github.com/BGround/Web-Front-End-Interview/issues/5)

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
//这个可以改写成 
var fn = obj.sayName();
window.fn() // 所以this指向是window
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
[面试题](https://github.com/BGround/Web-Front-End-Interview/issues/1)
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

而对于对象的深拷贝实现，乞丐版JSON的两个方法，缺点是不能拷贝函数，undefined等;好一点可以递归层层遍历拷贝，或者有其它三方拷贝。
```javascript
//递归遍历实现
function deepClone(source) {
	// 此实现只针对[]与{}，由于null的typeof类型也是object，特做过滤,因为typeof(null) === Object且null === null是true
	function isObject(obj) {
		return typeof(obj) === 'object' && obj !== null
	}
	//如果参数不是[]或者{},直接返回
	if( !isObject(source)) {
		return souece
	}
	//创建一个新对象,不是[]就是{}
	let objClone = Array.isArray(source)? [] : {}
	//遍历源对象，进行拷贝
	for(key in source) {
		//判断当前属性是否是自身属性
		if(source.hasOwnPropety(key)) {
			//判断当前值是否仍是对象
			if(isObject(source[key])) {
				objClone[key] = deepClone(source[key])
			} else {
				objClone[key] = source[key]
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
在javascript中对象是通过构造函数新建的, 在调用函数的时候, 除了声明的形参, 每个函数还接收两个附加的参数: this和arguments.

this的取值取决于调用模式: **方法调用模式**; **函数调用模式**; **构造函数调用模式**; **call、apply和bind调用模式**

对应的this绑定方式是: **隐式绑定**; **默认绑定**; **new绑定**; **显示绑定**; 还有一种不同于上面的**箭头函数绑定方式**

下面来说说箭头函数, 箭头函数没有自己的this, 它的this是通过执行上下文确定的, 执行上下文分为全局上下文和函数上下文(eval不考虑), 
```javascript
//全局上下文
var name = 'window'
var obj1 = {
    name: 'I am obj1',
    fn2: () => console.log(this.name),
}
var obj2 = {
    name: 'I am obj2'
}

obj1.fn2();    //window
obj1.fn2.call(obj2);   //window

//函数上下文
var name = 'window'
function Person(name) {
	this.name = name
	this.fn2 = () => console.log(this.name)
}
var obj1 = new Person("I am obj1")
var obj2 = new Person("I am obj2")

obj1.fn2(); //I am obj1
obj1.fn2.call(obj2); // I am obj1
```
且一旦绑定无法通过call，apply或者bind再次改变箭头函数的this, 但是箭头函数的this也不是真的无法修改，我们知道箭头函数的this就像作用域继承一样从上层作用域找，
因此我们可以修改外层函数this指向达到间接修改箭头函数this的目的。
如函数上下文的例子中, 修改fn2函数this指向达到修改箭头函数this指向
```javascript
obj1.fn2(); //I am obj1
obj2.fn2(); //I am obj2
```

其中, new绑定和显示绑定没有可比性, 两者不能同时绑定
>显示绑定 > 隐式绑定 > 默认绑定; new绑定 > 隐式绑定 > 默认绑定

[面试题](https://github.com/BGround/Web-Front-End-Interview/issues/1)

参照: 《[js 五种绑定彻底弄懂this，默认绑定、隐式绑定、显式绑定、new绑定、箭头函数绑定详解](https://www.cnblogs.com/echolun/p/11962610.html#top)》

**[:arrow_up: 返回目录](#目录)**

#### 11. 原型和原型链
JavaScript中万物皆对象，且对象皆可通过__proto__属性访问创建自己构造函数的原型对象，说直白点，原型就是一个包含了诸多属性方法的对象,也就是**prototype**, 原型对象的__proto__指向构造函数Object()的原型。
当一个对象访问某个属性时，它会先查找自己有没有，如果没有就顺着__proto__往上查找创建自己构造函数的原型有没有，这个过程就是原型链，原型链的顶端是null。

**说明**  

①、出undefined和null的基本数据类型+引用数据类型都是对象, 基本数据类型中, 都有所谓的包装对象, `'a'.__proto__ === String.prototype`  

②、对象都有__proto__, 但是只有函数有prototype

③、__proto__是一个访问器属性,相当于C++中的指针，在不修改构造函数prototype前提下，所有实例__proto__属性中的constructor属性都指向创建自己的构造函数

④、在不修改构造函数原型的前提下, 实例的__proto__与构造函数的prototype是对等的关系, `fn.__proto__ === Function.prototype`


参考: 《[JS 疫情宅在家，学习不能停，七千字长文助你彻底弄懂原型与原型链](https://www.cnblogs.com/echolun/p/12321869.html#top)》

**[:arrow_up: 返回目录](#目录)**

#### 12. constuctor和typeof以及instanceof
在判断类型上, 这三者都能做到, constructor是原型对象的一个属性, 通过本身, 也能做到一个类型判断，那么三者有和区别呢:
**typeof**返回的是一个字符串,MDN中定义:表示未经计算的操作数的类型, 语法是`typeof operand`. 主要判断的是基本数据类型, 引用数据类型和包装对象就没法准确判断
```javascript
 typeof('1') === 'string'  //true
 typeof(Array) === 'function' //true
```
**constructor**返回的是创建实例的构造函数, 查找的是原型链的上一层;
**instanceof**返回的也是一个布尔值,MDN中定义:用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上,
语法是`object instanceof constructor`,用来检测 constructor.prototype 是否存在于参数 object 的原型链上. 主要用于判断引用数据类型
```javascript
var a = 2;
console.log(a instanceof Number);  //false, 这个a不是一个Object
console.log(a.constructor === Number); //true  a.constructor === Function就是false
```
这个转换一下
```javascript
var a = new Number(2);(或者var a = new Object(2))
console.log(a instanceof Number); // true
console.log(a.constructor === Number); // true
```
思考题：
```javascript
typeof(null) // ?
null instanceof Object // ?
```
**[:arrow_up: 返回目录](#目录)**

#### 13. 手动实现一个new方法
new在MDN中时这样定义的
>new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

`语法:
new constructor[([arguments])],
constructor
一个指定对象实例的类型的类或函数。
arguments
一个用于被 constructor 调用的参数列表。`

new的过程做了什么？ **new过程中会新建对象，此对象会继承构造器的原型与原型上的属性，最后它会被作为实例返回这样一个过程**
```javascript
// ES5构造函数
let Parent = function (name, age) {
    //1.创建一个新对象，赋予this，这一步是隐性的，
    // let this = {};
    //2.给this指向的对象赋予构造属性
    this.name = name;
    this.age = age;
    //3.如果没有手动返回对象，则默认返回this指向的这个对象，也是隐性的
    // return this;
};
const child = new Parent();
```
这个例子不是完美,它只描述了构造器属性是如何塞给实例，没说原型上的属性是如何给实例继承的

手动实现：
```javascript
// 构造器函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};
//自己定义的new方法
let newMethod = function (Parent, ...rest) {
    // 1.以构造器的prototype属性为原型，创建新对象；
    let child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    let result = Parent.apply(child, rest);
    // 3.如果构造器没有手动返回对象，则返回第一步的对象
    return typeof result  === 'object' ? result : child;
};
//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 26);
child.sayName() //'echo';

//最后检验，与使用new的效果相同
child instanceof Parent//true
child.hasOwnProperty('name')//true
child.hasOwnProperty('age')//true
child.hasOwnProperty('sayName')//false
```

**[:arrow_up: 返回目录](#目录)**

#### 14. 手动实现Call和Apply方法
**call()方法的作用和apply()方法类似，都能改变this指向并执行函数，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组**
```javascript
var fn = function (arg1, arg2) {
    // do something
};

fn.call(this, arg1, arg2); // 参数散列
fn.apply(this, [arg1, arg2]) // 参数使用数组包裹
```

**[:arrow_up: 返回目录](#目录)**

#### 15. 手动实现bind方法
**bind()方法不同于call和apply，它在改变this的指向时，返回一个绑定函数，但是不会立即执行，返回的 boundFunction 的 this 指向无法再次通过bind、apply或 call 修改**
```javascript
let o1 = {
    a: 1
};
let o2 = {
    a: 2
};
let o3 = {
    a: 3
};

function fn(b, c) {
    console.log(this.a);
};

let fn1 = fn.bind(o1);
let fn2 = fn1.bind(o2);
let fn3 = fn2.bind(o3);
fn3() // 1
```
此时打印fn1函数可以看到，它并不是一个普通的function，而是一个bound function，简称**绑定函数**：
![](javascript_files/1.jpg)

**[:arrow_up: 返回目录](#目录)**

#### 16. 数组去重的方法
var arr = [1,2,1,2,3,4]数组去重得到数组[1,2,3,4]
##### Array
>使用filter
```javascript
var newArr = arr.filter(function(el,index,arr){
	return arr.indexOf(el) === index
})
```

>使用reduce
```javascript
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
var newArr = arr.sort().reduce((init,curr) => {
	if(init.length === 0 || init[init.length-1] !== curr) {
		init.push(curr);
	}
	return init;
},[])
```

##### ES6
```javascript
var newArr = [...new Set(arr)]
```

**[:arrow_up: 返回目录](#目录)**

#### 17. javaScript继承的几种方式及优缺点


参考链接：《[6种JavaScript继承方式及优缺点](https://zhuanlan.zhihu.com/p/105312152)》

**[:arrow_up: 返回目录](#目录)**

#### 18. 正则表达式和常用的正则表达式
正则表达式是用于匹配字符串中字符组合的模式，正则表达式也是一个对象
##### 创建方式
①正则表达式字面量创建
>const reg = /pattern/flags
```javascript
const re = /[a-b]/i
```

flags 	| 	描述
------- | -------------
g  		| global 全局的，匹配多次
m  		| multiline 多行搜索 (^和$能匹配行结束符)
i  		| ignoreCase 不区分大小写
u  		| Unicode码的匹配模式
y  		| 执行“粘性(sticky)”搜索,匹配从目标字符串的当前位置开始
s  		| 允许 . 匹配换行符

②构造函数方式创建
>const reg = new RegExp("pattern",'flags')
```javascript
const re = new RegExp('[a-b]','i')
```

##### 方法
exec() 

*在一个指定字符串中执行一个搜索匹配，返回一个结果数组或 null. 类似String.prototype.match() 只会返回匹配到的结果*

test()

*方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。*

##### 常用的表达式
```javascript
// (1)手机号码正则
var regex = /^1[345789]\d{9}$/g

// (2)匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g

// (3)匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// (4)匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
```

**[:arrow_up: 返回目录](#目录)**

#### 30. ES6入门之变量的解构赋值
[传送门](https://github.com/BGround/Web-Front-End-Interview/issues/6)

**[:arrow_up: 返回目录](#目录)**

#### 31. ES6入门之函数形参的扩展及箭头函数
[传送门](https://github.com/BGround/Web-Front-End-Interview/issues/7)

**[:arrow_up: 返回目录](#目录)**

#### 32. ES6入门之第七种数据类型Symbol
[传送门](https://github.com/BGround/Web-Front-End-Interview/issues/8)

**[:arrow_up: 返回目录](#目录)**

#### 99. Object有哪些属性方法
Object 构造函数创建一个对象包装器,可以通过**new Object()**, **Object.create()方法**，或者使用**字面量标识**(初始化标记)[初始化对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer)。
##### 属性
> Object.prototype.__proto__
__proto__属性是一个访问器属性(一个setter和一个getter函数), 暴露了通过它访问对象内部的[[prototype]] {一个对象或null},注意：因为修改属性会引起性能问题，不推荐使用
```javascript
let Circle = function () {};
let shape = {};
let circle = new Circle();
 
// 设置该对象的原型链引用
// 过时且不推荐使用的。这里只是举个例子，尽量不要在生产环境中这样做。
shape.__proto__ = circle;

// 判断该对象的原型链引用是否属于circle
console.log(shape.__proto__ === circle); // true
```

>Object.prototype.constructor
返回创建实例对象的 Object 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。对原始类型来说，如1，true和"test"，该值只可读。
```javascript
```

##### 方法
> Object.create
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
```javascript
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
```

**[:arrow_up: 返回目录](#目录)**


#### 100. Array有哪些属性方法
javascript中Array对象是用于构造数组的全局对象, 创建的方式有两种: **new Array()**、和 **通过字面量的方式**const arr = [1,2,...];
##### 属性
>Array.length

数组的长度属性.在js中, Array.length是没有上界的,可以通过下标来给数组添加新的元素，不会发生越界错误
```javascript
var arr = [1,2,3]
arr[arr.length] = 4
arr  // [1,2,3,4]
```
后面的push方法要更加的方便完成这件事情

##### 方法
>Array.prototype.filter()

为数组提供过滤功能,它会遍历数组的所有元素,并返回满足筛选条件元素组成的**新数组**,filter()不会修改原数组
```javascript
var arr = [1,2,3]
var newArr = arr.filter(x => x%2 === 0) //[2]
```

filter()还可以配合Array.prototype.indexOf()去重
```javascript
var arr = [1,2,2,3,4,4,5]
var newArr = arr.filter((x,index,self) => 
	self.indexOf(x) === index //[1,2,3,4,5]
)
```

>Array.prototype.indexOf()

indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
上面的例子解释一遍是：
第一次循环，传入元素1，index(1)的索引为0，而此时1的索引本来就是0，OK，满足。

第二次循环，传入元素2，index(2)的索引为1，而此时2的索引也是1，OK，也满足。

第三次循环，传入元素2，index(2)的索引为1，而此时2的索引为2，OK，不满足，被PASS，这里就是巧妙的借用了indexOf始终查找到第一次出现的位置。
...

>Array.prototype.push()

push方法将一个或多个元素添加到数组的末尾，**并返回原数组的新长度**
```javascript
var arr = ['a','b'];
var val = [1,2,3]
var len = arr.push(val) // 3
console.log(arr) // ['a','b',[1,2,3]]
```

>Array.prototype.forEach()

完整的遍历数组的方法，语法： `arr.forEach(function(element,index,arr),this)`,与for循环一样，forEach也属于完整遍历数组的方法，并会对数组每项元素执行提供的回调函数
返回值是undefined

element: 遍历的当前元素；

index: 当前元素的索引；

arr: 数组本身

this: 回调函数中this指向


下面的例子加深一下参数的理解，同时理解这句话，**forEach() 被调用时，不会改变原数组，也就是调用它的数组（尽管 callback 函数在被调用时可能会改变原数组）**
```javascript
let arr = [1,2,1,3,4]
let obj = { a: 1}
arr.forEach(function(el,index,arr) {
	//arr.indexOf(el) === index ? arr.slice(index,1) : null
	console.log(`当前元素为${el}索引为${index},属于数组${arr}`);
	console.log(el + this.a)
},obj)
```
[面试题](https://github.com/BGround/Web-Front-End-Interview/issues/2)

>Array.prototype.reduce()

`reduce`为数组中的每一个元素依次执行`callback函数`，不包括数组中被删除或从未被赋值的元素，语法：
`arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

接受四个参数：

accumulator 累计器

currentValue 数组中正在处理的元素。

*currentIndex 当前索引 可选*

*array 数组 可选*

```javascript
let arr = [1,2,1,3,4]
let newArr = arr.reduce(function(acc,curr) {
	if(acc.indexOf(curr) === -1) {
		acc.push(curr);
	}
	return acc  //返回值：arr数组每个元素执行的callback函数后返回的新数组
},[]);
```

>Array.prototype.map()

一个由原数组每个元素执行回调函数的高阶方法, 返回值是执行callback函数后组成的`新数组`,map()不改变原数组, 但是callback函数可能修改

`var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])`

**callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。**

[面试题](https://github.com/BGround/Web-Front-End-Interview/issues/4)

```javascript
var map = Array.prototype.map
var a = map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

**[:arrow_up: 返回目录](#目录)**




