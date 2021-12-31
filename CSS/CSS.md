## CSS 面试知识点总结

本部分主要是笔者在复习 CSS 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [1.请简述下CSS选择器的权重与优先规则](#1-请简述下CSS选择器的权重与优先规则)
- [2.对盒模型的理解](#2-对盒模型的理解)
- [3.BFC](#3-BFC)
- [4.使用link和@import导入页面样式有啥区别](#4-使用link和@import导入页面样式有啥区别)
- [5.分析比较 opacity: 0 visibility: hidden display: none 优劣和适用场景](#5-分析比较-opacity:-0-visibility:-hidden-display:-none-优劣和适用场景)
- [6.如何水平居中一个元素](#6-如何水平居中一个元素)
- [7.em/rem/px/vw/vh单位](#7-em-rem-px-vw-vh单位区别)
- [8.单行和多行文本溢出的省略的样式](#8-单行和多行文本溢出的省略的样式)
- [9.CSS的三大预处器和区别](#9-CSS的三大预处器和区别)
-


### 1. 请简述下CSS选择器的权重与优先规则
选择器是CSS样式规则中重要的组成部分，可以将选择器看作是CSS样式和HTML元素之间的匹配模式，与选择器关联的样式规则会应用与选择器所指定的HTML元素上
!important > 行内样式 > ID选择器 > 类选择器 > 元素选择器 > 通配符选择器 > 继承 > 浏览器默认属性。

* !important 优先级是最高的
* 内联样式（1000）
* ID选择器（0100）
* 类选择器/属性选择器/伪类选择器（0010）
* 元素选择器/伪元素选择器（0001）
* 关系选择器/通配符选择器（0000）

**[:arrow_up: 返回目录](#目录)**

### 2. 对盒模型的理解
CSS3中有两种盒模型：标准盒子模型，IE盒子模型

盒模型都是有四部分组成：margin、border、padding和content
两种盒模型的区别在于设置width和height时，划分的范围不同

标准盒子模型： width和height => content的width和height
IE盒子模型： width和height => 包含了border、padding和content

**[:arrow_up: 返回目录](#目录)**

### 3. BFC
block formatting context 块级格式化上下文



**[:arrow_up: 返回目录](#目录)**

### 4. 使用link和@import导入页面样式有啥区别
link属于html标签，@import是属于CSS提供的，link方式的样式权重高于@import

页面被加载时，link会同时被加载，而@import引用的css会等到页面加载完再加载；

@import只有再IE5以上才能识别，而linl时XHTML标签，无兼容问题

**[:arrow_up: 返回目录](#目录)**

### 5. 分析比较 opacity: 0 visibility: hidden display: none 优劣和适用场景
**结构：**
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

**继承：**
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

**性能：**
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ：修改元素会造成重绘，性能消耗较少

**联系：**它们都能让元素不可见

**[:arrow_up: 返回目录](#目录)**


### 6. 如何水平居中一个元素

 - 如果元素是常规流中的inline元素，为父元素设置 text-align: center, 就可以
```
<body>
  <div class="content">
	  aaaaaa aaaaaa a a a a a a a a
  </div>
</body>

<style>
  body {
	  background: grey;

    text-align: center;
  }
</style>
```
 - 如果元素是常规流中的block元素，
 
		1. 为元素设置宽度，
		2. 设置左右 margin 为 auto，
		3. IE6下需在父元素上设置 text-align: center, 再给子元素恢复需要的值
		
```
<body>
  <div class="content">
  aaaaaa aaaaaa a a a a a a a a
  </div>
</body>

<style>
  body {
      background: grey;
      text-align: center; /* 3 */
  }
  .content {
      width: 500px;      /* 1 */
      margin: 0 auto;    /* 2 */
      text-align: left;  /* 3 */

      background: purple;
  }
</style>		
```
 - 如果元素是浮动元素，
 
		1. 为元素设置宽度，
		2. position: relative
		3. 浮动方向偏移量 (left或者right) 设置50%
		4. 浮动方向上的margin设置为元素宽度一半乘以 -1
		
```
<body>
	<div class="content">
    aaaaaa aaaaaa a a a a a a a a
	</div>
</body>

<style>
	body {
		background: grey;
	}
	.content {
		width: 800px;          /* 1 */
		float: none;
		
		position: relative;    /* 2 */
		left: 50%;             /* 3 */
		margin-left: -400px;   /* 4 */

		background: purple;
	}
</style>
```
 - 如果元素是绝对定位元素

		1. 为元素设置宽度，
		2. 偏移量设置为50%
		3. 偏移方向外边距设置为元素宽度一半乘以-1
		
```
<body>
	<div class="content">
	aaaaaa aaaaaa a a a a a a a a
	</div>
</body>

<style>
	body {
		background: grey;
		position: relative;
	}
	.content {
		position: absolute;
		
		width: 800px;          /* 1 */
		left: 50%;             /* 2 */
		margin-left: -400px;   /* 3 */

		background: purple;
	}
</style>
```

**[:arrow_up: 返回目录](#目录)**

### 7. em rem px vw vh单位区别
|CSS单位 | - |
| --------   | -----:   |
|相对长度单位 | em、ex、ch、rem、vm、vh、vmin、vmax、% |
|绝对长度单位| cm、mm、in、px、pt、pc |

主要学习写px、rem、vh、vw

**px**
表示像素，页面按精确像素展示，px的大小和元素的其他属性无关

**rem**
rem，相对单位，相对的只是HTML根元素font-size的值。浏览器默认的字体高度是16px = 1rem
想要简化font-size的转化，可以再根元素html中加入` html {font-size: 10px} ` /* 16px * 62.5% = 10px */

和em不同的是rem总是相对与根元素，而不像em一样使用级联的方式来计算尺寸

**vh、vw**
vh,就是根据窗口的高度，分成100等份，100vw就是满高，50vh就是一半高，同理vw就是窗口的宽度
一般定义窗口的高度大小是定义 calc(100vh)

**[:arrow_up: 返回目录](#目录)**

### 8. 单行和多行文本溢出的省略的样式
**单行文本溢出**
实现的方式很简单，涉及的CSS属性有
* overflow: hidden 文字长度超出限定宽度, 则掩藏超出的内容
* white-space: nowrap 设置文字在一行显示，不能换行
* text-overflow: ellipsis 规定当文本溢出时，显示省略号来代表被修剪的文本

```js
 * {
	 width: 400px;
	 height: 40px;
	 line-height: 40px;
	 overflow: hidden;
	 white-space: nowrap;
	 text-overflow: ellipsis; // 只有设置了overflow: hidden和white-space: nowrap才能够生效
 }
```

**多行文本溢出**
多行文本溢出的时候，可以分为两种情况
* 基于高度截断
* 基于行数截断

1. 基于高度截断 => 为元素 + 定位
实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过overflow: hidden掩藏多余文字。
`一般文本存在英文的时候，可以设置word-break: break-all使用一个单词能够再换行时进行拆分`
```js
		.demo {
			position: relative;
			background-color: #008080;
			height: 2.5rem;
			line-height: 1.25rem;
			overflow: hidden;
		}
		.demo::after {
			content: "...";
			position: absolute;
			bottom: 0;
			right: 0;
			padding: 0 20px 0 10px;
		}
```

2. 基于行数截断
纯CSS实现非常简单，核心的CSS的代码如下：
* -webkit-line-clamp: 2, 用来限制一个块元素显示的文本行数
* display: -webkit-box, 和第一个结合使用，将对象作为弹性伸缩盒子模型显示
* -webkit-box-orient: vertical, 和第一个结合使用，设置排列方式
* overflow: hidden, 文本溢出的限定的宽度就掩藏内容
* text-overflow: ellipsis, 多行文本的情况下，用省略号"..."掩藏溢出范围的文本

**[:arrow_up: 返回目录](#目录)**

### 9. CSS的三大预处器和区别
1. 分类: CSS预编译语言在前端里面有三大优秀的预编处理器，分别是
* sass(进化版版scss)
* less
* stylus







**[:arrow_up: 返回目录](#目录)**







