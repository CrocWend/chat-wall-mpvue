'use strict';

const querystring = require('querystring');
const url = require('url');

module.exports = function query(req) {

    let query = url.parse(req.url).query;
    return querystring.parse(query);

}




    
