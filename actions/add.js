'use strict';
const database = require('../database');
const AddPage = require('../view/AddPage');
const IndexPage = require('../view/IndexPage');
const post = require('./post');

module.exports = function(req,res) {
    if(req.method === 'GET') {
        res.end(new AddPage().render());
    }else {
        post(req).then(function(data) {
            let error = {};
            if(!(data.title && data.title.length >= 5)) {
                error.title = 'title char lenght >= 5';
            }
            if(!(data.body && data.body.length >= 10)) {
                error.body = 'body char lenght >= 10';
            }

            if(Object.keys(error).length) {
                res.writeHead('Content-Type','text/heml');
                res.end(new AddPage(error).render());
            }else {
                database.add(data);
                res.end(new IndexPage(database.list).render());
            }
        });
    }
}