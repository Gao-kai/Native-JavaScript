/* 
    实现数组扁平化flat方法 传入参数arr和depth 返回扁平化之后的数组 depth的默认值为1
    面试实现这个就可以
    flat方法可不会修改原数组
*/
let arr = [
    1,
    [2,3],
    [4,[5,6]],
    [[[7]]]
];

/* 
    1. 经典的while循环 + some + concat方法 + 归并思想
*/
function flat(arr,depth = 1){
    let i = 0;
    while(arr.some(item=>Array.isArray(item))){
        // 再一次体现了归并思想 reduce flat join 上一次循环中的计算结果是下一次循环中右侧计算值
        arr = [].concat(...arr);
        i++;
        // 控制深度的方法只有这一种
        if(i >= depth){
            break;
        }
    }
    return arr;
}
console.log(flat(arr,5))

/* 
    2. 递归 + concat实现 不能控制depth的深度
    通过不停的给旧的res进行赋值产生新的res来进行 遇到值为数组 就将值进行合并
    flat1方法返回的是数组
*/
function flat1(arr){
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(Array.isArray(element)){
            // 不断的给res赋值 这里又是归并的思路
            res = res.concat(flat1(element));
        }else{
            res.push(element);
        }
    }
    return res;

}

console.log(flat1(arr))


/* 
    3. toString + Number函数 只适用于数组内容都是基本值的时候
    toString之后所有值都变为字符串 需要修改为对应的基本值 比如数字
*/
function flat3(arr){
    return arr.toString().split(",").map(item=>Number(item));
}
console.log(flat3(arr))

/* 
    4. reduce + 递归方案 实现 内部核心是归并
*/
function flat4(arr){
    return arr.reduce((prev,curr)=>{
       if(Array.isArray(curr)){
        return prev.concat(flat4(curr));
       }else{
        return prev.concat(curr);
       }
    },[]) 
}

console.log(flat4(arr))

