'use strict';

let database  = require('../database');
let getId = require('../utils/getId');
let indexAction = require('./index');
let loginAction = require('./login');

module.exports = function del(req,res) {

    if(!req.session.isLogined) {
        loginAction(req,res);
        return;
    }

    getId(req, id=>{
        database.del(id);
        indexAction(req,res);
    })
}