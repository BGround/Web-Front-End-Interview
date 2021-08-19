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




