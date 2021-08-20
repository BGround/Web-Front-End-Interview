## 引言
React项目中经常用到的知识点

## 目录
- [react 生命周期](#-react-生命周期)
- [构建组件的方式](#-构建组件的方式)
- [父组件中props改变会不会引起子组件的重新渲染](#-父组件中props改变会不会引起子组件的重新渲染)
- [react中setState是同步还是异步的](#-react中setState是同步还是异步的)
- [react中组件的几种通信方式](#-react中组件的几种通信方式)
- [高阶组件](#-高阶组件)
-
-
-



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

### 构建组件的方式
**类组件:** ES6 class 定义的组件，一个类组件必须有一个render()方法，这个方法必须返回一个jsx元素，要用一个外层的元素把所有的内容都包裹起来
**函数组件:** 本质上就是一个JavaScript函数，接受唯一带数据的props对象和返回一个React元素

**[:arrow_up: 返回目录](#目录)**

### 父组件中props改变会不会引起子组件的重新渲染
结果是: **不一定**,
分析: 在组件的生命周期中，更新时会调用shouldComponentUpdate钩子函数，通过该函数的返回值，判断React组件的输出是否受当前state或props更改的影响。
比较的方式是当组件的props或者state变化时，React会对组件当前的props和state分别进行比较，但是只是浅比较，如果props或state本身是对象或数组时，这会导致子组件实际的props和state
没有变化，组件没有更新

**[:arrow_up: 返回目录](#目录)**

### react中setState是同步还是异步的


**[:arrow_up: 返回目录](#目录)**

### react中组件的几种通信方式

文章链接：[React中组件中的几种通信方式](https://github.com/BGround/Web-Front-End-Interview/blob/main/React/组件中通信方式.md)

**[:arrow_up: 返回目录](#目录)**





