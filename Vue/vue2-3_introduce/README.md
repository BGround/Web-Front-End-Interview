## 引言
本文作为vue.js学习笔记,基于vue2.5X版本介绍，同时也会介绍vue3.X及以上的版本的知识点

### 介绍及安装
Vue  是一套用于构建用户界面的渐进式框架，
官网：cn.vuejs.org

#### vue思维导图
![学习vue思维导图](https://github.com/BGround/Web-Front-End-Interview/blob/main/Vue/images/vue.png)

#### vue源码架构图
![vue源码架构图](https://github.com/BGround/Web-Front-End-Interview/blob/main/Vue/images/vue-source-code.png)

### vue2.x 主要知识点
1. class style动态绑定
2. 动态组件
3. keepAlive
4. v-model .sync
5. 强制刷新 this.$forceUpdate
6. 插槽 solt slot-scope
7. 混入 mixin 
合并策略
a: data 冲突时，以组件主题为优先
b: 生命周期钩子会先后执行，先mixin后主体
c: 有相同对象合并时，递归合并优先级仍以主体优先
8. 继承拓展 extends 整体拓展 extend
合并策略 - 与mixin相同
a: data 冲突时，以组件主题为优先
b: 生命周期钩子会先后执行，先mixin后主体 
9. 指令 directive
10. 过滤器 filters // 面试题: 在过滤器中this不指向实例，只是一个纯函数
11. 插件 plugins

### 性能
- FP FCP - FMP
- performance.timing
- getEntires -Observer

### webpack
- 按需加载 - code splitting
    - webpackJsonpCallback
		- promise.all
		
- * treesharking
		- babel-plugin-import 插件
		- sideEffects

- 包体积
	- 分包
		-  cachegroup


### npm
- deps: 
	- 

### css 动画 JS 动画
### 重绘重排
- 复合
	- 典型的：transform willChange 

### axios
- interceptor 原理
- XHR 的封装
- fetch 规范

### elementUI、antd
- 实现响应式布局
	- 媒体查询

### postcss
- css
- sass / less
	- 解析 








