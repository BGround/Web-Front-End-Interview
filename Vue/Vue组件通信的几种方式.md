## 引言
vue是数据驱动视图更新的框架，所以对于vue组件来说组件之间的通信非常重要。和react一样，vue组件之间存在的关系是一样的

- 父子组件之间的通信
- 非父子组件之间的通信（兄弟组件和非嵌套关系组件）

下面结合实例介绍下8种vue组件之间的通信方式，以及适用与不同的场景


### 1. props/$emit
父组件通过props方式向子组件传递数据，而通过$emit子组件向父组件通信
```js
<!-- child.vue -->
<template>
		<button @click="changeMsg">按钮</button>
    <div>{{msg}}</div>
</template>
<script>
export default {
    props: {
        msg: {
            type: String,
            default: 'child message' // 当default为引用类型时，需要使用 function 形式返回
        }
    },
		computed: {
				newMsg: function() {
						return "newMsg from child"
				}
		},
		methods: {
				changeMsg: function() {
						this.$emit('updateMsg', this.newMsg)
				}
		}
}
</script>
```
父组件向该组件传递数据：
```js
<!-- parent.vue -->
<template>
    <child :msg="parentMsg" @updateMsg="changeParentMsg"></child>
</template>
<script>
import child from './child';
export default {
    components: {
        child
    },
    data () {
        return {
            parentMsg: 'parent message'
        }
    },
		methods: {
				changeParentMsg: function(newMsg) {
						this.parentMsg = newMsg
				}
		},
}
</script>
```

### 2. EventBus事件总线
Vue内部实现了一个事件总线系统，即EventBus。在Vue中可以使用 EventBus 来作为沟通桥梁的概念，每一个Vue的组件实例都继承了 EventBus，都可以接受事件$on和发送事件$emit。
如上面一个例子，child.vue 组件想修改 parent.vue 组件的 parentMsg 数据，怎么办呢？为了保证数据流的可追溯性，直接修改组件内 prop 的 msg 字段是不提倡的，且例子中为非引用类型 String，
直接修改也修改不了，这个时候需要将修改 parentMsg 的事件传递给 child.vue，让 child.vue 来触发修改 parentMsg 的事件。如：

1.初始化，首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它.
```js
<!-- event-bus.js -->
import Vue from 'vue'
export const EventBus = new Vue()
```

2.发送事件，假设你有两个组件: additionNum 和 showNum, 这两个组件可以是兄弟组件也可以是父子组件；这里我们以兄弟组件为例:
```js
<!-- App.vue -->
<template>
  <div>
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
  </div>
</template>

<script>
import showNumCom from './showNum.vue'
import additionNumCom from './additionNum.vue'
export default {
  components: { showNumCom, additionNumCom }
}
</script>

<!-- addtionNum.vue 中发送事件-->
<template>
  <div>
    <button @click="additionHandle">+加法器</button>    
  </div>
</template>

<script>
import {EventBus} from './event-bus.js'
console.log(EventBus)
export default {
  data(){
    return{
      num:1
    }
  },

  methods:{
    additionHandle(){
      EventBus.$emit('addition', {
        num:this.num++
      })
    }
  }
}
</script>
```

3.接收事件
```js
<!-- showNum.vue 中接收事件-->
<template>
  <div>计算和: {{count}}</div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      count: 0
    }
  },

  mounted() {
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>
```

#### 3. Vuex

#### 4. LocalMessage和SessionMessage
这种通信比较简单，缺点是数据和状态比较混乱，不太容易维护。
```js
window.localStorage.setItem(key, value) // 存数据
window.localStroage.getItem(key) // 取数据
```

#### 5. provide和inject
provide/inject 是vue2.2.0新增的api,简单来说就是父组件中通过provide来提供变量，然后在子组件中通过inject注入变量。
不论子组件嵌套的有多深，只要调用了inject那么就可以注入provide中的数据，不局限与只能从当前父组件的props属性中回去数据

举例验证
接下来就用一个例子来验证上面的描述: 假设有三个组件: A.vue -> B.vue -> C.vue 其中 C是B的子组件，B是A的子组件
```js
//A.vue
<template>
  <div>
      <com-B></com-B>
  </div>
</template>

<script>
import comB from './B.vue'
export default {
    name: 'A',
    components: {
      comB,
    },
    provide: {
      for: 'A.vue'
    }
}
</script>

//B.vue
<template>
  <div>
      {{BMsg}}
      <com-C></com-C>
  </div>
</template>

<script>
import comC from './C.vue'
export default {
    name: 'B',
    components: {
        comC
    },
    inject: ['for'],
    data() {
        return {
            BMsg: this.for
        }
    }
}
</script>

//C.vue
<template>
  <div>
      {{demo}}
  </div>
</template>

<script>
export default {
    name: 'C',
    inject: ['for'],
    data() {
        return {
            demo: this.for
        }
    }
}
</script>


//得出的结果就是
A.vue
A.vue
```

#### 6. ref
ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据， 我们看一个ref 来访问组件的例子:
```js
//RefA.vue
<template>
  <refB ref="comB"></refB>
</template>

<script>
import refB from './RefB.vue'
export default {
    name: 'refA',
    components: {
        refB
    },
    mounted() {
        console.log(this.$refs.comB.name);
        this.$refs.comB.sayHi();
    }
}
</script>

// RefB.vue
<template>
    <div></div>
</template>
<script>
export default {
    data() {
        return {
            name: 'vue.js'
        }
    },
    methods: {
        sayHi() {
            console.log(this.name)
        }
    }
}
</script>
```

### 总结
常见使用场景可以分为三类:

* 父子组件通信: props; $parent / $children; provide/inject ; ref ; $attrs / $listeners
* 兄弟组件通信: eventBus ; vuex
* 跨级通信: eventBus；Vuex；provide/inject 、$attrs / $listeners





