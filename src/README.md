# uni-template-login
基于uni-app框架的登录模板

![](https://img-cdn-qiniu.dcloud.net.cn/7E6B79E2-B469-4CF3-8F4D-7502E72C4CB8.png?imageView2/0/w/375)
![](https://img-cdn-qiniu.dcloud.net.cn/659AE293-95F8-46E1-AC1F-D62FE3B080DB.png?imageView2/0/w/375)

## 运行方式
将项目拖入[HbuilderX](http://www.dcloud.io/hbuilderx.html),直接运行即可

## 特点
* 兼容微信小程序和APP
* 适用于强制登录和非强制登录应用场景
* 使用vuex管理登录状态
* 包含账户密码登录和第三方登录方式（微信、微博、QQ）

## 注意事项
* 页面初始化完毕后马上跳转页面可能会失败，可以尝试延迟执行

## 基础方法
* 在main.js中引入basicmethod.js后，在所有项目的页面中都可以直接引用类库的方法

#################################项目概述#################################
编辑器：HBuilder X
项目类型：uni-app
建项选择：
	1.空项目
	2.基本HTML项目
	3.vue项目     vue-cli默认项目   （选择）
结合hello uni-app官方demo建项，复制hello uni-app的一下几项到新建的项目src中：
	1.common文件夹 
	2.components文件夹
	3.uni.scss文件
项目框架：
	1.vue    当前主流移动端MVVM框架
	2.mpvue  是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。（Mini program Vue)
	3.weex  Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。uni-app App端内置 weex 引擎，提供了原生渲染能力。uni-app 里可以使用所有 weex 的内置组件和内置模块，编写页面时页面后缀名为 .nvue(native vue)，.nvue 只会编译到 App端，不支持在 Chrome 或小程序开发工具中预览，也不支持手机模拟器预览，需使用真机测试运行。（目前没有搭建，需要用到原生渲染的时候可再引入，nvue和vue可以实现通讯）
	4.Vuex 是一个专为 Vue.js 应用程序开发的状态管理工具库，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。（
	具体实现：store，
		import store from './store'   
		Vue.prototype.$store = store
		App.mpType = 'app'
		const app = new Vue({store,...App})
	 ）

项目目录：
dist: 	发布后的版本
	build:
		h5:	H5网页版
		mp-weixin：小程序版本
node_modules	项目的包管理（npm包管理器引入的项目需要的所有包，不用提交到版本管理器，打包也不会跟着项目打包），主要用于集成项目
public
	index.html    项目需要的H5模板，不要运行当前模板，不是项目启动入口

src	项目的主要源文件部分
	common：项目基础文件、类库、样式等，自定义的类库、样式也可以放到这里。
	components: 项目的组件文件夹，存放项目中自己封装的组件，以及uni-app自带的官方组件文件（从hello uni-app中复制过来）。
	components: 小程序独有的组件文件夹。
	node_modules: 项目运行需要的包，比如一些插件的包。
	pages: 具体的功能模块页面
	platforms: 平台独有文件、功能页面（Android、IOS、H5、微信小程序、支付宝小程序、百度小程序、字节跳动（头条）小程序、快应用、流应用）
	static: 静态资源文件，字体、图片、文件、本地插件等
	store：项目状态管理工具库，集中式存储管理应用的所有组件的状态（vuex的具体实现）
	unpackage: APP 发布的安装包文件夹
	//一下是src根目录文件
	App.vue 项目的主要页面入口
	License：
	main.js：项目的入口文件
	manifest.json： APP项目的主配置文件，基础配置、图标配置、启动图配置、SDK配置、模块权限配置、各平台配置
	package.json： node的基础配置文件，配置项目基础信息、开发和生产包管理等等。
	package-lock.json：锁定当前项目引用的包的版本。
	pages.json：项目的页面配置文档。
	README.md：项目说明文档
	service.js：项目服务配置
	uni.scss： Scss样式文档，不要要@import引入到样式中，也不需要import引入到.vue页面中，需要HBuilder X 安装编译Sass/Scss插件，具体安装在工具->插件安装中，使用方式是在.vue文档中的style标签上加上lang="scss" (<style lang="scss"></style>)，就可以在下面的样式中直接使用uni.scss文档中定义的变量、方法、代码块。
		
##自定义原生导航栏
1. 使用plus.nativeObj.view的api自定义titleNView。
2. 页面采用nvue，即weex方式制作。
3. 取消原生导航，使用view自行绘制

###取消原生导航栏后，自己使用HTML自定义组件模拟导航栏，会有很多性能体验问题：
加载不如原生导航快
下拉刷新无法从自定义的导航栏组件下面下拉
必须取消页面的bounce效果，否则滚动到顶时再拖屏幕，在iOS上发现title也被拖下来了。
滚动条会通顶
所以除非不得以，不要使用全局取消原生导航栏的做法。
如必须使用，注意如下几点：
涉及到导航栏高度的css尽量放置在App.vue里面以提高渲染速度（css渲染顺序：先渲染App.vue里面的css，再渲染页面css）
状态栏颜色应设置默认颜色，若非必要，不建议修改其颜色
减少在组件中使用 :style="" 的使用以提高性能

有个高频场景是App首页的title自定义，如果实现的效果很个性化，那么使用plus.nativeObj.view的方案会过于复杂，由于首页并不存在新页面进入立即渲染的压力，所以App首页如果要大幅定制，推荐使用前端view绘制，而不是使用plus.nativeObj.view。

如果把自定义导航封装成组件，虽然多个页面引入方便，但性能下降，因为这种自定义组件的加载是晚于页面基本元素的，会导致新页面进入动画时无法渲染title。所以导航条这种要求在动画期渲染的东西，尽量不要使用自定义组件方式。

##条件编译
###写法：以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。
#ifdef：if defined 仅在某平台存在
#ifndef：if not defined 除了某平台均存在
除了支持单个平台的条件编译外，还支持多平台同时编译，使用 || 来分隔平台名称。
###%PLATFORM% 可取值如下：
	APP-PLUS	5+App			HTML5+ 规范
	APP-PLUS-NVUE	5+App nvue	Weex 规范
	H5	H5	
	MP-WEIXIN	微信小程序		微信小程序
	MP-ALIPAY	支付宝小程序		支付宝小程序
	MP-BAIDU	百度小程序		百度小程序
	MP-TOUTIAO	头条小程序		头条小程序
	MP	微信小程序/支付宝小程序/百度小程序/头条小程序	
###支持的文件
	.vue
	.js
	.css
	pages.json
	各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug
###注意： 条件编译是利用注释实现的，在不同语法里注释写法不一样
	js使用 // 注释
	css 使用 /* 注释 */
	vue/nvue 模板里使用 <!-- 注释 -->；
	
不同平台下的特有功能，以及小程序平台的分包，都可以通过 pages.json 的条件编译来更好地实现。这样，就不会在其它平台产生多余的资源，进而减小包体积。

##使用代码块直接创建组件模板
###Tag代码块   （在 template 标签内输入代码块名回车）
	uButton
	uCheckbox
	uGrid
	uList
	uListMedia
	uRadio
	uSwiper

###JS代码块		（在 script 标签内输入代码块名回车）
	uRequest
	uGetLocation
	uShowToast
	uShowLoading
	uHideLoading
	uShowModal
	uShowActionSheet
	uNavigateTo
	uNavigateBack
	uRedirectTo
	uStartPullDownRefresh
	uStopPullDownRefresh
	uLogin
	uShare
	uPay
