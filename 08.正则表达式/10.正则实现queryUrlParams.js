/* 
    queryURLParams:获取URL地址问号后面的参数信息，可能包含hash值
    返回值就是把所有问号参数信息以键值对的方式存储起来
*/
var url = "https://www.bilibili.com/video/BV1rV411n72v?p=157&vd_source=14e5cd2a541abada387db401c3a21cff#p50";

/* 
    数组和字符串方法操作
*/
function queryURLParams(url){
    let next = url.split("?")[1];
    let index = next.indexOf("#");

    let query;
    let hash;
    let res = {};
    if(index !== -1){
        query = next.split("#")[0];
        hash = next.split("#")[1];
    }else{
        query = next;
    }

    query.split("&").forEach(item=>{
        let [key,value] = item.split("=");
        res[key] = value;
    })
    res['hash'] = hash;

    console.log(res);
}

queryURLParams(url);
/* 
    {
        p: '157',
        vd_source: '14e5cd2a541abada387db401c3a21cff',
        hash: 'p50'
    }
*/
var url = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E7%8F%A0%E5%B3%B0%E5%9F%B9%E8%AE%AD&oq=%25E5%2590%25B4%25E4%25BA%25A6%25E5%2587%25A1%25E5%2581%25B7%25E9%2580%2583%25E7%25A8%258E%25E8%25A2%25AB%25E8%25BF%25BD%25E7%25BC%25B4%25E5%25B9%25B6%25E7%25BD%259A%25E6%25AC%25BE6%25E4%25BA%25BF%25E5%2585%2583&rsv_pq=a962eb340002903e&rsv_t=9db2znH14czgDY8U5JH7gWHA8VoUQWSd1mAvDF4La6CW%2B1lir45Uu7jTx18&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=15&rsv_sug1=7&rsv_sug7=100&rsv_sug2=0&rsv_btype=t&inputT=2318&rsv_sug4=2319"
var url = "https://www.bilibili.com/video/BV1rV411n72v?p=157&vd_source=14e5cd2a541abada387db401c3a21cff#p50";

var paramsReg = /([^?#=&]+)=([^?#=&]+)/g;
var hashReg = /#([^?#=&]+)/g;

let matchResult1 = url.match(paramsReg);
let matchResult2 = hashReg.exec(url);

let res = {};
for (const entries of matchResult1) {
    let [key,value] = entries.split("=");
    res[key] = decodeURIComponent(value);
}

if(matchResult2){
    res['hash'] = matchResult2[1];
}
console.log(res);