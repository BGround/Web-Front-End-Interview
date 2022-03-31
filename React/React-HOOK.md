## 面试中会问到？
1. 写hooks跟写类组件比，hooks有啥优势？
* 代码复用更有优势--Hook使你在无需修改组件结构的情况下复用状态逻辑(类组件中需要用到render props和HOC，这会很麻烦，需要重新组织代码的结构，还会使代码变得难以理解)
* 代码管理更方便--Hook将组件中相互关联的部分拆分为更小的函数(比如设置订阅和请求数据,通常在componentDidMount中会有请求数据，还会加一些其他的逻辑，componentWillUnmount中会加一些定时器的清除)
* 代码更好理解 -- Hook使你在非class情况下可以使用更多的React特性，因为class是学习React的一个障碍，需要理解JS中this的工作方式，还要区分函数组件和class组件的使用场景

## useState 为什么返回的是一个数组而不是对象
首先useState的用法是 const [value, setValue] = useState(0), 可以看到useState返回的是一个数组，而不是对象，why?

回答这个问题要先明白 ES6 中的解构赋值，

```js
// 数组解构赋值
const arr = ['one', 'two', 'three'];
const [a, b, c] = arr
console.log(a) // 'one'
console.log(b) // 'two'
console.log(c) // 'three'

// 对象解构赋值
const obj = {
	id: 32,
	is_verified = false
}

const {id, is_verified} = obj
console.log(id) // '32'
console.log(is_verified) // false

```

优点：返回数组，可以对数组中的变量进行命名，看起来比较干净。而如果是对象的话，返回的值必须和useState 内部实现返回的对象同名。
缺点：
1. 返回的值强顺序，灵活性比较低
2. 返回的值都得使用，如果只是用setState的话就得这么写 const [, setState] = useState(false)

总结：在自定义Hook的时候遵循一个原则，当参数大于2个的时候，返回的值类型是object



## useEffect是如何区分生命周期钩子的
useEffect 可以被看成是 componentDidMount, componentDidUpdate 和 componentWillUnmount 三者的结合。

接收两个参数，useEffect(callback, [source]), 调用方式如下：
```js
useEffect(() => {
	console.log('mounted')
	
	return () => {
		console.log('unmount')
	}
}, [source])
```

生命周期函数的调用主要是通过第二个参数[souce]来控制的，有如下情况
* [source]不传，每次调用上次保存的函数中返回的那个函数
* [source]传[]，则函数只有在初始化的时候执一次相当于componentDidMount
* [source]参数有值时，则只会监听到数组值变化时才会优先调用返回的那个函数，再调用外部的函数


* 我们如何封装一个hook？
* hooks原理是什么？























