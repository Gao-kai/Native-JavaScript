/* 
   ^和$：可以看做对正则的一个修饰或者声明，不会占据字符串的位置
*/

// ^:匹配的目标字符串必须以0-9中的数字开头
var reg = /^\d/;
console.log(reg.test('996')) // true
console.log(reg.test('LOL996')) // false

// $:匹配的目标字符串必须以0-9中的数字结尾
var reg = /\d$/;
console.log(reg.test('996LOL')) // false
console.log(reg.test('LOL996')) // true

// ^和$都不加：匹配的目标字符串只要包含符合规则的内容即可，是includes的关系,如果我们只是简单的要实现includes的功能也就是字符串中包含某个子串，那么就可以^和$都不加
var reg = /\d/;
console.log(reg.test('996LOL')) // true
console.log(reg.test('LOL996')) // true

// ^和$都加：匹配的目标字符串必须是和规则一致的内容，比如电话号码比如1开头后面10位数字并且总计11位
var reg = /^\d+$/; // 只能是1到多位数字
console.log(reg.test('996L886')) // false
console.log(reg.test('LOL996')) // false

// 最简单手机号码正则：只能以1开头后面为10位数字，如果写下面这样：虽然13830230666可以校验成功但是13888889999A这种末尾带有字符的也可以匹配成功，所以一般开发中你要校验的某个字符串必须符合一个规则的话，一般要加^和$来进行约束。
var phoneReg = /^1\d{10}/;
console.log(phoneReg.test("13830230666"));
console.log(phoneReg.test("13888889999A"));


var phoneReg = /^1\d{10}$/;
console.log(phoneReg.test("13830230666"));
console.log(phoneReg.test("13888889999A"));// null

/* 
  转义字符：\
*/
// 由于.在正则中有特殊含义，代表匹配除了\n换行符之外的任意单个字符,所以下面四个正则都是可以匹配成功的：
var reg = /^2.3$/;
console.log(reg.test("283"));
console.log(reg.test("2?3"));
console.log(reg.test("2.3"));
console.log(reg.test("2W3"));

// 但是如果2和3之间没有字符，那么匹配失败。因为.代表一个字符，但是你必须得有字符。
console.log(reg.test("23")); // false
console.log(reg.test("23")); // false

// 如果我们只想匹配字符串"2.3"，那么就应该对.进行转义,让.回归最初的含义小数点：
var reg = /^2\.3$/;
console.log(reg.test("2.3")); // true
console.log(reg.test("2@3")); // false

// 写一个正则匹配下面这个字符串 
var str = "\\d"; 
var reg = /^\\d$/; // 代表匹配字符串"\d",把特殊符号\d(代表数字)转化为普通字符
console.log(reg.test(str)); // false

// 字符串中出现反斜杠也有特殊含义，比如：
var s = "你好\n同学"; // 在控制台打印结果是你好 接着换行 同学
var s = "你好\\n同学"; // 打印结果为 " 你好\n同学"

/* 
  x|y
*/

// 正则x|y中的x和y如果都是一位字符，那么意思就是匹配x或者y，但如果x和y为多位数，那么匹配规则就大为不同：
var reg = /^18|29$/;

// 表示匹配18或者29
console.log(reg.test("18"));
console.log(reg.test("29"));

// 表示匹配以1开头以9结尾，中间为8或者2的字符
console.log(reg.test("129"));
console.log(reg.test("189"));

// 表示匹配以18开头或者以29结尾的字符,只要满足一个就匹配成功
console.log(reg.test("1829"));
console.log(reg.test("829")); // 以29结尾
console.log(reg.test("182")); // 以18开头

// 由上面的匹配结果可知，单独写x|y这种语法会存在很乱的优先级问题，所以我们写的时候一般都会采用小括号进行分组，因为小括号可以改变正则处理的优先级。
// 这也是分组的第一个作用，改变默认优先级，比如下面几个例子：

// 表示只能匹配字符串18或者字符串19
var reg = /^(18|29)$/; 
console.log(reg.test("18"));
console.log(reg.test("29"));
console.log(reg.test("129")); // false

// 表示只能匹配以1开头以9结尾，中间为8或者2的字符串
var reg = /^1(8|2)9$/; 
console.log(reg.test("18")); // false
console.log(reg.test("129"));
console.log(reg.test("189"));

// 表示只能匹配以18开头或者以29结尾的字符 
var reg = /(^18)|(29$)/;
console.log(reg.test("89")); // false
console.log(reg.test("189"));
console.log(reg.test("1829"));
console.log(reg.test("829")); // 以29结尾
console.log(reg.test("182")); // 以18开头


/* 
  [abc]
  [^\d]
  [a-z]
*/

// 1. 中括号中出现的字符一般都代表本身的含义,比如下面这个[@+]中的+号不代表@符号出现一次到多次，而是代表其自身含义，也就是加号自己。

// 匹配以@符号或者+号出现1到多次的字符
var reg = /^[@+]+$/;
console.log(reg.test("@@")); // @符号出现了2次
console.log(reg.test("@+")); // @出现一次符合，+号也出现一次符合。

// 匹配以@符号或者+号，只出现一次的字符,+号只代表自身意思+号
var reg = /^[@+]$/;
console.log(reg.test("@@")); // false
console.log(reg.test("@")); // true
console.log(reg.test("+")); // true

// 2. 中括号中出现\d还是表示0-9之间的一个数字字符，这是特殊情况,
var reg = /^[\d]+$/;
console.log(reg.test("\\")); // false
console.log(reg.test("d")); // false
console.log(reg.test("996")); // false
console.log(reg.test("8")); // true

var reg = /^[\\d]+$/;
console.log(reg.test("\\")); // true
console.log(reg.test("d")); // true
console.log(reg.test("996")); // false
console.log(reg.test("8")); // false

// 3. 中括号中不存在多位数
// 中括号中的18代表匹配1或者8，而不能匹配多位数18
var reg = /^[18]$/;
console.log(reg.test("1")); 
console.log(reg.test("8")); 
console.log(reg.test("18")); // false

// 代表匹配字符1、字符0-2或者字符9，而不是匹配10-29这个区间的值
var reg = /^[10-29]$/;
console.log(reg.test("10")) // false
console.log(reg.test("29")) // false
console.log(reg.test("1"))
console.log(reg.test("0"))
console.log(reg.test("9"))
console.log(reg.test("8")) // false

var reg = /^(1|2)\d{1}$/;
console.log(reg.test("10"))
console.log(reg.test("29"))