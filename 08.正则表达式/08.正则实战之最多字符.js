/* 
    1.验证一个字符串中那个字母出现的次数最多？并且计算总计出现了多少次?
*/

/* 
    1. map去重法
*/
var str =
  "An approachable, performant and versatile framework for building web user interfaces.";

function getMaxTimes(str) {
  let obj = {};
  for (const char of str) {
    if (obj[char]) {
      obj[char]++;
    } else if (char !== " ") {
      obj[char] = 1;
    }
  }

  let maxTimes = 0;

  for (const char of Object.keys(obj)) {
    if (maxTimes < obj[char]) {
      maxTimes = obj[char];
    }
  }

  //   出现次数最多字母组成的数组
  let res = [];
  for (const char of Object.keys(obj)) {
    if (obj[char] === maxTimes) {
      res.push(char);
    }
  }

  return {
    maxTimes,
    res,
  };
}

console.log(getMaxTimes(str));

/* 
   2. 排序 + 正则分组引用
*/
var str =
  "An approachable, performant and versatile framework for building web user interfaces.";

function getMaxTimes(str) {
  // 1. 先对字符串转化为数组,然后基于字符串默认排序方法进行排序，将相同的字母都排列在一起
  str = charArr.sort((a, b) => a.localeCompare(b)).join("");
  console.log(str);

  /* 
    2. 基于正则分组引用捕获到每一个分组的单词 match方法 
    \1指的是出现和前面分组匹配结果一模一样的字符  +代表可以出现1次多次
  */
  var reg = /([a-zA-Z])\1+/g;
  let match = str.match(reg);

  /* 
    3. 将匹配结果基于单词长度进行排序
    将出现次数多的排在前面少的排在后面
  */
  match.sort((a, b) => b.length - a.length);
  
  /* 
    4.  找到字符最多的单词和次数
  */
  let maxTimes = match[0].length;
  let res = [];
  for (const word of match) {
    if (word.length < maxTimes) {
      break;
    }
    res.push(word.slice(0, 1));
  }

  return {
    maxTimes,
    res,
  };
}
console.log(getMaxTimes(str));

/* 
    3.下滤法
    原理就是在排序之后找：是否有连续长度为str.length-1一模一样的字符
    如果没有，依次递减，找连续长度为str.length-2
    ...
*/
function getMaxTimes(str) {
    str = str.split("").sort((a, b) => a.localeCompare(b)).join("");
    let maxTimes = 0;
    let res = [];
    let flag = true;
    for (let i = str.length-1; i > 0; i--) {
        // 依次递减进行匹配
        var reg = new RegExp(`([a-zA-Z])\\1{${i-1}}`,'g')

        // 这个replace只能进来一次
        str.replace(reg,function(match,$1){
            // 多次 匹配 代表有多个相同长度的字符
            res.push($1);
            maxTimes = i;
            flag = false;
        })

        // flag为false 代表已经找到最长的连续字母了 后续循环不需要继续执行了
        if(!flag) break;
    }

    return {
        maxTimes,
        res,
    }
}
console.log(getMaxTimes(str));


