## Webpack

### 目录
- [webpack初体验时需要注意的点](#webpack初体验时需要注意的点)
- [webpack得理解和解决得问题](#webpack得理解和解决得问题)
- [Plugin 和 Loader 分别是什么？ 怎么工作的？](#plugin-和-loader-分别是什么-怎么工作的)
- [Loader的作用是什么和常用的Loader](#Loader的作用是什么和常用的Loader)
- [Plugin的作用是什么和常用的Plugin](#Plugin的作用是什么和常用的Plugin)
- [webpak moudles, 如何表达自己的各种依赖关系](#webpak-moudles-如何表达自己的各种依赖关系)
- [webpak 中 moudles bundle 和 Chunk 的区别是什么](#webpak-中-moudles-bundle-和-chunk-的区别是什么)
- [热更新的配置和实现原理](#热更新的配置和实现原理)
- [文件指纹](#文件指纹)
- [静态资源内联](#静态资源内联)
- [多页面应用打包通用方案](#多页面应用打包通用方案)
- [source map](#source-map)
- [提取页面公共资源splitChunksPlugin](#提取页面公共资源splitChunksPlugin)
- [代码分割和动态import](#代码分割和动态import)
- [介绍一下webpack的Tree Sharking](#介绍一下webpack的Tree Sharking)
- [介绍一下webpack dll](#介绍一下webpack-dll)
- [webpack的proxy工作原理](#-webpack的proxy工作原理)
- [编写Loader](#编写Loader)
- [编写Plugin](#编写Plugin)
- [webpack实现SSR打包](#webpack实现SSR打包)
- [webpack的构建流程](#webpack的构建流程)
- [webpack和rollup之间的异同点](#webpack和rollup之间的异同点)
- [webpack构建速度和体积优化策略](#webpack构建速度和体积优化策略)
- [webpack层面如何做性能优化](#webpack层面如何做性能优化)



------------------------------------------------------------------------------------------

### webpack初体验时需要注意的点
1. 学习chunks时，要使用webpack版本4.7，5.X版本以上没法看到chunks
2. 在package.json中不配置sricpt时，运行webpack命令是: ./node_modules/.bin/webpack
3. npm run build的原理是在./node_modules/.bin中创建软链接, 在json文件中配置"build": "webpack"，可以在命令中执行npm run build
4. webpack文件名要是webpack.config.js,不然打包成的dist目录下文件是main.js文件
5. npm install webpack webpack-cli -D
6. npm i @babel/core @babel/preset-env babel-loader -D
7. npm i react react-dom @babel/preset-react -S
8. -S 安装在dependencies, -D 安装在devDenpendencies, devDependencies用于本地环境开发时候，dependencies用户发布环境，也就是开发阶段的依赖最后是不对被打入包内。
9. 通常框架、组件和 utils 等业务逻辑相关的包依赖放在dependencies里面，对于构建、ESlint、单元测试等相关依赖放在devDependencies中
10. clean-webpack-plugin已经被output中clean替换了
11. optimize-css-assets-plugin插件也没有看见？？？

**[:arrow_up: 返回目录](#目录)**

### webpack得理解和解决得问题

为了是实现模块化，前期得方案有
1. 每个文件是一个独立得模块，通过script将这些js文件引入到页面，这个方法弊端也很明显，模块都是再全局工作，全局变量污染环境，模块之间没有依赖性，维护困难
2. 命名空间方式，规定每个模块只暴露一个全局对象，然后模块得内容挂载到这个对象中，这个方法也没有解决模块得依赖问题
3. 之后就是IIFE立即执行函数，为模块提供私有空间，通过参数得形式作为依赖声明

webpack是用于js应用程序得静态模块打包工具
1. 模块化开发，js文件、html和css资源文件都需要模块化
2. 使用高级特性编译代码，loader、sass和less
3. 监听文件变化，watch、HMR
4. 开发完成之后代码压缩，合并以及优化

**[:arrow_up: 返回目录](#目录)**

### Plugin 和 Loader 分别是什么？ 怎么工作的？

1. Plugin

*作用*：扩展webpack功能的插件，webpack运行的各个生命周期阶段，都会广播出对应的事件，plugin插件去监听对应的事件，在合适的时机通过Webpack提供的API改变输出结果。 
*语法*: 在module.plugins中单独配置，类型为数组，每一项都是一个plugin实例，参数通过构造函数传入

2. Loader

*作用*: 模块转换器，将非js模块转换为webpack可以识别的js模块。本质上，webpack loader 将所有类型的文件，转换为应用程序的**依赖图**可以直接引用的模块
*语法*: 再module.rules中配置，作为模块得解析而存在。类型为数组，每一项都是一个Object，里面描述了对于什么类型得文件（test）,使用什么加载（loader）和使用参数（options）

3. Compiler
对象，包含了webpack环境的所有配置信息，包换options loader， plugins, 
webpack启动的时候实例化，他是全局唯一的，可以把他理解为webpack的实例

4. Compilation
做为plugin内置事件回调函数的参数，包含了当前的模块资源，编译生成资源，变化的文件以及被跟踪依赖的状态信息。
webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一次新的Compliation

**[:arrow_up: 返回目录](#目录)**

### Loader的作用是什么和常用的Loader
* 对不同格式文件做处理, 如将Sass文件处理成Css文件，Ts文件处理成JS文件
* 编译文件，使文件可以加载到依赖关系中

常用的Loader：
* file-loader: 用于处理文件，通过相对URL去引用输出的文件
* url-loader: 能在字体和图片文件很小的情况下（options中设置limit）以base64的方式将文件内容注入到代码中,内部原理也是用的file-loader(如果图片大小超过limit就不会base进文件)
* source-map-loader: 从现有的js文件提取出source maps
* css-loader: css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样
* style-loader: 将css注入到js中，通过操作DOM来加载CSS
* less-loader: 将less文件转换成css文件
* image-loader: 加载并压缩图片文件
* babel-loader: 将ES6转换成ES5
* thread-loader: 多进程打包js文件
* Eslint-loader: 使用Eslint规范检查JS代码

**[:arrow_up: 返回目录](#目录)**

### Plugin的作用是什么和常用的Plugin
功能例如打包优化，环境变量注入，资源管理等，本质是一个具有apply方法JavaScript对象，目的是解决loader无法实现的其他事情。

常用的Plugin:
* HtmlWebpackPlugin: 在打包结束之后，自动生成一个html文件，并把打包生成的js模块引入到html中
* SplitChunksPlugin: optimization.splitChunksPlugin将chunks相同的模块代码提取成公共js
* CleanWebpackPlugin: 删除构建目录
* mini-css-extract-plugin: 提取css到一个单独的文化中
* DefinePlugin: webpack内置的一个插件，不需要安装，允许在编译时创建配置的全局对象，如设置process.env.NODE_ENV为development或者production
* UlglifyjsWebpackPlugin: 压缩JS, 3.0版本是支持ES6的JS压缩
* TerserWebpackPlugin: webpack v5 开箱即带有最新版本的 terser-webpack-plugin, 是ulglifjswebpackplugin改良版

**[:arrow_up: 返回目录](#目录)**

### webpak moudles, 如何表达自己的各种依赖关系
* ESM / export default, import
* CommonJs / module.exports, require 同步加载，都是单实例 普遍使用在node项目中
* AMD / define, require 异步加载 浏览器端的规范使用AMD比较好
* css/sass/less @import.

**[:arrow_up: 返回目录](#目录)**

### webpak 中 moudles bundle 和 Chunk 的区别是什么 

1. Chunk

Chunk 是webpack**打包过程中**Moudles的集合，是打包过程中的概念。

webpack 的打包是从一个入口模块开始，入口模块引用其他模块， 其他模块引用其他模块.....
webpack 通过引用关系逐个打包模块， 这些moudle就形成了一个Chunk

如果有多个入口模块，可能会产生多条打包路径，每条路径会形成一个Chunk

2. Bundle

是我们最终输出的一个打包文件

3. Chunk 和 Bundle 的区别

大多数情况下， 一个Chunk会生产一个Bundle， 但是也有例外

但是如果加了sourcemap，一个entry， 一个chunk对应着两个bundle。

Chunk时过程中代码块，Bundle时打包结果输出的代码块，Chunk在构建完成呈现为Bundle

4. Split Chunk

**[:arrow_up: 返回目录](#目录)**

### 热更新的配置和实现原理
1. 配置
热更新HMR(hot module replacement)是在开发模式下配置webpack-dev-server, 搭配插件webpack.HotModuleReplacementPlugin,但是v4开始，HMR默认启用的。
因为在webpack-dev-server中设置hot=true或者CLI设置--hot时，不需要在webpack.config.js中添加该插件
```js
// 首先要安装
npm i webpack-dev-server

// package.json添加

"script": {
	dev: 'webpack-dev-server'
}

// webpack.config.js

// 1、配置 mode
mode: 'development'

// 2、配置webpack-dev-server
devserver: {
	hot: true,
	open: true
}
```
2. 实现原理
这里面的热更新有最核心的是 HMR Server 和 HMR runtime。

HMR Server 是服务端，用来将变化的 js 模块通过 websocket 的消息通知给浏览器端。
HMR Runtime是浏览器端，用于接受 HMR Server 传递的模块数据，浏览器端可以看到 .hot-update.json 的文件过来。

HotModuleReplacementPlugin是做什么用的？

webpack 构建出来的 bundle.js 本身是不具备热更新的能力的，HotModuleReplacementPlugin 的作用就是将 HMR runtime 注入到 bundle.js，
使得bundle.js可以和HMR server建立websocket的通信连接

参照流程图
![]()

**[:arrow_up: 返回目录](#目录)**

### 文件指纹
1. 文件指纹的生成
* Hash: 和整个项目的构建相关, 只要项目文件有修改，整个项目构建的hash值就会更改，可以指图片hash,设置file-loader的name，使用[hash]
options: {
	name: '[name]_[hash:8].[ext]'
}
 ⬇
* Chunkhash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值，打包成成的bundle.js文件，设置output的filename，使用[chunkhash]
filename: '[name]_[chunkhash:8].js',
 ⬇
* Contenthash: 根据文件内容来定义hash，文件内容不变，则contenthash不变，设置MiniCssExtractPlugin的filename，使用[contenthash]
new MiniCssExtractPlugin({
	filename: '[name]_[contenthash:8].css'
})

**[:arrow_up: 返回目录](#目录)**

### Less Sass和Scss以及PostCss





**[:arrow_up: 返回目录](#目录)**

### 静态资源内联
静态资源内联指的是将html css和js，或者图片字体内联到html中。

静态资源内联的意义：

1. 代码层面
* 页面框架的初始化脚本
* 上报相关打点
* css 内联避免页面的闪动

2. 请求层面
* 减少Http网络请求数
* 小图片或者字体内联（url-loader）

如果是版本较高 "html-webpack-plugin": "^4.2.0",
1. raw-loader内联 html
<%= require('raw-loader!./meta.html') %>
2. raw-loader内联 js
<script><%= require('raw-loader!babel-loader!../../node_modules/lib-flexible/flexible.js') %></script>
3. css内联
* 借助style-loader
```js
//webpack.config.js
module.exports = {
	module: {
		rules: [
			test: /\.less$/,
			use: [
				{
					loader: 'style-loader',
					options: {
						insertAt: 'top', // 样式插入到<head>
						singleton: true, // 将所有的style合并一个
					}
				}
			]
		]
	}
}
```
* html-inline-css-webpack-plugin
```js
// 首先安装 npm i html-inline-css-webpack-plugin -D

// 在package.json中放在html-webpack-plugin后面

```

Css内联的原理：
1. style-loader插入样式是一个动态的过程，在打包后的html源码中不会看见html的style样式，style-loader是代码运行时动态的创建style标签，然后将css style插入到标签中
2. css-loader的作用时将css转换成commonjs对象，也就是样式代码会被放到js代码中
3. 首先需要借助mini-css-extract-plugin将css文件打包成一个单独的文件，再用html-inline-css-webpack-plugin内联


**[:arrow_up: 返回目录](#目录)**

### 多页面应用打包通用方案
```js
//webpack.prod.config.js
const setMPA = () => {
	const entry = {};
	const htmlWebpackPlugin = [];
	
	const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
	Object.keys(entryFiles)
		.map((index) => {
			const entryFile = entryFiles[index];
			const match = entryFile.match(/src\/(.*)\/index\.js/);
			
			const pageName = match && match[1];
			entry[pageName] = entryFile;
			
			htmlWebpackPlugin.push(
				new HtmlWebpackPlugin({
					template: path.join(__dirname, `src/${pageName}/index.html`),
					filename: `${pageName}.html`,
					chunks: [pageName],
					inject: true,
					minify: {
						html5: true,
						collapsWhitespace: true,
						preserveLineBreaks: false,
						minifyCSS: true,
						minifyJS: true,
						removeComments: false
					}
				})
			)
			
		})

	return {
		entry,
		htmlWebpackPlugin
	}
}

const {entry, htmlWebpackPlugin} = setMPA();
```
**[:arrow_up: 返回目录](#目录)**

### source map
1. 作用:在devtool中配置sourcemap，通过source map定位到源代码中，开发环境开启，线上环境关闭（线上排查问题的时候可以将sourcemap上传到错误监控系统中e.g. Sentry）
2. source map关键字
| 关键字      | Description | 
| :---       |    :----:   |
| eval       | 使用eval包裹模块代码  |
| source map | 产生.map文件  | 
| cheap      | 不包含列信息 |
| inline     | 将.map作为DataURI嵌入，不单独生成.map文件 |
| module     | 包含loader的sourcemap |
3. source map类型

**[:arrow_up: 返回目录](#目录)**

### 提取页面公共资源splitChunksPlugin
```js
module.exports = {
    //...
    optimization: {
      splitChunks: {
        // async：异步引入的库进行分离（默认）， initial： 同步引入的库进行分离， all：所有引入的库进行分离（推荐）
        chunks: 'async',
        minSize: 30000, // 抽离的公共包最小的大小，单位字节
        maxSize: 0, // 最大的大小
        minChunks: 1, // 资源使用的次数(在多个页面使用到)， 大于1， 最小使用次数
        maxAsyncRequests: 5, // 并发请求的数量
        maxInitialRequests: 3, // 入口文件做代码分割最多能分成3个js文件
        automaticNameDelimiter: '~', // 文件生成时的连接符
        automaticNameMaxLength: 30, // 自动自动命名最大长度
        name: true, //让cacheGroups里设置的名字有效
        cacheGroups: { //当打包同步代码时,上面的参数生效
          vendors: {
            test: /[\\/]node_modules[\\/]/, //检测引入的库是否在node_modlues目录下的
            priority: -10, //值越大,优先级越高.模块先打包到优先级高的组里
            filename: 'vendors.js'//把所有的库都打包到一个叫vendors.js的文件里
          },
          default: {
            minChunks: 2, // 上面有
            priority: -20, // 上面有
            reuseExistingChunk: true //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
          }
        }
      }
    }
  };
```

**[:arrow_up: 返回目录](#目录)**

### 代码分割和动态import
代码分割：webpack有一个功能就是将你的代码库分割成chunks（语块），当代码运行到需要他们的时候才加载
适用场景：
* 抽离相同代码到一个共享块
* 脚本懒加载，使得初始下载的代码更小

懒加载JS脚本的方式
* commonJS: require.ensure
* ES6: 动态import（目前还没有原生支持，需要babel转换），在.babelrc中配置 "plugins": [@babel/plugin-syntax-dynamic-import]

**[:arrow_up: 返回目录](#目录)**

### 介绍一下webpack的Tree Sharking
1. 是什么？
Tree sharking是一种通过清除多余代码的方式来优化项目打包体积的技术，专业术语叫Dead code elimination

2. 原理
* 因为tree sharking只能在静态modules下工作，所以CommonJs的reuire动态导入不适合，而ES6 Module不同于CommonJs，ES6中，引入了完全静态的导入语法import
* 静态分析程序，判断哪些模块和变量未被使用或者引用，进而删除对应的代码

**[:arrow_up: 返回目录](#目录)**

### 介绍一下webpack dll
 1. dll是什么?
在webpack打包的时候，对于一些不经常更新的第三方库，比如react，vue，loadsh等，打包的时候希望能和我们的代码分离开。
dll的想法就类似动态链接库

 2. dll怎么用?
	- 由于需要单独打包第三方模块，需要一个独立的webpack配置，所以创建webpack.dll.js文件
	- webpack.config.js文件需要稍微的改动下
	- 编译的话 webpack --config webpack.dll.js   webpack --config webpack.config.js
```js
/*****webpack.dll.js******/
module.exports = {
    mode: 'none',
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, 'build/library'),
        filename: '[name]_[chunkhash:8].dll.js',
        library: "[name]",
        // clean: true
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]_[hash:8]",
            path: path.join(__dirname, 'build/library/library.json')
        })
    ]
}


/*****webpack.config.js******/
plugins: [
	... //其他plugin配置
	new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: require('build/library/library.json')
	})
]
```

备注： dll的目的就是为了提升打包的速度，但是在create-react-app和webpack5+版本之后都去除了dll，在webpack5+版本之后，自动配置了
autodll-webpack-plugin插件，所以dll已经被抛弃了，但是dll的思想还是保留了下来

是的，如果项目使用了 Webpack4，确实对 dll 的依赖没那么大，使用 dll 相对来说提升也不是特别明显。而且有 hard-source-webpack-plugin 可以极大提升二次构建速度。

不过从实际前端工程中来说， dll 还是很有必要掌握的。对于一个团队而言，基本是采用相同的技术栈，要么 React、要么Vue 等等。这个时候，通常的做法都是把公共框架打成一个 common bundle 文件供所有项目使用。
比如我们团队会将 react、react-dom、redux、react-redux 等等打包成一个公共库。dll 可以很好的满足这种场景：将多个npm包打成一个公共包。
因此团队里面的分包方案使用 dll 还是很有价值，常见的会从整个工程的角度分为基础包（react、redux等）、业务公共包（所有业务都要用到的监控上报脚本、页面初始化脚本）、某个业务的js。

**[:arrow_up: 返回目录](#目录)**

### webpack实现SSR打包
服务端渲染SSR（server side render）:
1. 渲染：HTML + CSS + JS + Data -> 渲染后的html
2. 服务端：
* 所有模板等资源都存储在服务器端
* 内网机器拉取数据更快
* 一个HTML返回所有数据

SSR实现的思路
1. 服务端
* 使用react-dom/server 的renderToString方法将React组件渲染字符串
* 服务端路由返回对应的模板

2. 客户端
* 打包出针对服务端的组件

如何解决样式不显示的问题？
* 使用打包出来的浏览器端html为模板，设置占位符(如腾讯团队注释： <!--HTML_PLACEHOLDE -->)，动态插入组件
```html
<!DOCTYPE html>
...
<body>
	<div><!--HTML_PLACEHOLDE --></div>
</body>
```
之后在服务端进行替换

首屏数据如何处理？
* 服务端获取数据，替换占位符

**[:arrow_up: 返回目录](#目录)**


### webpack的proxy工作原理

1. 是什么?
webpack proxy即webpack提供的代理服务，其目的是为了便于开发者在开发模式下解决跨域问题(浏览器安全策略限制)，
想要实现代理首先需要一个中间服务器，webpack中提供服务器的工具是webpck-dev-server.

2. 工作原理
proxy工作原理实质上是利用http-proxy-middleware这个http代理中间件，实现请求转发给其他服务器

eg：
在开发阶段，本地地址是localhost:3000，该浏览器发送一个前缀带有/api标识的请求到服务器获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中
```js
const express = require('express')
const proxy = require('http-proxy-middleware')

const app = new express()

app.use('./api', proxy({
	target: 'http://www.example.com',changeOrigin: true
}))

app.listen(3000)

```

说明：就是本地请求后台服务器，就出现跨域请求的问题。通过设置webpack proxy实现代理请求, 相当于浏览器与服务端中添加了一个代理服务器。

本地请求通过代理服务器转发到后台服务器，后台服务器响应数据再返回给代理服务器，最终有代理服务器返回给本地

注意: 服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制



**[:arrow_up: 返回目录](#目录)**

### 编写Loader


**[:arrow_up: 返回目录](#目录)**

### 编写Plugin
Plugin中apply方法会被webpack compiler调用，并且在整个编译周期都可以访问compiler对象
```js
const myPluginName = 'consoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {                             // 1. 插件名称
	apply(compiler) {                                                // 2. 插件上的apply方法
		compiler.hooks.run.tap(myPluginName, (compilation) => {        // 3. 插件的hooks
			console.log('webpack 构建过程开始')                           // 4. 插件处理逻辑
		})
	}
}

module.exports = ConsoleLogOnBuildWebpackPlugin                    // 5. 插件export导出


// webpack.config.js
module.exports = {
	...
	plugins: [new ConsoleLogOnBuildWebpackPlugin()]                  // 6. 插件的使用
}
```



自己实现的Plugin，也需要遵循一定的规范:
* 插件必须是一个函数或者是一个包含了apply方法的对象，这样才能访问compiler实例
* 传给每个插件的compiler和compilation对象都是同一个引用，因此不建议修改
* 异步的事件需要在插件处理完任务时调用回调函数通知webpack进入下一个流程，不然会卡住

**[:arrow_up: 返回目录](#目录)**


### webpack的构建流程
 1. 初始化参数: 从配置和shell语句中读取并合并参数，确定最终参数
 2. 开始编译: 从上一步得到的参数初始化compiler对象，加载所有配置的plugins，执行对象的run方法开始编译
 3. 确定入口: 根据配置的entry确定所有的入口文件
 4. 编译模块: 根据入口文件，调用所有配置Loader的模块进行编译，再找出模块所依赖的模块，递归本步骤直到所有入口依赖的模块完成编译
 5. 完成模块编译: 经过所有Loader翻译完所有模块后，得到最终内容和他们之间的依赖关系
 6. 输出资源: 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个Chunk转换成一个单独的文件加入到输出列表中，这是可以修改内容的最后机会
 7. 输出完成: 在确定好输出内容后，根据输出路劲和文件名，把输出内容写入到文件系统

**[:arrow_up: 返回目录](#目录)**

### webpack和rollup之间的异同点
 1. 相同点
  - 在打包编译上都有Tree Shaking 和 Scope hoisting功能
 2. 不同点
	- webpack有代码分割和静态资源导入有着先天的优势，同时还支持HMR功能，这个是rollup所没有的
	- Rollup对于代码的Tree-shaking和ES6模块有着算法优势上的支持
	- 所以开发应用时使用webpack，开发javascript库时使用rollup

**[:arrow_up: 返回目录](#目录)**

### webpack构建速度和体积优化策略
1. 初级分析，使用webpack内置得stats
2. 速度分析, 使用speed-measure-webpack-plugin
3. 体积分析，使用webpack-bundle-analyzer(BundleAnalyzerPlugin)
4. 使用高版本得webpack和Node.js
5. 多实例和多进程打包Happypack, thread-loader
6. 多进程代码压缩 uglifyjs-webpack-plugin和terser-webpack-plugin
7. 预编译打包，dll技术
8. 开启二次缓存提升构建速度
	* babel-loader 开启cacheDirectory = true
	* terser-webpack-plugin开启缓存（好像没有cache这个属性？）
	* 使用hard-source-webpack-plugin
9. 缩小构建目标,尽可能得少构建模块
```js
module.exports = {
	rules: {
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: 'node_modules' // 不构建node_modules模块
	},
	
	resolve: {
		alias: {
			'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
			'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
		},
		extensions: ['.js'],
		mainFields: ['main']
	}
}
```
10. 图片压缩，基于Node库得imagemin搭配image-webpack-loader使用

**[:arrow_up: 返回目录](#目录)**

### webpack层面如何做性能优化
用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

 1. 压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css。使用webpack4，打包项目使用production模式，会自动开启代码压缩。
 2. 利用CDN加速。在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径
 3. 删除死代码（Tree Shaking）。将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现或者使用es6模块开启删除死代码。
 4. Code Spliting: 将代码按照路由维度或者组件分块(chunk)，这样做到按需加载，同时可以充分利用浏览器缓存
 5. 提取公共第三方库，SplitChunksPlugin插件来进行公共模块抽取，利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码
 6. 优化图片，对于小图可以使用 base64 的方式写入文件中，和image-loader

**[:arrow_up: 返回目录](#目录)**

















