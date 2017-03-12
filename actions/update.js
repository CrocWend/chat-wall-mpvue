'use strict';

let EditPage = require('../view/EditPage');
let database = require('../database');
let query = require('../utils/query');
let post = require('../utils/post');
let indexAction = require('./index');
let loginAction = require('./login');

module.exports = function(req,res) {
    // 没有登录返回登录页面
    if(!req.session.isLogined) {
        loginAction(req,res);
        return;
    }

    // get
    
    if(req.method === 'GET'){
        let id = query(req).id;
        let article = database.list[id];
        let error = {};
        // 渲染编辑页面
        res.end(new EditPage(id,article,error,req.session.isLogined).render());
    }
    // post 更新
    else{
        post(req).then(function(data) {

            let error = {};
            if(!(data.title && data.title.length >= 5)) {
                error.title = '标题长度必须大于5';
            }

            if(!(data.body && data.body.length >= 10)) {
                error.body = '内容长度必须大于10';
            }
            if(Object.keys(error).length) {
                res.writeHead(200,{'Content-Type':'text/html'});
                // 渲染添加页面 提示错误信息
                res.end(new EditPage(data.id,{title:data.title,body:data.body},error,req.session.isLogined).render());
            }else{
                let id = data.id;
                delete data.id;
                database.update(id,data);
                indexAction(req,res);
            }
        })
    }
}