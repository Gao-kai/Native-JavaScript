Array.prototype.map = function(callback){
    let res = new Array();
    for (let i = 0; i < this.length; i++) {
        let v = callback && callback(this[i],i,this);
        res.push(v);
    }
    return res;
}