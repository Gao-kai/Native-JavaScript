## 题目
这是一道十分经典的面试题，题目的要求是：
```bash
假设页面上有 5 个li 节点，我们通过循环来给每个 li 绑定 onclick 事件，按照索引顺序，点击第 1 个 li 时弹出0，点击第 2 个 li 时弹出 1，以此类推。请你尽可能想出多种方案实现。
```

首先我们来看下错误示范，以下这种写法会导致点击任意一个li都会输出5：
```js
let liEls = document.querySelectorAll('li');
for (var i = 0; i < liEls.length; i++) {
	liEls[i].onclick = function(){
		console.log(i);
	}
}
```
分析其根本原因，其实就是var声明的变量是全局变量，全局变量一开始的值是0，由于for循环是同步执行的，在for循环结束之后给每一个li元素都绑定了事件处理函数，但是在事件触发之后，事件处理函数执行的时候去读取全局变量i的值将会是5，i循环5次执行5次i++，所以点击每一个li都输出5.

要解决这个问题，我们就需要让i变为局部变量，让li绑定的事件处理函数在执行时查找到的变量i的值是局部变量而不是全局变量。

### 1. let形成块级作用域
```js
let liEls = document.querySelectorAll('li');
for (let i = 0; i < liEls.length; i++) {
	liEls[i].onclick = function(){
		console.log(i);
	}
}
```

### 2. li元素 添加自定义属性
```js
let liEls = document.querySelectorAll('li');
for (var i = 0; i < liEls.length; i++) {
	liEls[i].index = i;
	
	liEls[i].onclick = function(){
		console.log(this.index);
	}
}
```

### 3. 立即执行函数
```js
let liEls = document.querySelectorAll('li');
for (var i = 0; i < liEls.length; i++) {
	(function(index){
		liEls[i].onclick = function(){
			console.log(index);
		}
	})(i);
}
```

### 4. 闭包
```js
let liEls = document.querySelectorAll('li');
for (var i = 0; i < liEls.length; i++) {
	liEls[i].onclick = (function(index){
		return function(){
			console.log(index);
		}
	})(i);
}
```

### 5. forEach.call
```js
let liEls = document.querySelectorAll('li');
[].forEach.call(liEls,(el,index)=>{
	el.onclick = function(){
		console.log(index);
	}
})
```