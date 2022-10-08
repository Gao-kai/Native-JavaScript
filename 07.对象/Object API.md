### Object.is(value1,value2)
Object.is(value1，value2)方法用于判断两个值是否为同一个值
该方法接收两个比较的值，返回一个布尔值。

该方法返回值为true的情况有：
两个值都是undefined
两个值都是null
两个长度和顺序一致的字符串
两个值都是true或者都是flase

一：注意在引用类型的值比较的这块：（本质是判断引用地址是否相等）

1.因为两个对象在内存中的引用地址不同，指向不同的引用地址
var a = { b:1};
var b = { b:1};
console.log(a==b,a===b); 返回false false
console.log(Object.is(a,b)); false

2.引用类型的赋值是将栈内存中的引用地址进行复制，所以两个对象指向同一堆内存
var a = {b:1};
var c = a;
console.log(a==c,a===c); 返回true true
console.log(Object.is(a,c)); true

二：注意在数字类型比较的这块，和以前有很大不同

通过相等符号==或者全等符号===进行判断的时候：
0和+0 -0 三者怎样判断 都是true
NaN由于和任何值进行运算都会返回自身NaN，所以NaN === NaN是false

但是通过Object.is()方法判断的时候
只有+0和+0；-0和-0；0和0；0和+0 这四个是true
两个NaN返回的结果是true
由于0/0返回NaN，所以NaN和0/0判断也返回true