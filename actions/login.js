'use strict';

let LoginPage = require('../view/LoginPage');
let post = require('../utils/post');
let indexAction = require('./index');

module.exports = function(req,res) {
    if(req.method === 'GET') {
        res.end(new LoginPage().render());
    }else {
        post(req).then((data) => {
            let loginname = data.loginname;
            let  password = data.password;

            if(loginname && password && loginname === 'lee' && password === '123456' && req.session.vnum === data.vnum){
                req.session.isLogined = true;
                
                indexAction(req,res);
            }else{
                res.end(new LoginPage('登录失败,请重新登录').render());
            }
        })
    }
};