## 安装 React 应用
```js
npx create-react-app my-app
ca my-app
npm start
```
### 安装可能出现的问题
> In most cases you are behind a proxy or have bad network settings.

解决方案：
```js
// 因为是网络错误，可能是代理
npm config set proxy null

// 然后尝试执行
npm config set registry http://registry.npmjs.org/

// 如果嫌安装依赖慢的话 可以使用国内淘宝镜像
npm config set registry https://registry.npm.taobao.org
```


## render(h)
h函数指的是啥，全程是什么？
>其中 根据 Vue.js 作者 Even You 的回复，h 的含义如下：
It comes from the term "hyperscript", which is commonly used in many virtual-dom implementations. 
"Hyperscript" itself stands for "script that generates HTML structures" because HTML is the acronym for "hyper-text markup language".
它来自单词 hyperscript，这个单词通常用在 virtual-dom 的实现中。Hyperscript 本身是指
生成HTML 结构的 script 脚本，因为 HTML 是 hyper-text markup language 的缩写（超文本标记语言）

个人理解：createElement 函数是用来生成 HTML DOM 元素的，也就是上文中的 generate HTML structures，也就是 Hyperscript，这样作者才把 createElement 简写成 h。

## reactNode

## 触发render函数的方法？

## context怎么使用的

## refs

## HOC

## Hooks

## React vs Vue 数据劫持

