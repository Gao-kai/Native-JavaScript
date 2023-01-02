/* 
    JS中比较的四种类型
    1. == 会发生隐式数据类型转换
    2. === 绝对相等
        indexOf 老的对比API
        lastIndexOf
        switch-case算法

    3. 同值相等算法
        Object.is实现 +0和-0不应相等 NaN和NaN相等

    4. 零值相等 基本表现和上面一样 但是+0和-0倍认为相等
        JS中的Set值的对比
        JS中Map的key的对比
        includes 新的对比API

*/

Array.prototype.includes = function(target,startIndex = 0){
    if(startIndex < 0){
        startIndex = this.length + startIndex;
    }

    for (let i = startIndex; i < this.length; i++) {
        let item = this[i];
        // 先使用Object.is的同值相等算法 然后采用===算法将+0和-0认定为相等
        if(Object.is(item,target)|| target === item){
            return true;
        }
    }
    return false;
}

let arr = [NaN,1,+0];
console.log(arr.includes(NaN));
console.log(arr.includes(-0));