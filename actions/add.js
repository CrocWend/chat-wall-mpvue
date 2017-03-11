'use strict';

// 引入自定义模块
let database = require('../database');
let AddPage = require('../view/AddPage');
let IndexPage = require('../view/IndexPage');
let post = require('../utils/post');
let loginAction = require('./login');

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
                error.title = '标题长度必须大于5';
            }

            if(!(data.body && data.body.length >= 10)) {
                error.body = '内容长度必须大于10';
            }

            if(!(data.vnum === req.session.vnum)) {
                error.vnum = '验证码错误';
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