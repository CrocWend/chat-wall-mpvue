'use strict';

let database  = require('../database');
let getId = require('../utils/getId');
let indexAction = require('./index');
let loginAction = require('./login');

module.exports = function del(req,res) {
    // 没有登录返回登录页面
    if(!req.session.isLogined) {
        loginAction(req,res);
        return;
    }
    // 删除对应id的数据
    getId(req, id=>{
        database.del(id);
        indexAction(req,res);
    })
}