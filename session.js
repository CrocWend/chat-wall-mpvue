'use strict';
// 引入querystring 解析请求字符串
const querystring = require('querystring');
let cache = {};
let sid = 0;

module.exports = function(req,res) {
    
    let cookie = req.headers.cookie;
    let cookieJSONObj = {};
    
    if(cookie) {
        cookieJSONObj = querystring.parse(cookie.split(';').join('&'));
    }

    // 如果有对应的sid信息直接返回 没有则创建后返回
    if(cookieJSONObj.sid && cache[cookieJSONObj.sid]) {
        return cache[cookieJSONObj.sid];
    }else{
        sid += 1;
        res.setHeader('Set-Cookie',[`sid=${sid}`]);
        return cache[sid] = {};
    }
}