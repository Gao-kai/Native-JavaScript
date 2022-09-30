## script标签属性
script标签没有必选属性，所有的8个属性都是可选的。
### 1. type 表示代码块中脚本语言的内容类型(也可以称作MIME类型)
script标签的type值一般情况下都是text/javascript
如果type值是module，那么代表当前的script中的代码是一个ES6的模块，只有当type值为module的时候才可以在代码中写export和import关键字，否则会报错，因为浏览器并不能正确解析export和import。日常项目中可以用那是因为有webpack这样的工具将ES6编译成了ES5浏览器可识别的代码。

但是如果在HTTP数据传输中服务器返回了一个js文件，那么这个js文件本身的MIME类型也就是content-type属性是application/x-javascript,这一点需要注意。

### 2. src 表示要执行的外部文件路径 
基于src属性可以实现动态插入js脚本，这也是JSONP可以解决跨域的基础

### 3. async 表示异步执行脚本 window.onload之前执行此脚本
+ async的意思是异步，告诉浏览器遇到当前脚本可以异步下载并开始执行，不要阻塞DOM的解析
+ async脚本的执行顺序是无序的，因为async异步就是并行执行任务，多个带有async属性的脚本执行结束的先后顺序是无法确定的
+ async属性的脚本一定会在onload事件触发之前执行，而onload事件触发的时机是当前文档中所有资源都已经加载完毕之后触发。
+ async属性的脚本不确定是否可以在DOMContentLoaded事件触发之前或者之后执行


### 4. defer 表示延迟执行脚本 DOMContentLoaded之前执行此脚本
+ defer的意思是延迟，告诉浏览器遇到当前脚本可以先发起请求下载脚本，但是遇到延迟等到DOM解析完成到DOMContentLoaded事件触发之前的这个时间段执行；
+ 多个defer脚本一定会在DOMContentLoaded之前执行，并且执行顺序严格遵守标签书写的先后顺序来执行

### 5. nomodule属性
nomodule属性明确的告诉浏览器，如果当前浏览器支持ESModule，那么请不要执行此脚本。
nomodule属性最大的作用是在不支持ESModule的低版本浏览器中提供回退脚本。

### 6. referpolicy属性
referpolicy属性表示当前脚本的引用来源策略，主要的作用就是当客户端向服务器发起下载此脚本的请求时，请求头部中的Referer字段应该展示什么值。
关于referpolicy策略的详细文章请移步浏览器安全之Referer Policy策略。

## 内联脚本和外部脚本
### 1. 内联脚本
+ 直接在script标签内部写js代码
+ 内联脚本内部不能再出现'</script>'字符串，因为浏览器会将其当做闭合标签去解析，如果一定要用，那么需要使用转义符'<\/script>'

### 2. 外部脚本
+ 将写好的.js文件通过src属性引入到当前HTML页面中，外部脚本的可维护性高，并且支持浏览器缓存cache，避免每次请求对页面造成延迟。
+ 要插入外部脚本，必须声明src属性，并且该src属性的属性值是一个URL地址，指向包含js代码的文件路径。如果一个script标签已经指定了src外部脚本的路径，那么在该标签内部不应该再写js代码，如果一定要写，那么浏览器也只会下载并执行外部的js文件，内部的代码会被忽略。
+ script标签的src属性的值可以是一个完整的url地址，而且这个URL指向的资源可以跟当前包含此标签的HTML页面不同源，也就是可以跳出浏览器的同源策略去访问其他站点的资源，基于这个特性可以处理类似于JSONP跨域的问题。

### 相同点
1. 都会阻塞页面加载
不管是内联脚本还是外部脚本，都会阻塞页面的加载。而且如果是外部脚本，浏览器还需要先在网络进程中下载，下载完成之后立即执行js代码，执行完成之后才进行后续的页面渲染，所以script脚本会阻塞页面加载。

2. 按照顺序执行（默认为非async脚本）
浏览器会按照script标签在页面中出现的顺序依次执行他们，并且只有在上一个script标签包含的js代码执行完毕之后才会下载执行下一个script中的代码，依次类推。除非是给每个script标签添加了async属性
## script标签书写位置最佳实践
### 1. 放在head标签中：阻塞
直接将所有脚本放在head标签中，可以直观的看到所有从外部加载的css资源和js资源。但是缺点是当浏览器在解析HTML的时候遇到script标签，就会阻塞。因为需要先等待脚本下载然后执行完毕，才可以继续进行HTML解析。

如果在head头部的多个脚本资源那么就会导致页面渲染DOM的明显延迟，从而出现白屏。

### 2. 放在body最底部
为了解决上面这个脚本阻塞的问题，我们可以将所有脚本都放在body的最后一行，这意味着浏览器一定会在解析完DOM之后再来加载脚本并执行。

而且这样做的好处是避免了在解析DOM的过程中有JS会动态的去修改了DOM结构，从而引起DOM的重绘。

### 3. 最佳实践
1. defer属性
将所有脚本资源和css外部资源都写在head头部，但是需要给所有脚本都加上defer标签，这样也可以保证在不阻塞DOM解析的前提下让脚本延迟执行。

2. 监听window.onload事件(DOM0级事件)
在script标签的第一行使用window.onload事件，当页面中的所有资源都加载完成之后，才会开始执行事件回调函数的js代码。此事件所有浏览器都支持。
```
window.onload = function(){
	// 此时全部资源包含图片、css文件等都加载完成
}

```

3. 监听DOMContentLoaded事件
在script标签的第一行声明DOMContentLoaded事件，DOMContentLoaded 事件在 html文档加载完毕，并且 html 所引用的内联 js、以及外链 js 的同步代码都执行完毕后触发。
此事件IE8以下不支持，但是IE8以下支持onreadystatechange事件，该事件的目的是提供一个与文档的加载状态有关的信息。
```
document.addEventListener('DOMContentLoaded',function(){
	// 此时DOM树已经加载完成
})
		
```

4. 使用Jquery库中的ready方法
当我们引入了JQuery库的时候，可以在script标签中包含的js文件第一行声明：
```js
$(document).ready(function(){
	// 此时DOM树已经加载完成，ready这个事件的本质就是监听DOMContentLoaded事件
	
})
```

## 手写JQuery的ready方法(DOM加载完成事件)
基于addEventListener的DOMContentLoaded事件触发
在IE下基于document.onreadystate属性为complete来判断DOM加载完成
```js
JQuery的$(document).ready(function(){})事件内部逻辑

@params fn 页面加载完成之后调用的启动函数
@retrun 无 只调用函数，无输出

function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			// 当DOM加载完成之后，先移除此事件，并且接着执行传入的函数
			document.removeEventListener('DOMContentLoaded',arguments.callee,false);
			fn();
		},false)
		return;
	}
	// 如果在IE浏览器中
	if(document.attachEvent){
		document.attachEvent('onreadystatechange',function(){
			// 当readystate的值为complete的时候，代表DOM加载完成，此时移除事件且执行函数
			if(document.readystate=='complete'){
				document.detachEvent('DOMContentLoaded',arguments.callee);
				fn();
			}
		})
		return;
	}
}

ready(init);

function init(){
	getIndexData(); // 获取首页数据
	handleData();   // 操作数据，渲染DOM等 
	...
}
```
## JSONP的实现
```js
function JSONP(options){
	// 1.获取随机数
	let randomValue = Date.now();
	let callbackName = options.callbackName + randomValue;
	
	// 全局挂载 用于接收回调参数
	window[callbackName] = function(data){
		if(data.status == 200){
			option.success(data);
		}else{
			option.fail({
				errCode:data.status,
				errMsg:data.message
			});
		}
		
		window[callbackName] = null;
		document.body.removeChild(scriptEl);
	}
	
	// 获取参数
	let queryString = "";
	if(options.params){
		let arr = [];
		for(let key in options.params){
			arr.push(`${key}=${options.params[key]}`)
		}
		queryString = arr.join("&");
	}
	
	// 挂载一个动态脚本
	const scriptEl = document.createElement('script');
	scriptEl.src = `${options.url}?callbackName=${options.callbackName}&${queryString}`
	options.async = false;
	document.body.appendChild(scriptEl);
}

JSONP({
	url:"https://api.github.com/users/Gao-kai",
	params:{
		demo:111
	},
	callbackName:'getUserInfo',
	success:(data)=>{
		console.log(data);
	},
	fail:(err)=>{
		console.eror(err.msg);
	}
	
});

```