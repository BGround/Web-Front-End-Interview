## 引言
本文作为vue.js学习笔记,基于vue2.5X版本介绍，同时也会介绍vue3.X及以上的版本的知识点

### 介绍及安装
Vue  是一套用于构建用户界面的渐进式框架，

![学习vue思维导图](https://github.com/BGround/Web-Front-End-Interview/blob/main/Vue/images/vue.png)

### 挂载点，模板，实例之间的关系
```js
<body>
	<div id="root"> 
		{{message}}
		<!-- <h1>hello</h1> -->
	</div>
	<script>

		new Vue({
			el: '#root',  //挂载点
			template: '<h1>hello</h1>',  // 这个就是模板写在实例中，也可以写在挂载点中
			data: {
				message: 'hello world'
			}
		})
	</script>
</body>
```

### 
