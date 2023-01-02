/* 
    1. 如果数组为空 那么不运行forEach方法
    2. forEach方法的返回值一定是undefined，在运行时修改原数组
*/
Array.prototype.forEach = function(callback,thisArg){
    thisArg = thisArg || this;
    for (let i = 0; i < this.length; i++) {
        callback && callback(this[i],i,thisArg);
    }
}

let arr = [1,2,3];
arr.forEach((item,index)=>{
    console.log(item,index);
})

