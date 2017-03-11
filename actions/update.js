'use strict';

let EditPage = require('../view/EditPage');
let database = require('../database');
let query = require('../utils/query');
let post = require('../utils/post');
let indexAction = require('./index');
let loginAction = require('./login');

module.exports = function(req,res) {
console.log(req.session.isLogined)
    if(!req.session.isLogined) {
        loginAction(req,res);
        return;
    }

    // get
    
    if(req.method === 'GET'){
        let id = query(req).id;
        let article = database.list[id];
        let error = {};
        res.end(new EditPage(id,article,error,req.session.isLogined).render());
    }
    // post
    else{
        post(req).then( data=> {
            /*let id = data.id,
                title = data.title,
                body = data.body;*/
            let id = data.id;
            delete data.id;

            database.update(id,data);
            indexAction(req,res);
        })
    }
}