'use strict';

let IndexPage = require('../view/IndexPage');
let database = require('../database');

module.exports = function(req, res) {

    res.end((new IndexPage(database.list)).render());
}