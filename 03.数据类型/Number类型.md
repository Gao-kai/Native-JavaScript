## Number类型值的范围
### 值的范围
由于计算机内存大小的限制，JS并不能表示这个世界上所有的数值，所以ECMA规定了可以在js中使用的值的最大和最小边界值，同时还给出了一些用于检测某个值是否处于安全边界的方法。

1. Number.MIN_VALUE
Number.MIN_VALUE表示JS中可以表示的最小的正值，注意是正值。也就是可能出现接近与0，但是不等于0.
在大多数浏览器中表示为5*10^-324，也就是5e-324

2. Number.MAX_VALUE
Number.MAX_VALUE表示JS中可以表示的最大的数值，由于是最大的值所以也是一个正值。
在大多数浏览器中表示为1.79 *10^308，也就是1.79e308
大于Number.MAX_VALUE的值表示为Infinity

### 整数的范围
上面说的是值的范围，值分为整数和小数两大类。
在ES6以前JS可以表示的最大整数和最小整数的值分别为：2^53和-2^53。超过这个范围，无法精确表示这个值。
在ES6之后新增了两个常量表示最大整数和最小整数，其分别为：
1. Number.MAX_SAFE_INTEGER 表示最大整数
2. Number.MIN_SAFE_INTEGER 表示最小整数

## Number.isInteger：判断一个数是否为整数
Number.isInteger()用来判断一个数值是否为整数。这个方法不是很精确，有以下几个注意点：
1. 如果被检测的值是非数字类型的值，直接返回一个false，不会发生数据类型的隐式转化，比如字符串'15'不会被转化为15

2. 如果被检测的值是浮点数，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。所以用此方法判断25和25.0都会返回true
```js
Number.isInteger(25) // true
Number.isInteger(25.0) // true
```

3. 由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
```js
Number.isInteger(3.0000000000000002) // true
```
总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

## Number.isSafeInteger：判断值是否为安全整数
Number.isSafeInteger()则是用来判断一个整数是否落在 Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这个范围之内。其主要用法如下：
1. 如果被检测的值是非数字类型的值，直接返回一个false，不会发生数据类型的隐式转化，比如字符串'15'不会被转化为15
2. 如果被检测的值是浮点数那么直接返回false。
3. 验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。


## Number类型强制转化规则
### Number()强制转型函数转基本类型值
1. 字符串类型
+ 如果该字符串为有效数字字符串，那么会转化为对应的数字表示。
+ 如果该字符串为空串或空格字符串' '，那么返回0
+ 如果该字符串中包含了非有效数字，比如字母、符号等会直接转化为NaN

2. 布尔值类型 true和false会被转化为1和0
3. Null类型 null直接会被转化为0
4. Undefined类型 undefined会被转化为NaN
5. Symbol类型 报错Uncaught TypeError: Cannot convert a Symbol value to a number

### Number()强制转型函数转引用类型值
一个引用类型的值转化为Number类型的值分为两步：
1. 先调用引用类型自身的toString方法将值转化为一个字符串，因为每个类上都有toString方法
2. 然后将上一步转化到的字符串使用Number转字符串的规则进行转化为数值

比如Array类型的数组转化为数值：
+ [] 空数组 先toString为空串'',然后空串转化为数值0
+ [1] 先toString为字符串'1',然后转化为数值1
+ ['a','b'] 先toString为字符串'a,b',然后转化为数值NaN

比如Object类型的对象转化为数值都会被转化为NaN，这是因为对象转toString的结果一定是'[object Object]',所以最后会返回NaN


## Number特殊值NaN
## isNaN方法
1. 特殊值NaN
NaN的意思是Not a Number，表示非数。它属于number类型，也就是typeof NaN返回'number'

2. NaN的检测方法
如果我们要判断一个值是否为NaN，那么可以使用全局的isNaN方法来实现。

3. isNaN语法
isNaN方法接收一个任意类型的值，返回一个布尔值。
true代表是一个NaN,false代表不是。

4. isNaN检测机制
isNaN检测分为两步走：
第一步：先调用Number()强制转型函数转化为Number类型
第二步：调用方法检测后返回结果
## isFinite方法
全局上的isFinite()用来判断一个值是否为有限的，这个方法的用法很简单。
对于非数值类型的值会先调用Number转化为数值，然后进行判断。判断的依据是如果值为有限的就返回true，否则返回false。


## 全局和Number区别
ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
ES6将isNaN、isFinite、parseInt等方法都迁移到了Number对象上，行为保持不变，这样做的目的就是逐步减少全局性方法，让语言逐渐模块化。

但是需要注意的是：传统的全局方法比如isNaN、isFinite会先调用Number转型函数将被检测的值转化为数字类型的值，然后进行判断，而对于Number对象上的isNaN、isFinite方法更加具体，对于被检测的值不为数字的直接返回flase，不会进行转化。

举一个很有意思的例子:
```js
isNaN('NaN') // true

Number.isNaN('NaN') // false
```
第一个由于发生了转型函数，会将字符串'NaN'转化为数字NaN，最后返回true
第二个由于不会转型，检测为字符串后直接返回false