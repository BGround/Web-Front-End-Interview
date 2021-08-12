## Webpack

### 目录
- [webpak moudles, 如何表达自己的各种依赖关系](#-webpak-moudles, 如何表达自己的各种依赖关)
- [webpak 中 moudles bundle 和 Chunkd 的区别是什么](#-webpak-中-moudles-bundle-和-Chunkd-的区别是什么)
- [Plugin 和 Loader 分别是什么？ 怎么工作的？](#-Plugin-和-Loader-分别是什么-怎么工作的)
- [webpack的构建流程](#-webpack的构建流程)




### webpak moudles, 如何表达自己的各种依赖关系
* ESM import
* CommonJs require
* AMD define require
* css/sass/less @import.

**[:arrow_up: 返回目录](#目录)**

### webpak 中 moudles bundle 和 Chunk 的区别是什么 

1. Chunk

Chunk 是webpack打包过程中Moudles的集合，是打包过程中的概念。

webpack 的打包是从一个入口模块开始，入口模块引用其他模块， 其他模块引用其他模块.....
webpack 通过引用关系逐个打包模块， 这些moudle就形成了一个Chunk


如果有多个入口模块，可能会产生多条打包路径，每条路径会形成一个Chunk

2. Bundle

是我们最终输出的一个打包文件

3. Chunk 和 Bundle 的区别

大多数情况下， 一个Chunk会生产一个Bundle， 但是也有例外

但是如果加了sourcemap，一个entry， 一个chunk对应着两个bundle。

4. Split Chunk

**[:arrow_up: 返回目录](#目录)**

### Plugin 和 Loader 分别是什么？ 怎么工作的？

1. Plugin

扩展插件，webpack运行的各个阶段，都会广播出对应的事件，插件去监听对应的事件。

2. Loader

模块转换器，将非js模块转换为webpack可以识别的js模块

本质上，webpack loader 将所有类型的文件，转换为应用程序的**依赖图**可以直接引用的模块

3. Compiler
对象，包含了webpack环境的所有配置信息，包换options loader， plugins, 
webpack启动的时候实例化，他是全局唯一的，可以把他理解为webpack的实例

4. Compliation

包含了当前的模块资源，编译生成资源，
webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一次新的Compliation

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


### webpack层面如何做性能优化
用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

 1. 压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css。使用webpack4，打包项目使用production模式，会自动开启代码压缩。
 2. 利用CDN加速。在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径
 3. 删除死代码（Tree Shaking）。将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现或者使用es6模块开启删除死代码。
 4. 优化图片，对于小图可以使用 base64 的方式写入文件中
 5. 按照路由拆分代码，实现按需加载，提取公共代码。
 6. 给打包出来的文件名添加哈希，实现浏览器缓存文件

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
const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['vue']                                   
  },

  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dist'),
    library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist/[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    }),
  ],
}

/*****webpack.config.js******/
plugins: [
	... //其他plugin配置
	new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: require('./dist/vendors-manifest.json')
	})
]
```

备注： dll的目的就是为了提升打包的速度，但是在create-react-app和webpack5+版本之后都去除了dll，在webpack5+版本之后，自动配置了
autodll-webpack-plugin插件，所以dll已经被抛弃了，但是dll的思想还是保留了下来

### 介绍一下webpack的Tree Sharking














