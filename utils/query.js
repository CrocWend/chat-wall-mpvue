'use strict';

const querystring = require('querystring');
const url = require('url');

module.exports = function query(req) {
    // 使用url.parse获取请求地址的查询字符串
    let query = url.parse(req.url).query;
    // 使用querystring解析格式化查询字符串为对象
    return querystring.parse(query);

}




    
