'use strict';

let query = require('./query');
let post = require('./post');

module.exports = function getId(req,callback) {

    if(req.method === 'GET') {
        // 使用query获取查询字符串对象
        let data = query(req);
        // 把id传入回调
        callback(data.id);
    }else{
        // 使用post获取promise对象
        post(req).then(function (data) {
            // 把获取的数据对象的id传入回调
            callback(data.id);
        });
    }
}