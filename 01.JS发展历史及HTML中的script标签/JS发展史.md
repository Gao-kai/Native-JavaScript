## JS发展史概述
1. 1995年，网景公司(浏览器厂商)的工程师Brendan Eich在为这家公司即将上市的Netscape Navigator2(网景浏览器2)开发了一个叫做LiveScript的脚本语言，一开始他是计算将这个脚本语言在客户端和服务端都使用，在服务端叫做LiveWire。之所要开发这个脚本语言，当时是为了处理网速缓慢，用户在每次提交表单后需要等待很长时间才可以返回结果的问题，如果有一个可以在提交表单之前就验证表单输入框内容的语言，就可以让用户将一个表单只提交一次就可以了，不必为了一个表单提交多次等待超长时间。

2. 为了赶上发布时间，推动项目进度。网景公司和当时的sun公司一起进行开发，而且为了蹭当时Java这门语言的热度，网景公司决定在Netscape Navigator2发布前将预先定好的LiveScript改名为JavaScript，所以在1995年JS就正式诞生了，但是它本质和Java没有半毛钱关系。

3. Netscape Navigator2浏览器推出市场之后广受好评，随后网景公司又推出了Netscape Navigator3版本浏览器并将JS的版本从1.0升级到了1.1，注意在这时还没有IE和后来的ECMA-262什么事，就是网景公司在一个人秀。

4. 但就在Netscape Navigator3发布后不久，IE3横空出世包含了名为JScript的JavaScript实现，就是说IE3这个浏览器也可以做到和网景浏览器一样的可以解决用户提交表单时间过长的这个痛点。紧接着，1996年，微软全面进军Web浏览器领域，你说你一个做操作系统的你跑来做浏览器还做的那么垃圾，再次鞭尸IE！

5. 由于IE进入Web浏览器市场之后，市场中就存在了两个JavaScript的实现了，一个是网景的JavaScript，一个是IE的JScript。由于此时JavaScript还没有一个规范其语法和特性的标准，所以JS就踏上了标准化之路。

6. 时间来到1997年，JavaScript1.1作为提案提交至*欧洲计算机制造商协会(简称ECMA)*，而该协会中的第39号技术委员会(简称TC39)承担着标准化一门通用、跨平台、厂商中立的脚本语言的任务，TC39的成员来自网景、微软、sun等公司的工程师组成，他们这些人在一起就是为了做一件事：打造出了ECMA-262,也就是ECMAScript这个新的脚本语言标准。

7. 1998年，ECMAScript经过国际标准化组织认证，自此以后各浏览器厂商都将ECMAScript当做标准，而各浏览器的JavaScript则是ECMAScript的实现。

8. 各浏览器的JavaScript实现都是以三大模块组成的：ECMAScript、BOM、DOM

## ECMA各版本发展史
1. ECMA-262 3.0的发布，标志着ECMAScript成为了一门真正的编程语言
2. ECMA-262 4.0 由于改动太大 被废弃，所以推出了3.1版本
3. ECMA-262 3.1 由于4.0版本被废弃，所以这个ECMA-262 3.1就成了第五个版本，也就是ES5。这个版本主要是厘清了ES3.0存在的一些歧义，增加了协议和序列化JSON对象的功能，方便继承和高级属性定义的方法，以及严格执行代码的严格模式。
4. ECMA-262第六个版本，简称为ES6，可以叫做ES2015。是2015年6月发布的新版本，这一版本新增的内容很多，主要包括：
类 模块
迭代器
生成器
箭头函数
Promise
反射
代理
新的数据类型
新的变量声明等

5. ECMA-262第7个版本，简称为ES7。主要新增数组的includes方法和指数操作符。
6. ES8新增异步函数async/await以及Atomics API，以及Object.values() entries getOwnPropertyDescriptors和字符串填充方法
7. ES9新增异步迭代，剩余和拓展属性，Promise.finally()等
8. ES10新增数组的flat/flatMap，字符串的trimStart/trimEnd，Object.fromEntries(),明确定义了一个Function.prototype.toString()的返回值等

## DOM各版本发展史

DOM是一个应用程序接口，主要用于在HTML中使用拓展的XML，DOM将页面抽象为一个个的节点，每个节点都保存不同的数据。DOM是一套可以增删改查HTML或者XML页面的API接口。
DOM的标准是由W3C指定的，一开始也是由于网景和IE支持不同形式的DHTML(动态HTML)，首先可以做到不刷新网页的情况下可以修改网页外观和内容，问题是如果不统一的话，开发人员就得针对不同的浏览器写多个HTML页面。
1. DOM0级标准 
其实压根没有这个标准 就是最早的DHTML 可以实现修改网页外观而不刷新网页

2. DOM1级标准 
W3C于1998年制定的标准，由两个模块组成DOM Core以及DOM HTML。DOM核心主要提供了一种映射的XML文档，从而可以方便的去操作页面文档任意部分；DOM  HTML拓展了前者，并增加了特定于HTML页面的对象和方法。DOM1主要还是映射文档结构，便于去修改文档操作文档。

3. DOM2级标准 这一版的标准增加了很多模块
DOM视图：比如新增 应用CSS样式前后的文档的接口
DOM事件：新增描述事件和事件处理的接口
DOM样式：描述处理元素CSS样式的接口
DOM遍历：新增遍历和操作DOM树的接口

4. DOM3级标准 DOM Core支持了所有XML1.0的特性
目前，已经不再以等级来维护DOM了，但是新增的DOM还是称为DOM4.0 新增了Mutation Event中的Mutation Observers，在微任务中看到过此概念。

除了W3C发布的DOM Core和DOM HTML之外，也有其他语言也发布了自己对于DOM的标准。比如可伸缩矢量图（SVG）也是基于XML的，但是该语言也增加了独有的DOM方法和接口

## BOM发展简史
BOM并没有一个标准的，但是自从HTML5出来之后，许多BOM相关的兼容性问题都就解决了。BOM主要包含以下部分：
+ 弹出新窗口的接口
+ 移动缩放和关闭浏览器窗口的接口
+ navigator对象，包含浏览器相关信息
+ location对象，包含url地址相关信息
+ screen对象，包含用户屏幕相关信息
+ performance对象，提供浏览器内存占用、导航行为和时间统计的相关信息
+ 对cookie的支持
+ XMLHttpRequest对象