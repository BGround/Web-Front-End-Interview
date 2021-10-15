## Vue 面试知识点总结
可以阅读组件库源码哈 😄https://github.com/vueComponent/ant-design-vue

vue源码可以推荐两个：
https://ustbhuangyi.github.io/vue-analysis/
https://github.com/answershuto/learnVue

### 目录

### Vue基础
- [vue为什么说是一个构建用户界面的渐进式框架](#-vue为什么说是一个构建用户界面的渐进式框架)
- [vm中data调用问题](#-vm中data调用问题)
- [Vue中data为什么是一个函数而不是对象](#-Vue中data为什么是一个函数而不是对象)
- [v-if和v-show和v-html的原理](#-v-if和v-show和v-html的原理)
- [v-if和v-show的区别](#-v-if和v-show的区别)
- [v-model的原理](#-v-model的原理)
- [template的使用](#-template的使用)
- [computed的实现原理](#-computed的实现原理)
- [computed和watch区别](#-computed和watch区别)
- [介绍一下Vue的内容分发机制](#-介绍一下Vue的内容分发机制)
- [过滤器的作用，如何实现一个过滤器](#-过滤器的作用-如何实现一个过滤器)
- [修饰符](#-修饰符)
- [为什么在Vue3.0采用了Proxy，抛弃了Object.defineProperty?](#-为什么在Vue3.0采用了Proxy，抛弃了Object.defineProperty)
- [Vue的响应式系统](#-Vue的响应式系统)
- [Vue组件通信的几种方式](#-Vue组件通信的几种方式)
- [vue和react的对比](#-vue和react的对比)
- [你是如何设计一个可扩展、通用的、健壮性组件！](#-你是如何设计一个可扩展-通用的-健壮性组件)
- [assets和static的区别](#-assets和static的区别)
- [delete和Vue.delete删除数组的区别](#-delete和Vue.delete删除数组的区别)
- [Vue模版编译原理](#-Vue模版编译原理)
- [mixin 和 mixins 区别](#-mixin-和-mixins-区别)

### Vue3
- [Vue3有什么更新](#-Vue3有什么更新)

 -------------------------------------
 
### 生命周期
- [vue的生命周期和每个生命周期所做的事情](#-vue的生命周期和每个生命周期所做的事情)
- [created和mounted的区别](#-created和mounted的区别)
- [一般在哪个生命周期请求异步数据](#-一般在哪个生命周期请求异步数据)
- [keep-alive中的生命周期哪些](#-keep-alive中的生命周期哪些)

 -------------------------------------
 
### 虚拟DOM
- [vue的虚拟DOM的理解](#-vue的虚拟DOM的理解)
- [vue的diff算法](#-vue的diff算法)
- [为什么不建议用index作为key](#-为什么不建议用index作为key)
- [写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么?](#-写-React和Vue-项目时为什么要在列表组件中写-key，其作用是什么?)

 -------------------------------------

### Vuex
- [Vuex中action和mutation的区别](#-Vuex中action和mutation的区别)
- [Vuex有哪几种属性](#-Vuex有哪几种属性)
- [Vuex的严格模式是什么以及有什么作用和开启](#-Vuex的严格模式是什么以及有什么作用和开启)
- [vue2和vue3中Vuex使用区别？](#-vue2和vue3中Vuex使用区别)
- [为什么Vuex的mutation和Redux的reducer中不能做异步操作](#-为什么Vuex的mutation和Redux的reducer中不能做异步操作)
- [为什么Vuex的store中的状态是响应式的?](#-为什么Vuex的store中的状态是响应式的)
- [双向绑定和单向数据流不冲突?](#-双向绑定和单向数据流不冲突)
- [vuex中的数据在页面刷新以后消失怎么办？](#-vuex中的数据在页面刷新以后消失怎么办)

 -------------------------------------
 
### Vue-router
- [VueRouter的路由模式hash和history的实现原理](#-VueRouter的路由模式hash和history的实现原理)
- [$route 和$router 的区别](#-route和router的区别)
- [Vue-router跳转和location.href有什么区别](#-Vue-router跳转和location-href有什么区别)
- [params和query的区别](#-params和query的区别)
- [VueRouter 导航守卫有哪些](#-VueRouter-导航守卫有哪些)



 -------------------------------------


#### vue为什么说是一个构建用户界面的渐进式框架
Vue 是一套用于构建用户界面的渐进式MVVM框架。那怎么理解渐进式呢？渐进式含义：强制主张最少。
Vue.js包含了声明式渲染、组件化系统、客户端路由、大规模状态管理、构建工具、数据持久化、跨平台支持等，
但在实际开发中，并没有强制要求开发者之后某一特定功能，而是根据需求逐渐扩展。

Vue.js的核心库只关心视图渲染，且由于渐进式的特性，Vue.js便于与第三方库或既有项目整合。


**[:arrow_up: 返回目录](#目录)**

#### vm中data调用问题
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

#### Vue中data为什么是一个函数而不是对象
JavaScript中对象都是引用类型数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会变化。
而Vue中，更多是想复用组件，每个组件都有自己的数据，这样组件之间才不会相互干扰。

所以组件的数据都是以函数的形式，数据以函数的形式返回，这样每次复用组件的时候组件都会返回一个新的data，都可以维护自己的数据，不会受到影响其他的组件.

**[:arrow_up: 返回目录](#目录)**

#### v-if和v-show和v-html的原理
* v-if 会调用 addIfCondiation 方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染、
* v-show 会生成vnode，render的时候也会渲染成真实节点，只是在render的过程中会在节点的属性中修改show属性值，也就是display
* v-html 会先移除节点下所有的节点，调用html方法，通过addProp添加innerHml属性，归根结底还是设置innerHtml为v-html的值

**[:arrow_up: 返回目录](#目录)**

#### v-if和v-show的区别

v-if和v-show看起来似乎差不多，当条件不成立时，其所对应的标签元素都不可见，但是这两个选项是有区别的:
* 手段：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐；
* 编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
* 编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；
* 性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
* 使用场景：v-if适合运营条件不大可能改变；v-show适合频繁切换。

**[:arrow_up: 返回目录](#目录)**

#### v-model的原理
我们在vue项目中主要使用v-model指令在表单input、textarea和select等元素上创建双向数据绑定，v-model不过是语法糖，v-model在内部为不同的输入元素使用不同的
属性并抛出不同的事件。
**1. 作用在表单元素上**
* text和textarea元素使用value属性和input事件
* checkbox和radio使用check属性和change事件
* select字段将value做为prop并将change做为事件

**2. 作用在组件上**
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
```js
<template v-for="item in 5">
    <div v-if="item % 2 === 0" :key="item">
			测试{{item}}
		</div>
</template>
```
**[:arrow_up: 返回目录](#目录)**

#### computed的实现原理
**1. computed的初衷**
就是为了解决模板中放入太多的声明式的逻辑时会让模板过重，增加对页面的可维护性

**2. computed的使用**
定义一个计算属性有两种写法，
	- 一种是直接跟一个函数
	- 另一种是添加get和set方法的对象形式


**[:arrow_up: 返回目录](#目录)**

#### computed和watch区别
**计算属性computed:**
* 支持缓存，已有依赖数据发生改变时，才会重新进行计算
* 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
* computed属性值默认是走缓存的，也就是基于data中声明过的或者父组件传递的props中数据进行计算得到额值
* 如果computed属性属性值是函数，那么默认会走get方法，函数的返回值就是属性的属性值，

**侦听属性watch:**
* 不支持缓存，数据变化，直接会触发操作
* 支持异步
* 监听的函数接受两个参数，一个是最新的值，另一个是输入之前的值
* 监听数据必须是data中声明过的或者是父组件传递的props中的数据，数据变化触发操作，函数有两个参数

>immediate: 组件加载立即触发回调函数执行

```js
watch: {
  firstName: {
    handler(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    // 代表在wacth里声明了firstName这个方法之后立即执行handler方法
    immediate: true
  }
}
```
>deep: deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，
>任何修改obj里面任何一个属性都会触发这个监听器里的 handler
```js
watch: {
	'obj': {
		handler(newVal, oldVal) {
			consloe.log('obj.a is change')
		},
		immediate: true,
		deep: true
	}
}
```
优化我们可以使用字符串的形式进行监听
```js
watch: {
	'obj.a': {
		handler(newVal, oldVal) {
			consloe.log('obj.a is change')
		},
		immediate: true,
		//deep: true
	}
}
```

**运用场景：**
* 当需要进行数值计算,并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。
* 当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作 ( 访问一个 API )，
* 限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

**[:arrow_up: 返回目录](#目录)**

#### 介绍一下Vue的内容分发机制
slot又名插槽，是Vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。
插槽slot是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。slot又分三类，默认插槽，具名插槽和作用域插槽。

* 默认插槽：又名匿名查抄，当slot没有指定name属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。
* 具名插槽：带有具体名字的插槽，也就是带有name属性的slot，一个组件可以出现多个具名插槽。
* 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

实现原理：当子组件vm实例化时，获取到父组件传入的slot标签的内容，存放在vm.$slot中，默认插槽为vm.$slot.default，具名插槽为vm.$slot.xxx，xxx 为插槽名，
当组件执行渲染函数时候，遇到slot标签，使用$slot中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。
 
**[:arrow_up: 返回目录](#目录)**

#### 过滤器的作用,如何实现一个过滤器
根据过滤器的名称，过滤器事用来过滤数据的，在vue中使用filters来过滤数据，filters不会修改数据，而是过滤数据，改变用户看到的输出（计算属性computered，
方法methods都是通过修改数据来处理数据格式的显示）

使用场景：
* 需要格式化数据的情况，比如需要处理时间，价格等数据格式的输出/显示
* 比如后端返回一个 年月日的日期字符串，前端需要展示为 多少天前 的数据格式，此时就可以用fliters过滤器来处理数据

过滤器是一个函数，它会把表达式中的值始终当作函数的第一个参数。过滤器用在插值表达式{{}}和v-bind表达式中，然后放在操作符“ | ”后面进行指示
```js
//例如，在显示金额，给商品价格添加单位
<div>商品价格： {{price | filterPrice}}</div>

filters: {
	filterPrice(price) {
		return price ? ('￥' + price) : '--'
	}
}
```
**[:arrow_up: 返回目录](#目录)**

#### 修饰符
* 事件修饰符
* 按键修饰符
* sync修饰符
* 表单输入绑定修饰符

详细介绍，传送门《[]()》

**[:arrow_up: 返回目录](#目录)**

#### 为什么在Vue3.0采用了Proxy，抛弃了Object.defineProperty
1. Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；

>Object.defineProperty无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。 
为了解决这个问题，经过vue内部处理后可以使用以下几种方法来监听数组(push, pop, shift, unshift, splice, sort, reverse)

由于只针对了以上七种方法进行了hack处理,所以其他数组的属性也是检测不到的，还是具有一定的局限性。
```
PS：尤大说了vue针对数组数组下标动态响应不是做不到，而是因为性能不做
数组length 尽量不能去改写。

length 在规范中不允许改写，configurable = false
a.length = 100，等于增加了 100 个属性，需要对每个属性进行监听，这样一来，性能上所有问题，使用 push 或者 pop 等重写方法更加简单
```

2. Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。
3. Proxy不仅可以代理对象，还可以代理数组, 可以劫持整个对象并返回对象。还可以代理动态增加的属性。缺点Proxy是ES6语法


参考链接：《[实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.cn/post/6844903601416978439)》

**[:arrow_up: 返回目录](#目录)**


#### Vue的响应式系统
Vue称其为非侵入式响应式系统，数据模型仅仅是普通的 javascript 对象，当你修改他们时，视图会自动更新。
Vue 2.X 采用的是 Object.defineProperty 把这些属性全部转化为getter/setter
Vue 3.0 采用的是 ES6 Proxy 

**介绍下Vue 2.X**
在Vue 2.x的响应式系统中，其核心有三点，observe, watcher, dep:
* observe: 遍历data中的属性，使用 Object.defineProperty 的 get/set 方法对其进行数据劫持
* dep: 每个属性拥有自己的消息订阅器dep，用于存放所有订阅了该属性的观察者对象
* watcher: 观察者(对象)，通过dep实现对响应属性的监听，监听到结果后，主动触发自己的回调进行响应

**[:arrow_up: 返回目录](#目录)**


#### Vue组件通信的几种方式

传送门: 《[Vue组件通信的几种方式](https://github.com/BGround/Web-Front-End-Interview/blob/main/Vue/Vue组件通信的几种方式.md)》

**[:arrow_up: 返回目录](#目录)**

#### vue和react的对比
**相似之处：**
* 都是注重在核心库，将其他功能如路由和状态管理交由其他库管理
* 都有自己的构建工具，能得到一个根据最佳实践设置的项目模板
* 都使用了VM DOM提高重绘性能
* 都使用了props的概念，允许组件间的数据传递
* 都鼓励组件化应用，将应用拆分为一个个功能明确的模块，提高复用性

**不同处：**
(1)数据流
Vue默认支持数据双向绑定，React一直提倡单项数据流

(2)虚拟DOM
* Vue称可以更快的计算出vDOM的差异，这是由于在渲染过程中，会跟踪每个组件的依赖关系，不需要重新渲染整个组件树
* 对于React而言，每当应用的状态改变，全部子组件都会重新渲染。不过这个可以通过PureComponent或者shouldComponentUpdate生命周期来控制，但Vue是默认的优化

(3)组件化
React和Vue最大的不同是模板的编写
* Vue写近似常规的HTML模板，写起来很接近标准HTML的元素，只是加了一些属性
* React推荐所有的模板通用Javascript语法扩展——JSX

具体来说：React中render函数是支持闭包特性的，所以import的组件在render中是可以直接引用的。但是在Vue中，由于模板中使用的数据必须挂在this上进行一次中转，所以
import一个组件完了之后，还需要在components中再声明下

(4)监听数据变化的实现原理不同
* Vue是通过getter/setter以及一些函数的劫持，能精确知道数据的变化，不需要特别的优化就能达到很好的性能
* React中是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能会导致大量不必要的vDom重新渲染。

>Vue使用的是可变数据，而React更加强调的是不可变数据（immutable）

(5)高阶组件
React可以通过高阶组件（HOC）扩展，而Vue需要通过mixins来扩展

高阶组件就是高阶函数，而React的组件本身就是纯粹的函数，所以高阶组件对React很简单。而Vue是通过HRML模板来实现的视图组件，无法有效的编译，不能使用HOC

(6)构建工具
* Vue => Vue cli
* React => create-react-app

(7)跨平台
* Vue => weex
* React => React Native

参考链接：《[关于Vue和React的一些对比及个人思考（上）](https://juejin.cn/post/6844904040564785159#heading-25)》
**[:arrow_up: 返回目录](#目录)**

#### assets和static的区别
**相同点:**
assets和static两个都是存放静态资源文件，项目中需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件夹下

**不相同点:**
不相同点：assets 中存放的静态资源文件在项目打包时，也就是运行 npm run build 时会将 assets 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，
代码格式化。而压缩后的静态资源文件最终也都会放置在 static 文件中跟着 index.html 一同上传至服务器。
static 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，
但是 static 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 assets 中打包后的文件提交较大点。在服务器中就会占据更大的空间。

**建议:**
将项目中 template需要的样式文件js文件等都可以放置在 assets 中，走打包这一流程。减少体积。
而项目中引入的第三方的资源文件如iconfoont.css 等文件可以放置在 static 中，因为这些引入的第三方文件已经经过处理，不再需要处理，直接上传。

**[:arrow_up: 返回目录](#目录)**

#### delete和Vue.delete删除数组的区别
* delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
* Vue.delete 直接删除了数组 改变了数组的键值。
```js
var a=[1,2,3,4]  
var b=[1,2,3,4]  
delete a[1]
    console.log(a)    
this.$delete(b,1)
    console.log(b)
```
打印结果是：
(4)[1,empty,3,4]
(3)[1,3,4]

**[:arrow_up: 返回目录](#目录)**

#### Vue模版编译原理
Vue中的模板template无法被浏览器解析并渲染，因为不属于浏览器的标准，也不是正确的HTML语法，所以需要将template转化为一个JavaScript函数，这样浏览器才可以执行
这一个函数并渲染出对应的HTML元素。这一个转化过程，就成为模板编译。模板编译分为三个阶段，解析parse、优化optimize，生成generate，最终生成可执行函数render

* 解析阶段：使用大量正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST
* 优化阶段：遍历AST，找到其中一些静态节点并进行标记，方便再页面重渲染的时候进行diff比较时，直接跳过一些静态节点，优化runtime的性能
* 生成阶段：将最终的AST转化为render函数字符串

**[:arrow_up: 返回目录](#目录)**

#### mixin 和 mixins 区别
mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的
```js
Vue.mixin({
	beforeCreate() {
		// ...逻辑        // 这种方式会影响到每个组件的 beforeCreate 钩子函数    
	}
})
```
虽然文档不建议在应用中直接使用 mixin，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 ajax 或者一些工具函数等等。
mixins 应该是最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。
另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。

**[:arrow_up: 返回目录](#目录)**

-----------------------------------

#### Vue3有什么更新



**[:arrow_up: 返回目录](#目录)**






-----------------------------------

#### vue的生命周期和每个生命周期所做的事情
vue的生命周期分为四个阶段
1：实例创建
2：DOM渲染
3：数据更新
4：实例销毁
共有八个基本钩子函数
|		生命周期  |   描述   |
|    -       |     -    |
| beforeCreat | 在new一个vue实例之后，data和methods都还没有初始化，不能使用|
|  created    | data和methods都初始化好了，$el还没有，此阶段可以做的：解决loading，请求ajax数据为mounted渲染做准备|
| beforeMount | vue的$el和data都初始化了，但是还是虚拟的dom节点，具体的data.filter还没替换|
|  mounted    | 已挂载vue实例已经初始化完成了，data.filter成功渲染，配合路由钩子使用|
| beforeUpdate | data更新时触发|
|  updated     | 组件数据更新之后|
| beforeDestory | 实例销毁之前，实例仍可使用|
|  destroyed    | 组件销毁后调用 |
 
![vue-lifecycle](https://github.com/BGround/Web-Front-End-Interview/blob/main/Vue/images/vue-lifecycle.jpg)

**[:arrow_up: 返回目录](#目录)**

#### created和mounted的区别
* create: 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
* mounted: 再模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作

**[:arrow_up: 返回目录](#目录)**

#### 一般在哪个生命周期请求异步数据
我们可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
​
推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

* 能更快获取到服务端数据，减少页面加载时间，用户体验更好；
* SSR不支持 beforeMount 、mounted 钩子函数，放在 created 中有助于一致性。

**[:arrow_up: 返回目录](#目录)**

#### keep-alive中的生命周期哪些
keep-alive是 Vue 提供的一个内置组件，用来对组件进行缓存——在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

如果为一个组件包裹了 keep-alive，那么它会多出两个生命周期：deactivated、activated。同时，beforeDestroy 和 destroyed 就不会再被触发了，
因为组件不会被真正销毁。

当组件被换掉时，会被缓存到内存中、触发 deactivated 生命周期；当组件被切回来时，再去缓存里找这个组件、触发 activated钩子函数。

**[:arrow_up: 返回目录](#目录)**

-----------------------------------

#### vue的虚拟DOM的理解
可以从下面三个方面来理解vDOM
**1.vDOM是什么:**
从本质上来说，virtual Dom是一个JavaScript对象，通过对象的形式来表示DOM结构。将页面状态抽象为JS对象的形式，使用不同的渲染工具，使跨平台成为可能

**2.设计的目的:**
虚拟DOM是对DOM的抽象，这个对象是更加轻量级的对 DOM的描述。它设计的最初目的，就是更好的跨平台，比如Node.js就没有DOM，如果想实现SSR，那么一个方式就是借助虚拟DOM，
因为虚拟DOM本身是js对象。 在代码渲染到页面之前，vue会把代码转换成一个对象（虚拟 DOM）。以对象的形式来描述真实DOM结构，最终渲染到页面

**3.怎么使用vDom:**
在每次数据发生变化前，虚拟DOM都会缓存一份，变化之时，现在的虚拟DOM会与缓存的虚拟DOM进行比较。在vue内部封装了diff算法，通过这个算法来进行比较，渲染时修改改变的变化，
原先没有发生改变的通过原先的数据进行渲染

**[:arrow_up: 返回目录](#目录)**

#### vue的diff算法
在新老虚拟DOM对比时：

* 首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换
* 如果为相同节点，进行patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)
* 比较如果都有子节点，则进行updateChildren，判断如何对这些新老节点的子节点进行操作（diff核心）。
* 匹配时，找到相同的子节点，递归比较子节点

在diff中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从O(n3)降低值O(n)，也就是说，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。

**[:arrow_up: 返回目录](#目录)**

#### 为什么不建议用index作为key
使用index 作为 key和没写基本上没区别，因为不管数组的顺序怎么颠倒，index 都是 0, 1, 2...这样排列

而且当选项中带有状态的时候，选项的改变会导致状态的紊乱

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

-----------------------------------------------------------------------------

#### Vuex中action和mutation的区别
查看如下实列代码
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

```
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，
或者通过 context.state 和 context.getters 来获取 state 和 getters。
所以，两者的不同点如下：

* Mutation专注于修改State，理论上是修改State的唯一途径；Action业务代码、异步请求。
* Mutation：必须同步执行；Action：可以异步，但不能直接操作State。
* 在视图更新时，先触发actions，actions再触发mutation
* mutation的参数是state，它包含store中的数据；store的参数是context，它是 state 的父级，包含 state、getters

**[:arrow_up: 返回目录](#目录)**

#### Vuex有哪几种属性
有五种，分别是 State、 Getter、Mutation 、Action、 Module

* state => 基本数据(数据源存放地)
* getters => 从基本数据派生出来的数据
* mutations => 提交更改数据的方法，同步
* actions => 像一个装饰器，包裹mutations，使之可以异步。
* modules => 模块化Vuex

**[:arrow_up: 返回目录](#目录)**

#### Vuex的严格模式是什么以及有什么作用和开启
在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

在Vuex.Store 构造器选项中开启,如下
```js
const store = new Vuex.Store({
    strict:true,
})

```

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


-----------------------------------------------------------------------------

#### VueRouter的路由模式hash和history的实现原理
Vue-Router有两种路由模式：*hash模式*和*history模式*，默认是hash模式。
1. hash 模式的实现原理

早期的前端路由的实现事基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容，比如下面这个网站，它的 location.hash 的值就是 #search
**https://www.baidu.com#search**

hash 路由模式的实现主要是基于以下几个特性：

 - URL中 hash 值只是客户端的一种状态，也就是说当向服务器发出请求时，hash部分不会被发送
 - hash 值的改变，都会在浏览器的访问历史中留下记录，因此我们通过浏览器的回退、前进按钮控制 hash 的切换
 - 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变，或者使用 JavaScript 来对 location.hash 进行赋值，改变URL的hash值
 - 我们可以使用 onhashchange 事件来监听 hash 值的变化， 从而对页面进行跳转
```js
window.onhashchange = function(event) {
	console.log(event.oldURL, event.newURL);
	let hash = location.hash.slice(1);
}
```
2. history模式的实现原理

HTML5提供了History API来实现 URL 的变化，其中最主要的API有以下两个：history.pushState() 和 history.replaceState().
这两个API可以在不进行刷新的情况下，操作浏览器的历史记录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：
```
window.history.pushState(null, null, path)
window.history.replaceState(null, null, path)
```

history 路由模式实现主要是基于以下几个特性：

- pushState 和 replaceState 两个API来操作实现 URL 的变化
- 我们可以使用 popstate 事件来监听 URL的变化，从而对页面进行跳转
- history.pushState() 和 history.replaceState() 不会触发 popstate 事件，这是需要我们手动出发页面更新

3. 简单实现 Vue Router

Vue Router 核心是，通过 Vue.use 注册插件，在插件的 install 方法中获取用户配置的 router 对象，当浏览器地址发生变化的时候，
根据 router 对象匹配相应路由，获取组件，并将组件渲染到视图上

**(1) 如何在 install 方法中获取 Vue 实例上的 router 属性**

可以利用 Vue.mixin 混入声明周期函数 beforeCreate，在beforeCreate 函数中可以获取到Vue实例上的属性并赋值到Vue原型链上
```
_Vue.mixin({
	beforeCreate() {
		if (this.$options.router) {
			_Vue.protoType.$router = this.$options.router
		}
	}
})
```

**(2) 如何触发更新**

hash 模式下：

* 通过 history.pushState() 修改浏览器地址，触发更新
* 通过监听 onhashchange 事件来监听浏览器前进或者后退，触发更新

history模式下：

* 通过 location.hash 修改 hash 值，触发更新
* 通过监听 popstate 事件来监听浏览器前进或者后退，触发更新
* 渲染 router-view 组件

**[:arrow_up: 返回目录](#目录)**

#### route和router的区别
* $route 是 "路由信息对象", 包括 path，params，hash，query，fullPath，matched，name 等路由信息参数
* $router 是 "路由实例" 对象，包括了路由的跳转方法，钩子函数等

**[:arrow_up: 返回目录](#目录)**

#### Vue-router跳转和location.href有什么区别
* 使用 location.href= /url 来跳转，简单方便，但是刷新了页面；
* 使用 history.pushState( /url ) ，无刷新页面，静态跳转；
* 引进 router ，然后使用 router.push( /url ) 来跳转，使用了 diff 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 history.pushState() 没什么差别的，
* 因为vue-router就是用了 history.pushState() ，尤其是在history模式下。

**[:arrow_up: 返回目录](#目录)**

#### params和query的区别
**用法：** query要用path来引入，params要用name来引入，接受参数都是类似的，分别是 this.$route.query.name 和 this.$route.params.name
**url地址显示：** query更加类似与ajax中get传参，params则类似与post，说的简单点就是query在浏览器接口中不显示参数，parmas显示

注意：query刷新不会丢失query里面的数据，params刷新会丢失params里面的数据

**[:arrow_up: 返回目录](#目录)**

#### VueRouter 导航守卫有哪些
vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的，单个路由独享的或者组件级的

* 全局前置守卫: router.beforeEach
* 全局解析守卫: router.beforeResolve, 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
* 全局后置钩子: router.afterEach
* 路由独享守卫: 可以直接在路由配置上直接定义beforeEnter守卫，和全局前置守卫方法参数是一样的
* 组件内的守卫: beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave
```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```	

**完整的导航解析流程:** 
* 1.导航被触发
* 2.在失活得组件里调用 beforeRouteLeave 守卫
* 3.调用全局得 beforeEach 守卫
* 4.在重用得组件里调用 beforeRouteUpdate 守卫
* 5.在路由配置里面调用 beforeEnter
* 6.解析异步路由组件
* 7.在被激活得组件里调用 beforeRouterEnter
* 8.调用全局得 beforeResolve
* 9.导航被确认
* 10.调用全局得 afterEach 钩子
* 11.触发DOM更新
* 12.调用 beforeRouteEnter 守卫中传递给next得回调函数，创建好得组件实例会做为回调函数得参数传入

**[:arrow_up: 返回目录](#目录)**













