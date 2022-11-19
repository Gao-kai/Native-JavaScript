/* 
    目的：
    1. 自己可以写出来
    2. 看别人写的可以看得懂
*/

/* 
    1.验证是否为有效数字
    首先要明白规则，也就是规则分析，首先要搞明白什么是有效数字：
    + 开头可以是正号也可以是负号也可能不出现，如果出现只能出现一位，比如0，+9，-5，但是不能是+-8
    + 如果数字长度只有1位，那么0-9都可以；如果是多位，那么首位不能是0.比如可以是9，但是不能写09
    + 小数点可能有可能没有，一旦有后面必须有数字，也就是可以是1.2，但是不能只有1.这种

    思路：
    1. 按位写，每个元字符占一个位，加上量词才拓展到多位,因为正则匹配顺序就是从左到右
    2. 分组思路很重要

    分析：
    1. +号或者-号可能出现0次或者1次，表示0次或者1次的量词元字符是?
       而表示+号或者-号的或者关系可以使用(+|-) 也可以使用[+-]，所以第一部分匹配正负号的正则是: [+-]?

    2. 后面的整数部分首先是一个或关系，如果是个位可以是0-9，所以 \d即可，它就代表只能匹配一位数字
       如果是多位数，那么开头不能是0，那就是必须第一位是1-9,并且后面至少有1位或多位，[1-9]\d+
       综合起来就是：(\d|([1-9]\d+))

    3. 小数部分可能有可能没有，那么用量词?表示出现次数。如果有，那么后面必须有1位或者多位数字。
       这里需要对小数点进行转义所以得出：(\.\d+)? 小数点部分可以有可以没有，如果有后面数字必须是多位。 
*/

var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;
console.log(reg.test("08")); // false
console.log(reg.test("+8"));
console.log(reg.test("-9"));
console.log(reg.test("850"));
console.log(reg.test("1.3"));
console.log(reg.test("1."));  // false


/* 
    2. 验证密码

    规则分析：
    1. 密码的组成必须是数字、字母和下划线
    2. 密码的长度需要是6-16位

*/
var reg = /^(\w){6,16}$/;
var reg = /^[0-9a-zA-Z_]{6-16}$/;


/* 
    3. 验证真实姓名

    1. 验证汉字的正则表达式：/^[\u4e00-\u9fa5]$/
    2. 姓名长度为2-10位
    3. 可能有中文译名 
        比如：尼古拉斯·赵四
        比如：弗拉基米尔·弗拉基米洛维奇·普金

    那么就是说如果出现·，那么后面一定有2-10位汉字；并且.汉字这种可能出现0次、1次或两次 (·[\u4e00-\u9fa5]{2,10}){0,2}
    (·[\u4e00-\u9fa5]{2,10})这个是一个分组，表示.汉字的组合，整体这个组合可能出现0、1、2次
    如果是0次，那就是普通的中文名，比如 张三,后面没有点

*/

var reg = /^[\u4e00-\u9fa5]{2,10}(·[\u4e00-\u9fa5]{2,10}){0,2}$/;

/* 
    4. 验证邮箱

    规则解析和思路：匹配一个字符串是否为邮箱，首先可以简单的分为@符号前面和后面两部分去匹配。

    1. @符号前面，邮箱的开头必须得是数字、字母和下划线。
        后面的字符除了可以是数字、字母下划线之外，还可以是中横线和点。
        但是中横线和点要么不出现，一旦出现后面必须跟数字字母下划线
        并且中横线和点不能连续出现。
    比如：gaokai@qq.com gao-kai@qq.com gao.kai@qq.com
    根据以上这部分可以写出：/^\w+((-\w+)|(\.\w+))*$/

    2. @符号后面紧跟着的一定是数字、字母，并且可以是一位到多位。
    
    gaokai@qq.huawei.office.com
    gaokai@qq-huawei-office.cn.vip

    /[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*(\.[a-zA-X0-9])+/

    [a-zA-Z0-9]+ 匹配一位或多位数字或者字母,也就是@后面的qq
    ((\.|-)[a-zA-Z0-9]+)* 匹配.或者-后面跟着1位或多位数字字母的字符，可能出现0次或多次，也就是.huawei.office，-huawei-office
    (\.[a-zA-Z0-9])+ 匹配.后面跟着一位数字或者字母，但是整体会至少出现一次，匹配末尾的域名或者多级域名.com或者.cn.vip
*/

var emailReg = /^\w+((-\w+)|(\.\w+))*@[0-9a-zA-Z]+((\.|-)[0-9a-zA-Z]+)*(\.[0-9a-zA-Z]+)$/;
console.log(emailReg.test("demo@qq.com"));
console.log(emailReg.test("gao-kai@qq.com"));
console.log(emailReg.test("gao.kai@qq.com"));
console.log(emailReg.test("gaokai@qq.huawei.office.com"));
console.log(emailReg.test("gaokai@qq-huawei-office.cn.vip"));


/* 
    5. 中国居民身份证
    
    规则：
    1. 总18位，前17位必须为数字，最后一位可能是大写的X
    2. 身份证号码前6位是省市区(县)
    3. 身份证中间8位是年月日
    4. 身份证最后四位，倒数第二位偶数是女，奇数是男

    一般情况下我们身份证的正则不会简单的这样写，因为这样不能进行分组捕获：
    let idReg = /^\d{17}(\d|X)$/;

    基于小括号可以进行分组捕获的特点，将每一个小分组匹配到的信息通过exec方法捕获得到，这样可以得到更多有效的信息。
    小括号不仅可以分组，还可以进行分组捕获。
    不仅可以把大正则匹配的信息捕获到，还可以单独捕获到每个小分组的内容。
*/
var idReg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
console.log(idReg.exec("622429199702012413"));
/* 
    [
    '622429199702012413', 第一项是匹配到的整个字符串
    '622429',省市区
    '1997',年
    '02',月
    '01',日
    '1',性别
    '3',最后一位不为X
    index: 0,
    input: '622429199702012413',
    groups: undefined
    ]
*/