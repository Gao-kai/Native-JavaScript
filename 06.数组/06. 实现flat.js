/* 
    1. 不会修改原数组，初始值depth为1
    2. 开一个while循环，条件是原数组中是否还存在元素为数组，如果是数组那么还要进行下一次的扁平化
    3. 核心实现就是数组的concat方法

    concat方法天然就有一种将传入参数为数组进行自动解构然后追加到自己尾部的功能，比如：
    [].concat([1,2,[3]]) 首先将传入的参数嵌套数组[1,2,[3]]解构为1,2,[3]三个参数，然后将这三个参数依次追加到空数组后面,结果为[1,2,[3]]

    如果我们在将嵌套数组传入的时候自己再手动...解构一次，再结合concat方法天然的结构特性，就等于将数组中嵌套数组实现了一层扁平化
    好比把数组中每一个元素类型为数组的执行了一次脱衣服的操作
    [].concat(...[1,2,[3]]) => [].concat(1,2,[3]) => concat对于数组天然的解构特性 => [1,2,3] 等于将数组嵌套的[3]进行了解构
*/
Array.prototype.flat = function(depth = 1){
    let arr = this;
    let i = 0; // 计数器
    let res = [...this]; // 浅克隆
    while(res.some(item=>Array.isArray(item))){
        res = [].concat(...res);
        i++;
        if(i >= depth){
            break;
        }
    }
    return res;
}

let arr = [
    1,
    [2,3],
    [4,[5,6]],
    [[[7]]]
];

console.log(arr.flat(Infinity));
