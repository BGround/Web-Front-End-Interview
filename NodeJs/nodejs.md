## 前言
学习Node.js之前先来了解以下他是什么，有什么特点和作用？
注意 Node.js 听名字好像是个 JS 库，其实不是的，Node.js 是 C++ 开发的，到官网 http://nodejs.org 可以看到
>Node.js 是一个基于 Chrome V8 引擎的 Javascript 运行环境

所以说 Node.js 不是库，是一个运行环境，或者说是一个 JS 语言解释器。特点是**事件驱动**和**非阻塞式I/O**

Node.js 出现之后，JS 前后通吃了。如果去网上搜 Node.js 的资料，很多都是用 Node.js 去写服务器代码的。

**Nodejs 中运行 JS 代码**
只要在电脑上安装了Node.js，就可以直接在NodeJS环境中运行JS代码，这和浏览器就没有啥关系了

**npm 是世界上最大软件包仓库**
npm的英文就是node package manger, 意思是Node的包管理系统，Nodejs 现在如日中天，其中 npm https://www.npmjs.com/ 这个功不可没。在这里，我们要实现各种功能几乎都能找到现成的别人写好的包，直接拿了用就好了。

很多 npm 包都对应一个 Github 项目，但是如果只有代码，那么使用起来还不是特别方便。而当系统上安装好了 Node.js 之后，就会配套安装一个命令，叫做 npm 。
```
npm install moment
```
执行 npm install moment 就可以把 moment 这个包从 npm 的软件包仓库中下载这个包，然后安装到本地了。而 npm 的软件包仓库中，有数以万计的 moment 这样的包。


## 目录
- [1.为什么输入 npm install 就可以自动安装对应的模块？](#1-为什么输入-npm-install-就可以自动安装对应的模块)
- [2.express使用](#2-express使用)
- [3.koa使用](#3-koa使用)
- [4.简述RPC调用](#4-简述RPC调用)
- [5.commonJS和es6模块引入的区别](#5-commonJS和es6模块引入的区别)
- [6.require和import的区别](#6-require和import的区别)












### 1. 为什么输入 npm install 就可以自动安装对应的模块

**[:arrow_up: 返回目录](#目录)**

### 2. express使用

**[:arrow_up: 返回目录](#目录)**

### 3. koa使用

**[:arrow_up: 返回目录](#目录)**


### 4. 简述RPC调用

**[:arrow_up: 返回目录](#目录)**

### 5. commonJS和es6模块引入的区别
CommonJS是一种模块规范，最初是用于Nodejs,成为Nodejs的模块规范，使用require进行模块引入
再ES6出来之前，前端也实现了一套相同的模块规范(AMD), 用来对前端模块进行管理

自ES6起，引入了ES6 modules规范，使用import 进行模块引入

**在使用上的区别:**
CommonJS模块输出是值的copy，运行时加载，ES6输出的是值的引用，模块是编译时输出接口
CommonJS是单个模块导出，ES6模块可以导出多个
CommonJS是动态语法，可以写在判断里面，ES6是静态语法，具有置顶性，但是建议写在文件头部

**[:arrow_up: 返回目录](#目录)**

const nums = [1, 0, false, null, undefined]
### 6. require和import的区别

[同上第五条](#5-commonJS和es6模块引入的区别)

**[:arrow_up: 返回目录](#目录)**

