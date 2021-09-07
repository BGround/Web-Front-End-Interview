## 引言
继承在各种编程语言中都充当着至关重要的角色，特别是在 JavaScript 中，它天生的灵活性，使应用场景更加丰富。
JavaScript 的继承也经常会在用在前端工程基础库的底层搭建上面，在整个 JavaScript 的学习中尤为重要。

那么，为了方便你更好地理解本讲的内容，在课程开始前请你先思考几个问题：

 - JS 的继承到底有多少种实现方式呢？

 - ES6 的 extends 关键字是用哪种继承方式实现的呢？

是不是这几个问题并不是那么容易地回答出来？

### JS 实现继承的几种方式
在学习继承的方式之前先了解下JS中构造函数、原型和实例的关系。
```js
//构造函数是通过new来新建一个对象的函数，
//通过构造函数和 new创建出来的对象，便是实例。 实例通过 __proto__指向原型，通过 constructor指向构造函数。
var instance = new Object()
//实例则包含一个原型对象的指针, 原型对象又包含一个指向构造函数的指针
instance.__proto__ === Object.prototype
```

JS 实现继承的几种方式

1. 原型链继承
2. 构造函数继承（借助 call）
3. 组合继承（前两种组合）
4. 原型式继承
5. 寄生式继承
6. 寄生组合式继承

### 第一种：原型链继承
通过一段代码来了解下
```js
function Parent() {
	this.name = 'p';
	this.arr = [1,2,3];
}

function Children() {
	this.type = 'c'
}

Children.prototype = new Parent();
console.dir(new Children())
```
![原型链继承1](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/image/原型链继承1.png)
通过打印可以看到代码没有问题，可以访问父类的属性和方法, 但是使用过程中有潜在的问题，继续看下面的实例
```js
var c1 = new Children();
var c2 = new Children();
c1.arr.push(4);
console.log(c1.arr,c2.arr);
```
![原型链继承2](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/image/原型链继承2.png)

可以看到只改变c1的arr属性，c2也跟着改变了。这是因为两个实例是公用的一个原型对象，内存空间是共享的。

### 第二种：构造函数继承
结合原型链继承，先看一段代码来了解下
```js
function Parent2() {
	this.name = 'p';
	this.arr = [1,2,3];
}

Parent2.prototype.getName = function() {
	return this.name;
}

function Children() {
	Parent2.call(this);
	this.type = 'c';
}

var c1 = new Children();
var c2 = new Children();
c1.arr.push(4);
console.log(c1.arr,c2.arr);
console.log(new Children())
console.log(Children.getName())
```
执行代码可以得到下面的结果
![构造函数继承](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/image/构造函数继承.png)

### 第三种：组合继承
这种方式结合前两种继承方式的优缺点，结合起来的继承，代码如下

```js
function Parent3() {
	this.name = 'p3'
	this.arr = [1,2,3]
}

Parent3.prototype.getName = function() {
	return this.name;
}

function Child3() {
	// 第二次调用 Parent3
	Parent3.call(this);
	this.type = 'c3'
}

// 第一次调用Parent3
Child3.prototype = new Parent3();
// 手动挂上自己的构造函数
Child3.prototype.construntor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.arr.push(4);
console.log(s3.arr, s4.arr); //互不影响
console.log(s3.getName()); // p3
console.log(s4.getName()); // p3
```
从结果可以看出组合继承可以解决原型链和构造函数两种继承方式的缺点，但是增加了一个新的问题，Parent3调用了两次，增加了性能的开销。

那么是否有更好的办法解决这个问题呢？请你再往下学习，下面的3种继承方式可以更好地解决这里的问题。

上面介绍的更多是围绕着构造函数的方式，那么对于 JavaScript 的普通对象，怎么实现继承呢？

### 原型式继承
这里不得不提到的就是 ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）。

```js
let Parent4 = {
	name: 'Parent4',
	arr: [1,2,3],
	getName: function() {
		return this.name;
	}
}

let Child4 = Object.create(Parent4);
Child4.name = 'Child4';
Child4.arr.push(4);
let Child5 = Object.create(Parent4);
Child5.arr.push(5);
console.log(Child4.name); // Child4
console.log(Child4.__proto__.name); // Child4
console.log(Child5.name); // Parent4
console.log(Child4.arr); // [1,2,3,4,5]
console.log(Child5.arr); // [1,2,3,4,5]
console.log(Child4, Child5); 
```
 最后一句log打印显示如下图
![构造函数继承](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/image/原型式继承.png)

从Child4.arr和Child5.arr打印出来的log可以看出来，Object.create()方法实现的时是浅拷贝。
*缺点：*多个实例的引用数据类型属性指向相同的内存，存在篡改的可能。
 
### 寄生式继承
寄生式继承是使用原型式继承获得一份目标对象的浅拷贝, 然后利用这个浅拷贝的对象添加一些方法。

```js
let Parent5 = {
	name: 'Parent5',
	arr: [1,2,3],
	getName: function() {
		return this.name;
	}
}

function Clone(origin) {
	const clone = Object.create(origin);
	clone.getArr = function() {
		return this.arr;
	}
	return clone;
}

let Child5 = Clone(Parent5);
Child5.name = 'Child5'
console.log(Child5.getName());
console.log(Child5.getArr());
console.log(Child5);
```
从最后的输出结果中可以看到，Child5 通过 clone 的方法，增加了 getArr 的方法，从而使 Child5 这个普通对象在继承过程中又增加了一个方法，这样的继承方式就是寄生式继承。

### 寄生组合式继承
先看下代码中如何使用寄生组合继承的
```js
function Parent6(name) {
	this.name = name;
	this.arr = [1,2,3]
}
function Clone(parent, child) {
	var clone = Object.create(parent.prototype) // 创建对象
	child.prototype = clone; //指定对象
	clone.constructor = clone;
}
function Child6(name) {
	Parent6.call(this, name);
}
Clone(Parent6, Child6);

let child6 = new Child6('child6');
let child7 = new Child6('child7');
child6.arr.push(6);
child7.arr.push(7);
console.log(child6.name); // child6
console.log(child7.name); // child7
console.log(child6, child7);
```
 最后一句log打印显示如下图
![构造函数继承](https://github.com/BGround/Web-Front-End-Interview/blob/main/JavaScript/image/寄生组合继承.png)

可以看到 child6 child7 打印出来的结果，属性都得到了继承，方法也没问题，可以输出预期的结果

### ES6 的 extends 关键字实现逻辑


