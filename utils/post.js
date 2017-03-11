'use strict';

// 引入querystring模块
const querystring = require('querystring');

module.exports = function(req) {
    // 返回一个promise对象
    return new Promise(function(resolve,reject) {
        let result = '';
        let jsonObj;
        // 有数据传入--拼接
        req.on('data',(chunk) => {
            result += chunk;
        });
        // 传输完成使用querystring格式化数据为对象
        req.on('end', () => {
            jsonObj = querystring.parse(result);
            // console.log(result);
            // console.log(jsonObj);
            resolve(jsonObj);
        });
    });
    
}