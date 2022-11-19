/* 
    正则表达式的两大作用：
    1. 验证一个字符串是否符合我们预设的规则，这是正则校验的作用
    2. 将字符串中符合规则的部分捕获到，这是正则捕获的作用。

    类似于数组的find方法的作用，我不仅要知道你符合条件，还要准确的获取到那部分字符符合条件。下面详细说下正则捕获。

    ### 实现正则捕获的方法
    1. RegExp.prototype.exec方法
    2. RegExp.prototype.test方法

    3. String.prototype.replace
    4. String.prototype.match 类似于exec
    5. String.prototype.split
    6. String.prototype.search 类似于test


    ### 如何实现正则捕获

*/

// 1. 首先当前正则要跟当前字符串匹配，如果不匹配返回一个null
var str = "zhufeng2019yangfan2020qihang2021";
var reg = /^\d+$/;
console.log(reg.exec(str)); // null

/* 
    2. 如果匹配则返回一个数组，该数组的信息如下：
    数字第一项为本次捕获到的字符串内容
    后续多项为对应小分组中单独捕获到的内容
    index：为本次捕获到的字符串结果在原始字符串中的起始索引
    input：为原始字符串
*/
var str = "zhufeng2019yangfan2020qihang2021";
var reg = /\d+/;
console.log(reg.exec(str));

/* 
    3. 正则捕获exec方法的懒惰性
    正则的exec方法默认只能捕获到第一个符合正则规则的字符，其余的是捕获不到的
    而且无论执行多少次exec方法去捕获，得到的都是相同的结果

    那么该如何解决正则捕获的懒惰性呢？
*/

/* 
    4. 正则捕获懒惰性的原理
    在每一个正则实例对象上都有一个可读可写的属性lastIndex，这个属性非常重要，它用来指定当前正则下一次匹配的起始索引位置，默认情况下lastIndex总是为0.
    lastIndex属性的值默认情况下不会被改变，都是0，也就是每一次进行匹配的时候都是从字符串的开始位置进行匹配的。

    所以当我们第一次调用exec方法的时候，它的起始匹配位置为0，在匹配到第一个符合规则的字符串之后返回结果，此时当前正则对象的lastIndex并没有修改还是0
    然后开始第二次匹配，调用exec方法，它的起始匹配位置为0，在匹配到第一个符合规则的字符串之后返回结果

    综上所述，正则捕获之所以懒惰的原因就在于每一次匹配完成之后，不会自动将lastIndex的值修改为下一次匹配的起始索引位置，而是默认为0。
    而且默认的所有进行正则捕获的JS方法都遵循这个正则捕获懒惰性的机制。
    
*/
var str = "kelinlawu2021yangfan2022qihang2023";
var reg = /\d+/;
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ["2021"，index:+,...]
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ["2021"，index:9,...]

/* 
    5. 如何解决正则捕获懒惰性
    给正则加上修饰符全局匹配global,加上之后再每一次匹配完成之后，正则内部都会自动的跳转下一次匹配的起始位置
    
*/
var str = "kelinlawu2021yangfan2022qihang2023";
var reg = /\d+/g;
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ["2021"，index:9,...]
console.log(reg.lastIndex); // 13

console.log(reg.exec(str)); // ["2022"，index:20,...]
console.log(reg.lastIndex); // 24

console.log(reg.exec(str)); // ["2023"，index:30,...]
console.log(reg.lastIndex); // 34

console.log(reg.exec(str)); // null 代表已经全部捕获完成，此时会将lastIndex回归初始值0
console.log(reg.lastIndex); // 0 再次捕获，又开始循环捕获
console.log(reg.exec(str)); // ["2021"，index:9,...]

/* 
    6. 正则具有全局修饰符之后的注意问题
    只要一个正则具有g全局修饰符，那么每次执行匹配都会在内部移动lastIndex的指针
    所以下面这种捕获会得到意料之外的结果，问题就在于lastIndex的指针在执行test的时候就移动了
    所以下一次再进行匹配的时候，lastIndex的值已经变为下一次匹配开始的索引位置了
*/
var reg = /\d+/g;
var str = "kelinlawu2021yangfan2022qihang2023";
// 如果正则匹配成功
if (reg.test(str)) {
  // 获取正则捕获的结果
  let value = reg.exec(str)[0];
  console.log(value); // 你预设会得到第一次匹配的结果2021，其实会得到第二次匹配的结果2022
}

// 解决方法可以是将执行test的语句的reg复制一个：
if (/\d+/g.test(str)) {
  // 获取正则捕获的结果
  let value = reg.exec(str)[0];
  console.log(value); // 2021
}

/* 
    7. 实现一次捕获所有匹配的字符
    exec方法在实现捕获的时候，需要多次才可以将一个字符串中的结果匹配完成。
    我们需要实现一个方法execAll,执行一次就将所有字符进行匹配后放在数组中。
*/

RegExp.prototype.execAll = function (str = "") {
    const reg = this;
    // 如果reg没有g全局修饰符直接返回
    if(!reg.global){
        return reg.exec(str);
    }

    let res = [];
    // 首先捕获一次 看是否可以匹配成功
    let capture = reg.exec(str);
    // 如果捕获成功 继续捕获 知道捕获结果为null
    while(capture){
        res.push(capture[0]);
        capture = reg.exec(str);
    }
    return res.length ? res : null;
};
var reg = /\d+/;
var str = "kelinlawu2021yangfan2022qihang2023";
console.log(reg.execAll(str)); // [ '2021', '2022', '2023' ]

/* 
    8. 实现一次捕获所有匹配的字符
    字符串的match方法可以实现一次捕获所有匹配的字符，但是前提是正则必须用全局修饰符g
    如果没有g，那么和exec一样只执行一次懒惰捕获。
    
*/
var reg = /\d+/g;
var str = "kelinlawu2021yangfan2022qihang2023";
console.log(str.match(reg)); 

