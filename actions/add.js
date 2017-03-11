'use strict';

// 引入自定义模块
const database = require('../database');
const AddPage = require('../view/AddPage');
const IndexPage = require('../view/IndexPage');
const post = require('./post');
const loginAction = require('./login');

module.exports = function(req,res) {

    if(!req.session.isLogined) {
        loginAction(req,res);
        return;
    }

    // 如果是get请求 渲染添加页面表单
    if(req.method === 'GET') {
        res.end(new AddPage().render());
    }
    // 如果是post请求 调用post模块获取promise对象
    else {
        // 请求成功后根据获取的数据判断格式
        post(req).then(function(data) {
            let error = {};
            if(!(data.title && data.title.length >= 5)) {
                error.title = 'title char lenght >= 5';
            }
            if(!(data.body && data.body.length >= 10)) {
                error.body = 'body char lenght >= 10';
            }

            // 判断有没有错误信息
            if(Object.keys(error).length) {
                res.writeHead('Content-Type','text/html');
                // 渲染添加页面 提示错误信息
                res.end(new AddPage(error,req.session.isLogined).render());
            }else {
                // 添加数据
                database.add(data);
                // 渲染首页数据列表
                res.end(new IndexPage(database.list,req.session.isLogined).render());
            }
        });
    }
}