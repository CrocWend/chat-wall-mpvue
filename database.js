'use strict';

// 引入fs模块
const fs = require('fs');

// 定义文件路径
const filepath = __dirname + '/data.json';
let list;

// 读取数据文件(同步方法) 缓存到list中 捕获异常:如果不存在赋默认值
try{
    list = JSON.parse(fs.readFileSync(filepath));
}catch(e) {
    list = [];
}

// 导出方法
module.exports = {
    // 添加文章
    add(article){
        list.push(article);
    },
    // 删除文章
    del(index){
        list.splice(index,1);
    },
    // 更新文章
    update(index,newArticle){
        list.splice(index,1,newArticle);
    },
    // 获取所有文章
    get list(){
        return list;
    },
    // 存储数据到指定位置
    store(callback){
        // 文件位置 数据本身 回调函数
        fs.writeFile(filepath,JSON.stringify(list),callback);
    }
};