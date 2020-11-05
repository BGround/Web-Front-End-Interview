## Vue 面试知识点总结

### 目录

* [1. vm.data调用问题？](#1-vmdata调用问题)
* [2. v-if和v-show的区别](#2-v-if和v-show的区别)
* [3. template的使用](#3-template的使用)
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*




#### 1. vm.data调用问题？
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
```
vue中定义的data在执行new Vue（）创建时候变为vue对象实例的属性，并给属性添加get和set方法，get和set操作的是原data对象
相关知识点：
官网中说，当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中

```

#### 2. v-if和v-show的区别
```java
v-if和v-show看起来似乎差不多，当条件不成立时，其所对应的标签元素都不可见，但是这两个选项是有区别的:
1.v-if在条件切换时，会对标签进行适当的创建和销毁，而v-show则仅在初始化时加载一次，因此v-if的开销相对来说会比v-show大。
2.v-if是惰性的，只有当条件为真时才会真正渲染标签；如果初始条件不为真，则v-if不会去渲染标签。v-show则无论初始条件是否成立，都会渲染标签，
它仅仅做的只是简单的CSS切换，改变的是display属性,block显示,none不显示
```

#### 3. template的使用
在.vue文件中,template标签是用来写html模块的，且内部必须只有一个根元素，不然会报错
```javascript
<template>
    <div class="demo">
        .....
    </div>
</template>
```

<font color=red>template标签中不能使用v-show

有时候,不需要这外层的 div ，可以采用下面 的方法，在 <template>标签上使用 v-for来循环
```javascript
<template>
    <div class="root">
        <div v-for="item,index in 5" :key="index">测试{{index}}</div>
    </div>
</template>
```







