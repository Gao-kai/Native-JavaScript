Array.prototype.find = function(callback){
    for (let i = 0; i < this.length; i++) {
       let flag = callback && callback(this[i],i,this);
       if(flag){
        return this[i];
       }
    }

    return undefined;
}

Array.prototype.findIndex = function(callback){
    for (let i = 0; i < this.length; i++) {
       let flag = callback && callback(this[i],i,this);
       if(flag){
        return i;
       }
    }
    return -1;
}