'use strict';

let query = require('./query');
let post = require('./post');

module.exports = function getId(req,callback) {
    if(req.method === 'GET') {
        let data = query(req);
        callback(data.id);
    }else{
        post(req).then(function (data) {
            callback(data.id);
        });
    }
}