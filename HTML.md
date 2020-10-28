## HTML 面试知识点总结

本部分主要是笔者在复习 HTML 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！

### 目录

* [1. DOCTYPE 的作用是什么？](#1-doctype-的作用是什么)
* [2. 关于DOCTYPE html和meta](#2-关于DOCTYPE-html和meta)

#### 1. DOCTYPE 的作用是什么？
   
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
   
#### 2. 关于DOCTYPE html和meta 
   ```
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
   ```
   
