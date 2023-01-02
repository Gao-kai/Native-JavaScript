/* 
    1. 第一次遍历i=0时，resStr为第一个元素 不添加分隔符 否则前面会多出一个分隔符
    2. 后面每次遍历，归并的思想，上一次运行的结果resStr是下一次循环的参数，类似reduce
*/
Array.prototype.join = function(separator = ","){
    let resStr = ``;
    for (let i = 0; i < this.length; i++) {
        if(i===0){
            resStr = this[i];
        }else{
            resStr = resStr + separator + this[i];
        }
    }
    return resStr;
}



let arr = [1,2,3];
console.log(arr.join(""))
console.log(arr.join())
console.log(arr.join("+"))