## null和undefined的区别
1.值自身的含义不同
null代表空对象指针，一般都是人为的先赋值为null，然后在后续的程序中再次赋值
undefined代表未定义的值，一般都不是人为手动去赋值的，大部分都是在解析js代码的时候自主为空
2.在js中出现的场景不同
`null出现的场景`
当一个值是在未来会当做对象来存储数据而暂时又不想赋初始值的时候，多数情况下会给这个变量赋一个值为null
null被当做原型链的终端而存在

`undefined出现的场景`
当一个变量在声明之后未赋值的时候，该变量的值是undefined
当一个函数的形参没有接受到值的时候，该形参（变量）的值为undefined
当一个函数没有显式的return值的时候，调用该函数返回的结果是undefined
当访问一个对象上没有的属性的时候，该属性的属性值为undefined
在声明一个数组的时候，如果只给当前数组传入一个数值x，那么代表生成了一个length为x的数组，数组中的每一项值都是undefined
一个即未声明,又未赋值的变量,typeof的结果反而是undefined
已经声明未赋值,typeof的结果还是undefined

`var arr = new Array（10） 生成一个长度为10的数组，数组每一项都是undefined`
var arr = new Array(10,11) 生成一个长度为2的数组，数组为[10,11]
注意：在创建数组的时候new Array（）和Array（）的效果一样 new可以省略

3.数据类型不同
通过typeof来检测数据类型的时候，undefiend返回undefined；null返回object
注意：object操作符返回的值一定是字符串类型的

4.类型转化时不同
Number()转型函数 undefiend返回NaN null返回0
undefiend和null没有toString()方法，只可以调用String()转型函数