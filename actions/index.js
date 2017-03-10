'use strict';

let IndexPage = require('./view/IndexPage');
module.exports = function(req, res) {
    let name = 'lee'
    res.writeHead('Content-Type','text/html');
    res.end((new IndexPage(name)).render());
}