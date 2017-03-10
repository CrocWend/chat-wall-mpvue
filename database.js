'use strict';

const fs = require('fs');
const filepath = __dirname + '/data.json';
let list;
try{
    list = JSON.parse(fs.readFileSync(filepath));
}catch(e) {
    list = [];
}


module.exports = {
    add(article){
        list.push(article);
    },
    del(index){
        list.splice(index,1);
    },
    update(index,newArticle){
        list.splice(index,1,newArticle);
    },
    get list(){
        return list;
    },
    stort(callback){
        // 文件位置 数据本身 回调函数
        fs.writeFile(filepath,JSON.stringify(list),callback);
    }
};