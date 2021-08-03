## CSS 面试知识点总结

本部分主要是笔者在复习 CSS 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录
- [1.请简述下CSS选择器的权重与优先规则](#1-请简述下CSS选择器的权重与优先规则)
- [2.分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景](#2-分析比较-opacity:-0-visibility:-hidden-display:-none-优劣和适用场景)
- [3.如何水平居中一个元素](#3-如何水平居中一个元素)
-
-
-
-


### 1. 请简述下CSS选择器的权重与优先规则
!important > 行内样式 > ID选择器 > 类选择器 > 元素选择器 > 通配符选择器 > 继承 > 浏览器默认属性。

**[:arrow_up: 返回目录](#目录)**


### 2. 分析比较 opacity: 0 visibility: hidden display: none 优劣和适用场景
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


### 3. 如何水平居中一个元素

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


