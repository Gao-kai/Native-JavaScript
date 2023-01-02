Array.prototype.filter = function(calback){
    let res = [];
    for (let i = 0; i < this.length; i++) {
        let flag = calback && calback(this[i],i,this);
        if(flag){
            res.push(this[i]);
        }
    }

    return res;
}