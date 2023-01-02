/**
 * 1. 基于是否传入initialValue来决定整个方法的运行情况
 * 如果传递了初始值，那么这个初始值会当做reduce内部callback首次运行时的prev，curr就是数组的第0个元素
 * 如果没有传递初始值，那么首次运行callback的prev就是数字的第0个元素，curr就是数组的第1个元素
 * 
 * 2. 将每一次callback执行的结果赋值给prev，当做下一次运行callback的参数prev，归并效果
 */
Array.prototype.reduce = function (callback, initialValue) {
  if (this.length === 0) return;
  /* 
    首先基于是否传入initialValue的值
    来确定遍历数组的起始索引startIndex和第一个参数prev是数组第[0]项还是initialValue
  */
  let prev;
  let startIndex = 0;

  if (initialValue) {
    prev = initialValue;
  } else {
    prev = this[0];
    startIndex = 1;
  }

  // 基于startIndex来调用callback，并将每一次执行的结果重新赋值给prev，当做下一次运行的prev
  for (let i = startIndex; i < this.length; i++) {
    prev = callback && callback(prev,this[i],i,this);
  }

  // 返回prev
  return prev;
}

// test
let arr = [1,2,3];
let res = arr.reduce((prev, curr, index) => {
  return prev + curr;
}, 4);
console.log(res);
