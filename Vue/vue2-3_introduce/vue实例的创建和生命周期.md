## 挂载点，模板，实例之间的关系
使用vue-cli脚手架开发vue应用的时候，一定在src/main.js里见过这样的代码,但是在vue2和vue3中发生了变化
```js
new Vue({
  render: h => h(App)
}).$mount('#app')
```

#### vue2
```js
<body>
	<div id="root"> 
		{{message}}
		<!-- <h1>hello</h1> -->
	</div>
	<script>
		/*******vue2*******/
		new Vue({				// 实例
			el: '#root',  //挂载点
			template: '<h1>hello</h1>',  // 这个就是模板写在实例中，也可以写在挂载点中
			data: {
				message: 'hello world'
			}
		})
		
		/*******vue3*******/
		const RootComponent = {               // 创建根组件
			data() {
				return {count: 1}
			}
		}
		const app = Vue.createApp(RootComponent);   // 创建一个应用app
		const vm = app.$mount("root")               // 将应用app挂载到root节点上，并返回实例vm
	</script>
</body>
```

### new Vue({}) 和 createApp的区别
从vue3之后，一切都是从createApp方法的执行开始，vue3为什么会变成这样，createApp有什么好处吗？

在vue2.X版本中，创建根Vue实例是通过new Vue(), 从同一Vue构造函数创建的每个根实例都共享相同的全局配置。
这会导致全局污染

```js
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)  // 全局配置Vuex
Vue.component(/* ... */)   // 组件会导致所有根实例都会配置
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.directive(/* ... */)

new Vue({
	render: (h) => h(App)
}).$mount('#app')
```

在vue3.X版本中，
createApp返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。
该上下文提供了先前在Vue 2.x中“全局”的配置。该实例不会被应用于其他实例的任何全局配置所污染。
共享实例属性应附加到应用程序实例的config.globalProperties
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)
app.provide(/* ... */)

app.config.globalProperties.customProperty = () => {}

app.mount(App, '#app')
```

### Vue生命周期钩子函数
先上两者之前函数的对比，主要生命周期钩子函数是前面8个
```js
Vue2--------------vue3
beforeCreate  -> setup()                    
created       -> setup()                    
beforeMount   -> onBeforeMount              
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
errorCaptured -> onErrorCaptured
```

 - beforeCreate 是 new Vue()之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。

 - created 在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。

可以做一些初始数据的获取，在当前阶段无法与 Dom 进行交互，如果非要想，可以通过 vm.$nextTick 来访问 Dom。

 - beforeMount 发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 Dom 已经创建完成，即将开始渲染。

在此时也可以对数据进行更改，不会触发 updated。

 - mounted 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点，使用$refs 属性对 Dom 进行操作。

 - beforeUpdate 发生在更新之前，也就是响应式数据发生更新，虚拟 dom 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

 - updated 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

 - beforeDestroy 发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

 - destroyed 发生在实例销毁之后，这个时候只剩下了 dom 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。


