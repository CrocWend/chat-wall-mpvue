'use strict';

let database  = require('../database');
let getId = require('./getId');
let indexAction = require('./index');

module.exports = function del(req,res) {
    getId(req, id=>{
        database.del(id);
        indexAction(req,res);
    })
}