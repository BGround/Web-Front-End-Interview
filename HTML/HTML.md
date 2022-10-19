## HTML 面试知识点总结

本部分主要是笔者在复习 HTML 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [html中元素和标签](#-html中元素和标签)
- [src和href的区别](#-src和href的区别)
- [介绍一下语义标签](#-介绍一下语义标签)
- [行内元素和块级元素](#-行内元素和块级元素)
- [浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢](#-浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢)
- [attribute和property的区别是什么](#-attribute和property的区别是什么)
- [减少dom数量的方法和一次性给大量的dom怎么优化](#-减少dom数量的方法和一次性给大量的dom怎么优化)
- [DOCTYPE 的作用是什么？](#-DOCTYPE-的作用是什么)
- [关于DOCTYPE html和meta](#-关于DOCTYPE-html和meta)


--------------------

#### html中元素和标签
HTML 元素指的是从开始标签（start tag）到结束标签（end tag）的所有代码。
```
<p>这是元素内容</p>
注： 
<p> 开始标签 </p>结束标签 ，‘这是元素内容’ => 元素内容， 没有的话就是空元素
```
常见标签：<a> <br> <button> <div> <font> <form> <h1> - <h6> <link> <map> <ul> <ol> - <li> <p> <span> <strong>

**[:arrow_up: 返回目录](#目录)**

#### src和href的区别
src和href都是用来引用外部资源的，它们的区别是

* src: 表示对资源的的引用，它指向的内容会加载到当前标签所在的位置。当浏览器解析该元素时，会暂停其他资源的下载和处理，直到该元素处理完
* href: 表示超文本引用，网络资源和该元素建立链接的关系。可以并行下载资源，不会停止对文档的处理，常用再a、link标签上

**[:arrow_up: 返回目录](#目录)**

##### 介绍一下语义标签
**什么是语义标签？**
语义的意义，也就是说元素本身传达了关于标签所包含内容类型的一些信息，根据元素的内容选择合适的标签
**为什么要语义**
1. **代码结构**: 使页面没有css的情况下，也能够呈现出很好的内容结构
2. **有利于SEO**: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
3. **提升用户体验**： 例如title、alt可以用于解释名称或者解释图片信息，以及label标签的灵活运用。
4. **便于团队开发和维护**: 语义化使得代码更具有可读性，让其他开发人员更加理解你的html结构，减少差异化。
5. **方便其他设备解析**: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

结构体|文本|一致
--|:--:|--:
header |    |		a
h1     | p     |	 stong
h2     | ul     |		em
h3     |	ol     |	q
nav     | li     |	abbr
footer     | blockquote     |	small
article     |     |
section     | |

**[:arrow_up: 返回目录](#目录)**

#### 行内元素和块级元素
*块级元素*: 结构性标记
1. 都是从新的一行开始
2. 高度，宽度可控，宽度没有设置时，默认时100%
3. 块级元素可以包含块级元素和行内元素
4. 有align属性
5. display为block

例如：div, p, h1-h6, header, footer, nav, aside, main(好像语义化标签都是块级元素?)

*行内元素*: 描述性标记
1. 可以和其他元素在一行
2. 宽高都是内容的宽高，以及内边距都是不可控
3. 行内元素内只能有行内元素
4. 没有align属性
5. display为inline

例如：span, a, input, img, b, strong

**[:arrow_up: 返回目录](#目录)**

#### 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢
 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app ，那么浏览器
 就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器
 就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做
 任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

 离线的情况下，浏览器就直接使用离线存储的资源。

**[:arrow_up: 返回目录](#目录)**

#### attribute和property的区别是什么
 attribute 是 dom 元素在文档中作为 html 标签拥有的属性；
 property 就是 dom 元素在 js 中作为对象拥有的属性。
 对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的，
 但是对于自定义的属性来说，他们是不同步的。

**[:arrow_up: 返回目录](#目录)**

#### 减少dom数量的方法和一次性给大量的dom怎么优化
**1.减少dom数量的方法**
* 使用伪元素，阴影实现的内容尽量不使用dom实现，如清楚浮动、样式实现等
* 按需加载，减少不必要的渲染，如分页和滑动
* 使用语义化标签

**2.大量的dom优化**
当对Dom元素进行一系列操作时，对Dom进行访问和修改Dom引起的重绘和回流都比较消耗性能，所以关于操作Dom，可以从以下考虑
* 1.缓存dom对象:可以再循环之前就主节点，不必循环的Dom节点先获取到，那么在循环里就可以直接引用，而不必去重新查询
```js
let rootElem = document.querySelector('#app');
let childList = rootElem.child; // 假设全是dom节点
for(let i = 0;i<childList.len;j++){
    /**
    * 根据条件对应操作
    */
}
```
* 2.虚拟dom: virtual DOM是一个纯js对象，所以对它操作会高效。在dom发生变化的时候先对虚拟dom进行操作，通过dom diff算法将虚拟dom和原虚拟dom的结构做对比
* 最终批量的去修改真实的dom结构，尽可能的避免频繁的修改dom导致频繁的重绘和回流

* 3.文档片段: 利用document.createDocumentFragment()方法创建文档碎片节点，创建的是一个虚拟的节点对象，向这个节点添加dom节点，并不会影响真实的dom结构
```js
let fragment = document.createDocumentFragment();
const operationDomHandle = (fragment) =>{
    // 操作 
}
operationDomHandle(fragment);
// 然后最后再替换  
rootElem.replaceChild(fragment,oldDom);
```
* 4.用innerHtml代替高频的appendChild
* 5.最优的layout方案

**[:arrow_up: 返回目录](#目录)**

#### DOCTYPE 的作用是什么
   
   相关知识点：
   ```
   IE5.5 引入了文档模式的概念，而这个概念是通过使用文档类型（DOCTYPE）切换实现的。

   <!DOCTYPE>声明位于 HTML 文档中的第一行，处于 <html> 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。

   DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。
   ```

   回答（参考1-5）：
   ```
   <!DOCTYPE>  声明一般位于文档的第一行，它的作用主要是告诉浏览器以什么样的模式来解析文档。一般指定了之后会以标准模式来
   进行文档解析，否则就以兼容模式进行解析。在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的。而在兼容模式下，浏
   览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。

   在 html5 之后不再需要指定 DTD 文档，因为 html5 以前的 html 文档都是基于 SGML 的，所以需要通过指定 DTD 来定义文
   档中允许的属性以及一些规则。而 html5 不再基于 SGML 了，所以不再需要使用 DTD。
   ```
   
**[:arrow_up: 返回目录](#目录)**
	 
	 
#### 关于DOCTYPE html和meta 
   
  <!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
  <head lang=”en”> 标准的 lang 属性写法
  <meta charset=’utf-8′>    声明文档使用的字符编码
  <meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
  <meta name=”description” content=”不超过150个字符”/>       页面描述
  <meta name=”keywords” content=””/>      页面关键词
  <meta name=”author” content=”name, email@gmail.com”/>    网页作者
  <meta name=”robots” content=”index,follow”/>      搜索引擎抓取
  <meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport
  <meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
  <meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）
  是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
  <meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
  添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
  <meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
  <meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色
  <meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)
  <meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式
  <meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码
  <meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
  <meta name=”MobileOptimized” content=”320″>   微软的老式浏览器
  <meta name=”screen-orientation” content=”portrait”>   uc强制竖屏
  <meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏
  <meta name=”full-screen” content=”yes”>              UC强制全屏
  <meta name=”x5-fullscreen” content=”true”>       QQ强制全屏
  <meta name=”browsermode” content=”application”>   UC应用模式
  <meta name=”x5-page-mode” content=”app”>    QQ应用模式
  <meta name=”msapplication-tap-highlight” content=”no”>    windows phone 点击无高光
  设置页面不缓存
  <meta http-equiv=”pragma” content=”no-cache”>
  <meta http-equiv=”cache-control” content=”no-cache”>
  <meta http-equiv=”expires” content=”0″>
   
详细资料可以参考：[《关于<!doctype html>和meta》](https://www.jianshu.com/p/2acf929ac280?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

**[:arrow_up: 返回目录](#目录)**













