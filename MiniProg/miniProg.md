## 小程序学习文档

### 学习资料和资源

1. [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
2. [小程序开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
3. ColorUI
github: https://github.com/weilanwl/ColorUI/
资源整理: [语雀](https://www.yuque.com/colorui)
极客时间微信小程序实战中课件: 在最后一节有所有课件。也给你发一下，
链接：https://pan.baidu.com/s/1mJq_NVstuPpNRi7PDawjkg 提取码：liyi
这是Mac上的keynote文件，如果在Windows上查看，可以从这个网站转化： https://zhuanhuan.supfree.net/hao.asp?f=key&t=pdf

技术栈：
1. Min Cli：小程序开发框架，类VUE
2. MinUI：小程序UI组件库
3. es6-promise：提供承诺支持
4. wx-promise-request：小程序初始化网络请求
5. wemark：小程序Markdown渲染库


### 小程序组件

##### icon

**自定义图标实现方式**

1. 使用图片
  - 大量HTTP请求
  - 不方便修改样式
  - 图片放大会变虚
2. 精灵图
3. CSS绘制
  - 工作量大
  - 绘制时，需要统一一个中心点，否则控制位置比较麻烦
  - 不方便控制大小、颜色
4. 矢量字体 👈 `最简单有效` 阿里巴巴iconfont字体最有效
  - @font-face、 font-family
  - 点阵字体 vs 矢量字体(type 1、trueType、openType)
  - iconfont.cn
  - 小程序推荐 ttf、woff (woff2不兼容低版本iOS)
5. SVG文件
   - [image2base64](www.sojson.com/image2base64.html)
6. canvas
  - canvas多用于制作动画
  - 用于自定义图标有些大材小用
  - [omijs - 将SVG绘制成图像的 Cax 引擎](https://github.com/Tencent/omi)
  - [dntzhang(张磊) - 微信开放社区](https://developers.weixin.qq.com/community/personal/oCJUsw6rFVEDMczhqQwmnqaWhcl4)

WXSS加载图片及字体允许外域
[weui](https://weui.io/)
















