'use strict';
const querystring = require('querystring');

module.exports = function(req) {
    return new Promise(function(resolve,reject) {
        let result = '';
        let jsonObj;
        req.on('data',(chunk) => {
            result += chunk;
        });
        req.on('end', () => {
            jsonObj = querystring.parse(result);
            // console.log(result);
            // console.log(jsonObj);
            resolve(jsonObj);
        });
    });
    
}