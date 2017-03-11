'use strict';

let PW = require('png-word');
let RW = require('random-word');
let pngword = new PW(PW.GREEN);
let rw = RW('abcdefghijklmnopqrstuvwxyz1234567890');

module.exports = function(req,res) {
    let word = rw.random(4);
    req.session.vnum = word;
    
    //res.writeHead('Content-Type','image/png');
    

    pngword.createReadStream(word).pipe(res);

}