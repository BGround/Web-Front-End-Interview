## Vue 面试知识点总结
可以阅读组件库源码哈 😄https://github.com/vueComponent/ant-design-vue

vue源码可以推荐两个：
https://ustbhuangyi.github.io/vue-analysis/
https://github.com/answershuto/learnVue

## 目录

### Vue
* [vue的生命周期和每个生命周期所做的事情](#vue的生命周期和每个生命周期所做的事情)
* [vm.data调用问题？](#vm.data调用问题)
* [v-if和v-show的区别](#v-if和v-show的区别)
* [template的使用](#template的使用)
* [vue的diff算法](#vue的diff算法)
* [写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么?](#5-写-React和Vue-项目时为什么要在列表组件中写-key，其作用是什么?)

*

### Vuex
* [11. vue2和vue3中Vuex使用区别？](#11-vue2和vue3中Vuex使用区别)
* [12. 为什么Vuex的mutation和Redux的reducer中不能做异步操作](#12-为什么Vuex的mutation和Redux的reducer中不能做异步操作)
* [13. 为什么Vuex的store中的状态是响应式的?](#13-为什么Vuex的store中的状态是响应式的)
* [14. 双向绑定和单向数据流不冲突?](#14-双向绑定和单向数据流不冲突)
* [15. vuex中的数据在页面刷新以后消失怎么办？](#15-vuex中的数据在页面刷新以后消失怎么办)
*

### Vue-router
*
*
*
*
*
*



#### vue的生命周期和每个生命周期所做的事情
vue的生命周期分为四个阶段
1：实例创建
2：DOM渲染
3：数据更新
4：实例销毁
共有八个基本钩子函数
beforeCreat: 在new一个vue实例之后，data和methods都还没有初始化，不能使用;
created: data和methods都初始化好了，$el还没有，此阶段可以做的：解决loading，请求ajax数据为mounted渲染做准备
beforeMount: vue的$el和data都初始化了，但是还是虚拟的dom节点，具体的data.filter还没替换;
mounted: 已挂载vue实例已经初始化完成了，data.filter成功渲染，配合路由钩子使用;
beforeUpdate: data更新时触发;
updated: 
beforeDestory: 实例销毁之前，实例仍可使用
destroyed: 

**[:arrow_up: 返回目录](#目录)**

#### vm.data调用问题？
```javascript
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true
```

疑问：
为什么通过vm实例访问data对象属性a时，是直接vm.a，而不是vm.data.a？不是访问Vue实例对象vm下的data数据属性对应的data对象下的a属性么？

vue中定义的data在执行new Vue（）创建时候变为vue对象实例的属性，并给属性添加get和set方法，get和set操作的是原data对象

相关知识点：
>官网中说，当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中

**[:arrow_up: 返回目录](#目录)**

#### v-if和v-show的区别

v-if和v-show看起来似乎差不多，当条件不成立时，其所对应的标签元素都不可见，但是这两个选项是有区别的:
 - 1.v-if在条件切换时，会对标签进行适当的创建和销毁，而v-show则仅在初始化时加载一次，因此v-if的开销相对来说会比v-show大。
 - 2.v-if是惰性的，只有当条件为真时才会真正渲染标签；如果初始条件不为真，则v-if不会去渲染标签。v-show则无论初始条件是否成立，都会渲染标签，
它仅仅做的只是简单的CSS切换，改变的是display属性,block显示,none不显示

**[:arrow_up: 返回目录](#目录)**

#### template的使用
在.vue文件中,template标签是用来写html模块的，且内部必须只有一个根元素，不然会报错
```javascript
<template>
    <div class="demo">
        .....
    </div>
</template>
```

<font color=red>template标签中不能使用v-show </font>

有时候,不需要这外层的 div ，可以采用下面 的方法，在 <template>标签上使用 v-for来循环
```javascript
<template>
    <div class="root">
        <div v-for="item,index in 5" :key="index">测试{{index}}</div>
    </div>
</template>
```
**[:arrow_up: 返回目录](#目录)**

#### vue的diff算法

**[:arrow_up: 返回目录](#目录)**

#### 写 React和Vue 项目时为什么要在列表组件中写 key，其作用是什么?
key的特殊属性是在虚拟DOM的算法中，在新旧node对比时辨识VNodes。key的作用是子更新组件时更准确更快的判断两个节点是否相同，相同就复用，不相同就删除旧的创建新的

Vue官方文档：
>这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

默认模式就是Vue在使用v-for渲染元素时，默认会采用`就地复用更新`的策略  
```js
var vm = new Vue({
  el: '#app',
  data: {
    dataList: [1, 2, 3, 4, 5]
  }
})
vm.dataList = [3, 4, 5, 6, 7] // 数据进行增删

// 1. 没有key的情况， 节点位置不变，内容也更新了
[
  '<div>3</div>', // id： A
  '<div>4</div>', // id:  B
  '<div>5</div>', // id:  C
  '<div>6</div>', // id:  D
  '<div>7</div>'  // id:  E
]

// 2. 有key的情况， 节点删除了 A, B 节点，新增了 F, G 节点
// <div v-for="i in dataList" :key='i'>{{ i }}</div>
[
  '<div>3</div>', // id： C
  '<div>4</div>', // id:  D
  '<div>5</div>', // id:  E
  '<div>6</div>', // id:  F
  '<div>7</div>'  // id:  G
]
```

>官方建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

在项目大多数使用情境下，列表组件都是用自己的状态的
**举个例子**：一个新闻列表，可点击列表项来将其标记为"已访问"，可通过tab切换“娱乐新闻”或是“社会新闻”。

不带key属性的情况下，在“娱乐新闻”下选中第二项然后切换到“社会新闻”，"社会新闻"里的第二项也会是被选中的状态，因为这里复用了组件，保留了之前的状态。
要解决这个问题，可以为列表项带上新闻id作为唯一key，那么每次渲染列表时都会完全替换所有组件，使其拥有正确状态。


**[:arrow_up: 返回目录](#目录)**


#### vue2和vue3中Vuex使用区别
两者核心区别就是类型提示，像定义组件需要 defineComponent 同出一辙：
```js
/**   vue3    ***/
import { createStore } from "vuex";

import example from './modules/example'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { example }
})

/**   vue2    ***/
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});

```

**[:arrow_up: 返回目录](#目录)**


#### 为什么Vuex的mutation和Redux的reducer中不能做异步操作
分析一下mutation必须是同步函数的原因，是因为devtool插件需要跟踪记录每一条mutation日志，每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照
如果mutation中使用异步函数操作，当mutation被触发时，回调函数还没有被调用的话，devtools就无法知道回调函数什么时候结束，也就无法无法追踪store中state，这与vuex设计
的初衷不符
**[:arrow_up: 返回目录](#目录)**

#### 为什么Vuex的store中的状态是响应式的

14-双向绑定和单向数据流不冲突

**[:arrow_up: 返回目录](#目录)**

#### 双向绑定和单向数据流不冲突
双向绑定是使用v-model实现，它知识一种语法糖，为了写更少的代码，实质上还是单向数据流
当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会比较棘手：
现有两种解决方法：
 * 给 <input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用一个方法:
 * 双向绑定的计算属性
**[:arrow_up: 返回目录](#目录)**

#### vuex中的数据在页面刷新以后消失怎么办
1.采用将store中数据存储到本地浏览器sessionStorage中
```js
//在页面加载时读取 sessionStorage 里的状态信息
if (sessionStorage.getItem("store") ) {
 this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))     
} 
//在页面刷新时将 vuex 里的信息保存到 sessionStorage 里
window.addEventListener("beforeunload",()=>{
  sessionStorage.setItem("store",JSON.stringify(this.$store.state))
}
```
2.解决 vuex 刷新数据初始化问题  vuex-persistedstate  采用 h5 本地缓存的原理  可以自定义为永久缓存和会话级缓存，这两种方式缓存方式可一起使用。 
 看项目需求而定  建议 会话级缓存  因为 h5 本地缓存储存方式没有对 xss 攻击有任何抵御机制，一旦出现 xss 漏洞 信息就会泄露
**[:arrow_up: 返回目录](#目录)**


