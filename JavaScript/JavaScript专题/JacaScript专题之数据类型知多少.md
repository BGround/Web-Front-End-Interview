### 引言
作为 JavaScript 的入门级知识点，JS 数据类型在整个 JavaScript 的学习过程中其实尤为重要，在大厂面试中，经常需要你现场手写代码，因此你很有必要提前考虑好数据类型的边界判断问题，
并在你的 JavaScript 逻辑编写前进行前置判断，这样才能让面试官看到你严谨的编程逻辑和深入思考的能力，面试才可以加分。

本节从数据类型的概念，检测方法和转换方法来学习

#### 概念
![](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/javascript_files/dataType.png)

其中，前7种是基本数据类型，最后一种(Object)为引用数据类型。
引用数据类型（Object）又分为图上这几种常见的类型：Array - 数组对象、RegExp - 正则对象、Date - 日期对象、Math - 数学函数、Function - 函数对象。

在这里，我想先请你重点了解下面两点，因为各种 JavaScript 的数据类型最后都会在初始化之后放在不同的内存中，因此上面的数据类型大致可以分成两类来进行存储：

 - 基础类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量；

 - 引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念。

#### 检测方法
数据类型检测也是面试过程中经常会遇到的问题，比如：如何判断是否为数组？让你写一段代码把 JavaScript 的各种数据类型判断出来，等等。类似的题目会很多，而且在平常写代码过程中我们也会经常用到。

数据类型的判断方法其实有很多种，比如 typeof 和 instanceof，下面我来重点介绍三种在工作中经常会遇到的数据类型检测方法。

**第一种判断方法：typeof**
```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'
```

引用数据类型 Object，用 typeof 来判断的话，除了 function 会判断为 OK 以外，其余都是 'object'，是无法判断出来的。

**第二种判断方法：instanceof**
```js
let Car = function() {}
let benz = new Car()
benz instanceof Car // true
let car = new String('Mercedes Benz')
car instanceof String // true
let str = 'Covid-19'
str instanceof String // false
```
现在你知道了两种判断数据类型的方法，那么它们之间有什么差异呢？我总结了下面两点：

 - instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；

 - 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断。

**第三种判断方法：Object.prototype.toString**
toString() 是 Object 的原型方法，调用该方法，可以统一返回格式为 “[object Xxx]” 的字符串，其中 Xxx 就是对象的类型。
对于 Object 对象，直接调用 toString() 就能返回 [object Object]；而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息。我们来看一下代码。
```js
Object.prototype.toString({})       // "[object Object]"
Object.prototype.toString.call({})  // 同上结果，加上call也ok
Object.prototype.toString.call(1)    // "[object Number]"
Object.prototype.toString.call('1')  // "[object String]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)   //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g)    //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([])       //"[object Array]"
Object.prototype.toString.call(document)  //"[object HTMLDocument]"
Object.prototype.toString.call(window)   //"[object Window]"
```

#### 数据类型转换
在日常的业务开发中，经常会遇到 JavaScript 数据类型转换问题，有的时候需要我们主动进行强制转换，而有的时候 JavaScript 会进行隐式转换，隐式转换的时候就需要我们多加留心

**强制转换**
强制类型转换方式包括 `Number()、parseInt()、parseFloat()、toString()、String()、Boolean()`，这几种方法都比较类似，通过字面意思可以很容易理解，都是通过自身的方法来进行数据类型的强制转换

 - Boolean() 方法的强制转换规则

这个方法的规则是：除了 `undefined、 null、 false、 ''、 0（包括 +0，-0）、 NaN` 转换出来是 false，其他都是 true。

这个很好理解，有的面试中会问道去掉假值,就是去掉上面所说的六种

 - Number() 方法的强制转换规则
 
 1、如果是布尔值，true 和 false 分别被转换为 1 和 0；
 
 2、如果是数字，返回自身；
 
 3、如果是 null，返回 0；
 
 4、如果是 undefined，返回 NaN；
 
 5、如果是字符串，遵循以下规则：如果字符串中只包含数字（或者是 0X / 0x 开头的十六进制数字字符串，允许包含正负号），则将其转换为十进制；如果字符串中包含有效的浮点格式，将其转换为浮点数值；如果是空字符串，将其转换为 0；如果不是以上格式的字符串，均返回 NaN；
 
 6、如果是 Symbol，抛出错误；
 
 7、如果是对象，并且部署了 [Symbol.toPrimitive] ，那么调用此方法，否则调用对象的 valueOf() 方法，然后依据前面的规则转换返回的值；如果转换的结果是 NaN ，则调用对象的 toString() 方法，再次依照前面的顺序转换返回对应的值（Object 转换规则会在下面细讲）。
 
 ----
 
 **隐式转换**
 凡是通过逻辑运算符 (&&、 ||、 !)、运算符 (+、-、*、/)、关系操作符 (>、 <、 <= 、>=)、相等运算符 (==) 或者 if/while 条件的操作，如果遇到两个数据类型不一样的情况，都会出现隐式类型转换。这里你需要重点关注一下，因为比较隐蔽，特别容易让人忽视。
 
 下面着重讲解一下日常用得比较多的“==”和“+”这两个符号的隐式转换规则。
 
 - '==' 的隐式类型转换规则
 1、如果类型相同，无须进行类型转换；
 
 2、如果其中一个操作值是 null 或者 undefined，那么另一个操作符必须为 null 或者 undefined，才会返回 true，否则都返回 false；
 
 3、如果其中一个是 Symbol 类型，那么返回 false；
 
 4、两个操作值如果都为 string 和 number 类型，那么就会将字符串转换为 number；
 
 5、如果一个操作值是 boolean，那么转换成 number；
 
 6、如果一个操作值为 object 且另一方为 string、number 或者 symbol，就会把 object 转为原始类型再进行判断（调用 object 的 valueOf/toString 方法进行转换）。
 
 
 - '+' 的隐式类型转换规则
 '+' 号操作符，不仅可以用作数字相加，还可以用作字符串拼接。仅当 '+' 号两边都是数字时，进行的是加法运算；如果两边都是字符串，则直接拼接，无须进行隐式类型转换。
 
 除了上述比较常规的情况外，还有一些特殊的规则，如下所示。
 
 1、如果其中有一个是字符串，另外一个是 undefined、null 或布尔型，则调用 toString() 方法进行字符串拼接；如果是纯对象、数组、正则等，则默认调用对象的转换方法会存在优先级（下一讲会专门介绍），然后再进行拼接。
 
 2、如果其中有一个是数字，另外一个是 undefined、null、布尔型或数字，则会将其转换成数字进行加法运算，对象的情况还是参考上一条规则。
 
 3、如果其中一个是字符串、一个是数字，则按照字符串规则进行拼接。
 
 ```js
 1 + 2        // 3  常规情况
 '1' + '2'    // '12' 常规情况
 // 下面看一下特殊情况
 '1' + undefined   // "1undefined" 规则1，undefined转换字符串
 '1' + null        // "1null" 规则1，null转换字符串
 '1' + true        // "1true" 规则1，true转换字符串
 '1' + 1n          // '11' 比较特殊字符串和BigInt相加，BigInt转换为字符串
 1 + undefined     // NaN  规则2，undefined转换数字相加NaN
 1 + null          // 1    规则2，null转换为0
 1 + true          // 2    规则2，true转换为1，二者相加为2
 1 + 1n            // 错误  不能把BigInt和Number类型直接混合相加
 '1' + 3           // '13' 规则3，字符串拼接
 ```
 
 - *Object 的转换规则
 对象转换的规则，会先调用内置的 [ToPrimitive] 函数，其规则逻辑执行顺序如下：
 
 1、如果部署了 Symbol.toPrimitive 方法，优先调用再返回；
 
 2、调用 valueOf()，如果转换为基础类型，则返回；
 
 3、调用 toString()，如果转换为基础类型，则返回；
 
 如果都没有返回基础类型，会报错。
 
 
 结束====