/* 
    fill方法和includes方法 都有start参数 默认为0 需要校验
    当start为负数的时候 等于length + start的值
*/
Array.prototype.fill = function(value,startIndex =0,endIndex = this.length){
    if(startIndex < 0){
        startIndex = endIndex + startIndex;  
    }
    for (let i = startIndex; i < endIndex; i++) {
        this[i] = value;
    }

    return this;
}