## React中组件中的几种通信方式

在react使用过程中，不可避免的需要在组件之间进行信息传递(通信)，组件间通信大体分为下面几种情况：

- 父组件向子组件通信
- 子组件向父组件通信
- 跨级组件之间通信
- 非嵌套组件通信

### 父组件向子组件通信

这个是最简单也是最常用的一种通信方式，父组件通过向子组件传递props，子组件得到props之后做相应的处理；

**//父组件App.js**
```
import React, {Component} from 'react';
import Child from 'Child';

export default class App extends Component {
	
	render() {
		return (
			<div>
				<Chlid title = "this message from parent" />
			</div>
		)
	}
}
```

**//子组件 Chlid.js**
```
import React from 'react'

const Child = (props) => {
	return (
		<h1>
			{props.title}
		</h1>
	)
}

export default Child;

```

### 子组件向父组件通信

利用回调函数，可以实现子组件向父组件通信，父组件将一个函数做为props传递给子函数，子函数通过调用该回调函数，便可以向父组件通信

**//子组件Child.js**
```
const Child = (props) => {
	const sub = (msg) => {
		return () => {
			props.callback(msg)
		}
	}
	
	return (
		<div>
			<button onClik = {sub('this message from Child')} />
		</div>
	)
}
```

**//父组件App.js**
```
export default class App extends Component {
	callback(msg) {
		console.log('msg='+msg)
	}
	
	render() {
		return {
			<div>
				<Child callback = {this.callback.bind(this)} />
			</div>
		}
	}
}

```

### 跨级组件通信

所谓跨级组件通信，就是父组件向子组件的子组件通信，向更深层次的子组件通信。跨级组件通信通常又下面两种方式：

- 组件层层传递props
- 使用context对象

对于第一种方式，如果父组件结构较深，那么中间组件需要每层都传递props，增加了复杂度，而且并不是每层中间件都是需要这些props。
对于三层以上的嵌套结构，需要斟酌使用

使用context是另外一种可以的方式，context相当于一个全局变量，无论结构又多深，都可以使用。
使用context需要满足下面两个条件

- 上级组件要声明自己支持context对象，并提供一个函数返回相应的context对象
- 子组件需要生命自己需要使用context


### 非嵌套组件通信

非嵌套组件就是组件之间没有任何包含关系的组件，包括兄弟组件和不在同一个父级组件的非兄弟组件。
对于非嵌套组件有下面两种方式：

- 利用二者共同父组件的context对象
- 利用自定义事件的方式

如果采用组件间共同的父级来进行中转，会增加子组件和父组件之间的耦合度，
如果组件层次较深的话，找到二者公共的父组件不是一件容易的事，当然还是那句话，也不是不可以...

采用自定义事件的方式来实现通信：
首先要安装events包
```
npm install events --save
```
之后创建四个文件：ev.js App.js Foo.js Boo.js

新建一个ev.js文件，引入events包, 并向外提供一个事件对象，供通信时使用
```
import {EventEmitter} frpm 'events';
export default new EventEmitter();
```

App.js
```
import React, {Component} from 'react';
import Foo from 'Foo.js';
import Boo from 'Boo.js';

export default class App extends Component {

	render() {
		return (
			<div>
				<Foo />
				<Boo />
			</div>
		)
	}
}
```

Foo.js
```
import React, {Component} from 'react';
import emitter from './ev.js';

export default class Foo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: ''
		}
	}
	
	componentDidMount() {
		this.eventEmitter = emitter.addListener("callme", (msg) => {
			this.setState({msg});
		})
	}
	
	componentUnMount() {
		emitter.removeListener(this.eventEmitter);
	}
	
	render() {
		return (
			<div>
					{this.state.msg}
					...这是非嵌套Foo函数
			</div>

		)
	}
}
```

Boo.js
```
import React, {Component} from 'react';
import emitter from './ev.js';

export default class Boo extends Component {
	render() {
		const sub = (msg) => {
			return () => {
				//触发自定义事件
				emitter.emit('callme', msg);
			}
		}
		
		return (
			<div>
				<button onClick= { sub('非嵌套Boo函数') }> 点击 </button>
			</div>
 		)
	}
}
```

自定义事件是典型的**事件/订阅模式**，通过向事件对象上添加事件监听和触发事件来实现组件的通信


### 总结

本文总结了几种react组件之间通信的方式，分别是：

- 父组件向子组件通信，使用props
- 子组件向父组件通信，使用回调函数
- 跨级组件通信，使用props和context对象
- 非嵌套组件通信，使用context对象或者自定义事件

最后，组件之间的通信，并不是限于一种方式，涉及到个人喜好和熟练，关键是找到最合适的方式。










