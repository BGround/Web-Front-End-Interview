## Flex布局
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

```js
.container {
	display: flex;
	// 注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
}

```

### 容器的属性
以下6个属性设置在容器上
1. flex-direction

决定主轴的排列方向，有4个值

2. flex-wrap

是否在一行轴线上显示，有3个值，nowrap不换行；wrap换行，第一行在上；wrap-reverse，第一行在下

3. flex-flow

flex-direction和flex-wrap的简写形式，默认是row nowrap

4. justify-content

在主轴上的对齐方式，有5个值，flex-start, flex-end, center, space-between, space-around

5. align-items

在交叉轴上如何对齐, 也有5个值，flex-start | flex-end | center | baseline | stretch;

6. align-content

多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 有6个值
align-content: flex-start | flex-end | center | space-between | space-around | stretch;

### 项目的属性
1. order 项目的排列顺序。数值越小，排列越靠前，默认为0
2. flex-grow 项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
3. flex-shrink 项目的缩小比例，默认为1，即如果空间不足，该项目将缩小, 负值对该属性无效。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

4. flex-basis
5. flex
6. align-self

属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

