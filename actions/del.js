'use strict';

let database  = require('../database');
let getId = require('./getId');
let indexAction = require('./index');
const loginAction = require('./login');

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