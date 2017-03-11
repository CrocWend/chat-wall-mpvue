'use strict';

// 引入自定义模块
let IndexPage = require('../view/IndexPage');
let database = require('../database');

// 导出模块
module.exports = function(req, res) {
    // 响应(创建对象,传入数据,调用渲染方法)
    res.end((new IndexPage(database.list,req.session.isLogined)).render());
}