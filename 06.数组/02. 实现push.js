/**
 * 1. 基于oldLen+i为起始索引进行赋值
 * 2. 返回的是新数组的长度
 */
Array.prototype.myPush = function (...args) {
  let oldLen = this.length;
  let newLen = oldLen + args.length;

  // 从oldLen处开始尾部追加元素
  for (let i = 0; i < args.length; i++) {
    this[oldLen + i] = args[i];
  }
  // 修正新数组的长度并返回 因为push方法返回的是新数组的长度 和unshift一样
  this.length = newLen;
  return this.length;
};


let arr = [1,2,3];
arr.myPush(4,5);
console.log(arr);
