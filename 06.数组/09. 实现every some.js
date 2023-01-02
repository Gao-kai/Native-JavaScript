// 一次为假即为假
Array.prototype.every = function(callback){
    for (let i = 0; i < this.length; i++) {
        // 如果有一次执行返回false 那么直接返回方法执行的结果false
        let flag = callback && callback(this[i],i,this);
        if(!flag){
            return false;
        }
    }

    // 所有遍历完都ok 那么返回true
    return true;
}

// 一次为真即为真
Array.prototype.some = function(callback){
    for (let i = 0; i < this.length; i++) {
        let flag = callback && callback(this[i],i,this);
        // 只要任意一次返回true 那么就返回方法执行的结果true
        if(flag){
            return true;
        }
    }

    // 代码走到这里 说明每一次都是false 返回结果false
    return false;
}

