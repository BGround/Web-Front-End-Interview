# 引言
React项目中经常用到的知识点

# 目录
## React
- [react 生命周期](#-react-生命周期)
- [state和props触发更新的生命周期函有什么区别](#-state和props触发更新的生命周期函有什么区别)
- [构建组件的方式](#-构建组件的方式)
- [props和state的区别](#-props和state的区别)
- [父组件中props改变会不会引起子组件的重新渲染](#-父组件中props改变会不会引起子组件的重新渲染)
- [react中setState是同步还是异步的](#-react中setState是同步还是异步的)
- [react中组件的几种通信方式](#-react中组件的几种通信方式)
- [哪些方法会触发react重新渲染,重新渲染render会做些什么](#-哪些方法会触发react重新渲染-重新渲染render会做些什么)
- [React在使用过程中遇到的问题怎么解决的](#-React在使用过程中遇到的问题怎么解决的)
- [React中key的作用](#-React中key的作用)
- [React中Dom diff算法](#-React中Dom-diff算法)
- [无状态组件](#-无状态组件)
- [高阶组件](#-高阶组件)
- 
-
高阶组件 refs和DOM Fragments diff(协调) 非受控组件

## Redux
- [聊聊Redux和Vuex的设计思想](#-聊聊Redux和Vuex的设计思想)
- [Redux中间件](#-Redux中间件)
- [redux接入和绑定connect过程以及原理](#-redux接入和绑定connect过程以及原理)
- [reducer处理过程以及处理后的state是怎么注入到组件中的](#-reducer处理过程以及处理后的state是怎么注入到组件中的)
-

## React-Router
- [react-router 里的 <Link> 标签和 <a> 标签有什么区别](#-router里的Link和a标签有什么区别)



## React

### react 生命周期
**组件的生命周期**
version >= 16.4
挂载时:当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下
	- constructor()
	- getDerivedStateFromProps
	- render() *这个是组件唯一且必须实现的函数*
	- componentDidMount
	
更新时:当组件的 props 或 state 发生变化时会触发更新
	- getDrivedStateFromProps
	- shouldComponentUpdate *返回值为true或false, 判断 React 组件的输出是否受当前 state 或 props 更改的影响*
	- render
	- getSnapshotBeforeUpdate
	- componentDidUpdate

卸载时:当组件从 DOM 中移除时会调用如下方法：
	- componentWillUnmount

**[:arrow_up: 返回目录](#目录)**

### state和props触发更新的生命周期函有什么区别

传送门：
[state和props触发更新的生命周期函有什么区别](https://github.com/BGround/Web-Front-End-Interview/blob/main/React/state和props触发更新的生命周期函有什么区别.md)

**[:arrow_up: 返回目录](#目录)**

### 构建组件的方式
**类组件:** ES6 class 定义的组件，一个类组件必须有一个render()方法，这个方法必须返回一个jsx元素，要用一个外层的元素把所有的内容都包裹起来
**函数组件:** 本质上就是一个JavaScript函数，接受唯一带数据的props对象和返回一个React元素

**[:arrow_up: 返回目录](#目录)**

### props和state的区别
props和state都是JavaScript对象，但是在使用中有本质的区别

 * props 是传递给组件的(类似与函数形参)，state 是组件内部自己创建管理的(相当于函数的全局变量)，一般是在构造函数constructor中初始化
 * props 是不可修改的吗，所有React组件都必须像纯函数一样保护他们的props不被修改，state 是多变的，可修改的，每次setState都异步更新state

**[:arrow_up: 返回目录](#目录)**

### 父组件中props改变会不会引起子组件的重新渲染
结果是: **不一定**,
分析: 在组件的生命周期中，更新时会调用shouldComponentUpdate钩子函数，通过该函数的返回值，判断React组件的输出是否受当前state或props更改的影响。
比较的方式是当组件的props或者state变化时，React会对组件当前的props和state分别进行比较，但是只是浅比较，如果props或state本身是对象或数组时，
这会导致子组件实际的props和state没有变化，组件没有更新，也可以结合React的PureComponent基类做浅拷贝处理

**[:arrow_up: 返回目录](#目录)**

### react中setState是同步还是异步的
*注意：* 这里所说的异步不是真正的异步，而是指调用setState之后this.state能否立即更新，答案是它还是同步更新的，这里的异步指的是多个state会合成到一起进行批量更新。

1、由React 控制的事件处理程序，以及生命周期函数调用setState 不会同步更新state 。

2、React 控制之外的事件中调用setState 是同步更新的。比如原生js 绑定的事件，setTimeout/setInterval 等。

**[:arrow_up: 返回目录](#目录)**

### react中组件的几种通信方式

文章链接：[React中组件中的几种通信方式](https://github.com/BGround/Web-Front-End-Interview/blob/main/React/组件中通信方式.md)

**[:arrow_up: 返回目录](#目录)**

### 哪些方法会触发react重新渲染，重新渲染render会做些什么

1. setState()方法被调用
setState方法是react中最常用的命令, 执行setState会触发render。但是有一点需要注意，setState方法调用是否会一定触发render？
答案是否定的，setState传入的值是null时，并不会触发render

2. 父组件重新渲染
只要父组件重新渲染了，即使传入子组件的props没有变化，子组件也会重新渲染，进而触发render

重新渲染render会做些什么?
* 会对新旧VNode进行对比，也就是DOM diff
* 会对新旧两颗树进行深度遍历，将遍历到差异放到一个对象里面
* 遍历差异对象，根据差异类型，对应规则更新VNode

**[:arrow_up: 返回目录](#目录)**

### React在使用过程中遇到的问题怎么解决的
* SPA应用，首屏时间过长: 可以增加Loading、骨架屏、SSR和异步加载等方法解决，React版本总还有用于数据获取的 Suspense，但是还在试验阶段；
* 父节点状态更新会导致无关子节点更新: 使用shouldComponentUpdate、PureComponent和React.memo等方式避免不必要的渲染
* setState并非都是同步更新: 在使用setState方法时，要注意setState的状态更新，多次使用setState会被忽略的问题，另外Object类型的state更新需要注意引用问题
* 复杂组件使用state难以追踪: 应该使用redux统一管理state

**[:arrow_up: 返回目录](#目录)**

### React中key的作用
key在React中是添加在数组列表中，用于确定哪些元素是被添加或者删除的一个标识。
在Dom diff 算法中，React会借助元素的key来判断该元素是新创建的还是被移动元素，从而减少不必要的渲染。

>注意事项：
>1、key值一定要与元素一一对应
>2、尽量不要使用数组的index去作为key
>3、不要试图在render时候使用随机数或者其他操作给元素加上不稳定的key，不然造成的性能开销比不加key更糟糕

**[:arrow_up: 返回目录](#目录)**

### React中Dom diff算法
查看![Dom-diff](https://github.com/BGround/Web-Front-End-Interview/blob/main/React/images/Dom-diff.png)
**[:arrow_up: 返回目录](#目录)**

### 无状态组件
无状态组件指的是组件内部不维护state，只根据外部组件传入的props进行渲染的组件，当props改变时，组件重新渲染。
有状态组件内部使用state，维护自身状态的变化，根据外部传入的props和自身的state，进行渲染。

无状态组件的特点：
 * 不依赖自身的state
 * 可以时类组件也可以是函数组件
 * 可以完全避免使用this（使用箭头函数无需绑定this）
 * 有更高的性能，当不需要使用生命周期函数钩子的时候，可以考虑使用无状态组件

**[:arrow_up: 返回目录](#目录)**

### 高阶组件


**[:arrow_up: 返回目录](#目录)**





## Redux

### 聊聊Redux和Vuex的设计思想

Redux： view——>actions——>reducer——>state变化——>view变化（同步异步一样）

Vuex： view——>commit——>mutations——>state变化——>view变化（同步操作） 
			 view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）
			 
**[:arrow_up: 返回目录](#目录)**

### Redux中间件
* redux-thunk —— 搭建异步action构造器
* redux-logger —— 记录所有Redux action和下一次state的日志
* redux-saga

**[:arrow_up: 返回目录](#目录)**

### redux接入和绑定connect过程以及原理


**[:arrow_up: 返回目录](#目录)**

### reducer处理过程以及处理后的state是怎么注入到组件中的


**[:arrow_up: 返回目录](#目录)**





## React-Router

### router里的Link和a标签有什么区别
* <Link>标签是react-router-dom下的元素，<a>是html原生标签
* 两者同样都会实现页面的跳转功能，<Link>会页面无刷新的跳转，而<a>标签进行刷新
* 出现上面现象的原因<a>标签在涉及到path变化后浏览器的原生反应就是会刷新页面，虽然<Link>渲染后默认也是a标签,在<Link>内部的实现原理是通过history进行了跳转，并且event.preventDefault()阻止了a标签的默认事件

```js
// a 标签禁掉默认事件后，怎么实现的跳转
let domArr = document.getElementsByTagName('a')
[...domArr].forEach(item=>{
    item.addEventListener('click',function () {
        location.href = this.href
    })
})

```
**[:arrow_up: 返回目录](#目录)**









