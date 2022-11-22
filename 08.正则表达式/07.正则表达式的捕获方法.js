/* 
    1. macth方法只可以获取大正则的捕获结果，拿不到每一个分组小正则的捕获结果
    2. exec方法可以结合全局匹配修饰符和while循环实现大正则和分组小正则的捕获结果
*/

/* 
    3. test方法除了正则校验，其实可以搭配正则对象的$1-$9属性来获取捕获的结果
    RegExp.$1-$9:该特性是非标准的，请尽量不要在生产环境中使用它！
    非标准**$1, $2, $3, $4, $5, $6, $7, $8, $9** 属性是包含括号子串匹配的正则表达式的静态和只读属性。
    这种方法只能获取当前正则匹配之后，第一个到第九个分组的信息。

    RegExp.$1默认情况下全局只要一个，会轻易的被其他正则捕获所修改，所以不要使用这个属性。
*/
var str = "{2022}年{11}月{20}日";
var reg = /\{(\d+)\}/g;
console.log(reg.test(str));
console.log(RegExp.$1); // 2022

console.log(reg.test(str));
console.log(RegExp.$1); // 11

console.log(reg.test(str));
console.log(RegExp.$1); // 20

console.log(reg.test(str)); // false
console.log(RegExp.$1); // 20 可见匹配完成之后，再去进行捕获只能得到上次捕获的结果

/* 
    字符串替换方法：str.replace(regexp|substr, newSubStr|function)方法

    1. 第一个参数可以是一个字符串也可以是一个正则：
    如果是一个字符串，那么代表即将被newSubStr替换的字符串，这种情况下只有第一个匹配项会被替换，后面的不再替换
    如果是一个正则，那么该正则匹配到的字符串内容会被第二个参数的返回值替换掉。
    在进行全局的搜索替换时，正则表达式需包含 g 标志。加了g之后，会将所有匹配项都进行替换。
    
    2. 第二个参数可以是一个字符串也可以是一个函数
    如果是一个字符串，用于替换掉第一个参数在原字符串中匹配到的字符串该字符串中可以内插一些特殊的变量名.$1、$2、$3

    如果是一个函数，那么这个函数是用来创建新字符串的函数，它的返回值将替换掉第一个参数匹配到的结果。
    另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。
    此函数的参数为：
    + match 匹配的子串
    + p1,p2, ... 假如 replace() 方法的第一个参数是一个RegExp 对象，则代表第 n 个括号匹配的字符串。

    + offset 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）
    + string 被匹配的原字符串

    3. 返回值一定为部分或全部被替换掉的新的字符串。
    4. 此方法不改变原始字符串。

*/

/* 
    需求一：将Hello字符串替换为中文=> "你好"
*/
var str = "Hello 2022,Hello World";

// 1. replace方法的pattern匹配模式为字符串：需要执行两次
var res = str.replace("Hello", "你好").replace("Hello", "你好");
console.log(res); // 你好 2022,你好 World

// 2. replace方法的pattern匹配模式为正则，加了全局修饰符一次就搞定：
var res = str.replace(/Hello/g, "你好");
console.log(res); // 你好 2022,你好 World

/* 
    需求二：将Hello字符串替换为=> "Hello 你好"
*/
var str = "Hello 2022,Hello World";

// 使用字符串模式无法实现：会出现将第一次替换的Hello又进行替换的情况
var res = str.replace("Hello", "Hello 你好").replace("Hello", "Hello 你好");
console.log(res); // Hello 你好 你好 2022,Hello World

// 使用正则匹配可轻松实现 因为正则将匹配过的不会重复匹配
var res = str.replace(/Hello/g, "Hello 你好");
console.log(res); // Hello 你好 2022,Hello 你好 World

/* 
    案例三：处理时间字符串
    将一个字符串："2022-11-20" 转化为 "2022年11月20日"
*/
var date = "2022-11-20";

// 使用正则模式匹配,写一个完全匹配于字符串的正则，只执行一次匹配
var reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
// replace的第二个参数是函数，字符串被匹配几次函数就会执行几次，并且会在执行的过程将若干参数传递给函数
var res = date.replace(reg, (match, p1, p2, p3) => {
  console.log(match, p1, p2, p3); // 2022-11-20 2022 11 20
  return `${p1}年${p2}月${p3}日`;
});
console.log(res); // 2022年11月20日

/* 
    将一个字符串中所有单词的首字母大写
    得到单词
    再拿到单词里面的首字母
*/
let str = "good good study,day day up!";
// /b/b匹配一个单词边界，两个单词边界包裹的就是单词
var reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;

// [ 'good', 'good', 'study', 'day', 'day', 'up' ]
// match方法可以获取全局匹配中每一次匹配的大正则的结果，但是不能获取分组捕获的信息
console.log(str.match(reg));

// exec方法可以获取第一次匹配的详细信息，包含分组信息，但是具有懒惰性，只能匹配第一次
console.log(reg.exec(str));

var res = str.replace(reg, function (match, ...args) {
  console.log("成功匹配一次，匹配的结果是", match, args);
  let firstChar = args[0].toUpperCase();
  let content = match.substring(1);
  console.log("本次匹配之后替换的字符串是", firstChar + content);
  return firstChar + content;
});
console.log(res); // Good Good Study,Day Day Up!

/* 
    replace的强大之处：不仅可以基于全局修饰的g进行多次捕获，而且可以将每一次匹配到的大正则和小分组的捕获结果传递给函数参数
    而且还可以进行替换，局部替换和全局替换都可以完成
*/
