# 前言
对于我，一个普通的前端开发而言，平日多数的工作模式就是使用框架封装好的API和第三方库，从后端获取到数据之后渲染到页面上，久而久之对于原生的JavaScript的熟练度越来越低，正好在去年还是前年就购入了广受好评的《JavaScript高级程序设计(第4版)》，索性按照书中的目录和纲领重新将原生JavaScript过一遍，然后在这个过程中会输出一些总结的笔记，毕竟最好的输入就是输出，这个还是有一定的道理的😄。

## 学习目的
1. 搞明白不会的知识
2. 巩固已经学会的知识

## 知识来源
对于学习的途径我个人认为可以是多样化的，不局限于知识来源的渠道，只要达到学习的目的即可，比如以下渠道都会是我学习的渠道，但总体是以书籍和MDN文档为纲领，以其余方式为辅助。这也就意味着你在其他地方看到过的对于某个知识点的描述也有可能出现在我这里，因为我的目的是学习知识不是搞创意比赛，如果有其他同学对于某个知识点总结的比我更加好更加全面，我会直接拿来为我所用。
+ 书籍《JavaScript高级程序设计(第4版)》
+ MDN官方文档
+ GitHub开源仓库
+ B站视频
+ 博客
+ 公众号
+ ...

## 大纲
目前的想法是将原生JS的学习分为两个方向同时去进行：
1. 按照《JavaScript高级程序设计(第4版)》为纲领对于基础知识点的进行系统性的学习，提升自己的知识储备，重点是打好基础
2. 另外一方面是对于核心API实现、高频面试题手写、常见组件封装等这类型题目的实现，重点以每日一题的形式输出

### 基础
1. JS发展历史及HTML中的script标签
2. 基础语法、变量、操作符、语句
3. 数据类型及其转换
4. 作用域和执行上下文
5. 垃圾回收机制
6. 数组
7. 对象
8. Map和WeakMap
9. Set和WeakSet
10. 面向对象、类和继承
11. 代理
12. 反射
13. 函数
14. 迭代器和生成器
15. Promise
16. BOM
17. DOM
18. 事件
19. 动画
20. HTML5+ Web Api
21. 错误处理
22. Ajax和Fecth
23. 客户端存储
24. 模块化规范
25. Web Worker

### 数组核心API的实现
1. forEach
2. map
3. filter
4. every
5. some
6. reduce
7. find
8. findIndex
9. fill
10. includes
11. join
12. flat
13. splice

### 对象核心API的实现
1. new
2. instanceof
3. keys
4. values
5. entries
6. fromEntries
7. is
8. assign
9. Object.create

### 函数核心API的实现
1. call
2. apply
3. bind
4. setTimeout实现setInterval
5. setInterval实现setTimeout
6. compose组合函数
7. curring函数柯里化
8. lazyMan惰性函数
9. partial偏函数
10. sleep函数
11. memorize缓存函数
12. onceFun 只执行一次的函数


### 字符串核心API的实现
1. slice
2. substr
3. substring

### JSON
1. JSON.stringify
2. JSON.parse
### 高频面试题
1. 原生Ajax封装
2. 防抖
3. 节流
4. 数组去重
5. 数组排序
6. 深拷贝
7. 浅拷贝
8. 继承
9. JSONP
10. each方法手写
11. 判断对象是否相等
12. 判断对象是否成环
13. 计算对象层数
14. 数组扁平化
15. 对象扁平化
16. a==1 && a==2 && a==3成立

### 手写实现功能
1. 打乱数组
2. 判断数据类型
3. LRU缓存算法
4. 发布订阅模式 事件总线
5. 观察者模式
6. DOM树和JS对象互转
7. 手写HTML Parser
8. 计算Local Storage总容量
9. 解析URL为键值对
10. 每隔1秒输出一个数字
11. 随机数和随机颜色值生成
12. 正则切分千分位
13. 对象数组去重
14. 大小驼峰转化
15. 求数组最值
16. 

### DOM经典实现
1. 图片懒加载
2. 超长列表渲染
3. 大文件上传






