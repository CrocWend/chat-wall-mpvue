'use strict';

// 引入http/url模块
const http = require('http');
const url = require('url');
let actionRepos = {};

actionRepos['/add'] = require('./actions/add');
actionRepos['/del'] = require('./actions/del');
actionRepos['/update'] = require('./actions/update');
actionRepos['/'] = require('./actions/index');

// 当客户端访问时调用
http.createServer(function(request,response) {

    // 统一写入头部信息
    response.writeHead('Content-Type','text/html'); 

    // 使用url.parse()解析请求地址
    let pathname = url.parse(request.url).pathname;

    // 根据地址缓存对应的对象 server只作为中转站,逻辑由对应的方法处理
    let action = actionRepos[pathname];

    if(action) {
        action(request, response);
    }else{
        response.writeHead(404);
        response.end();
    }
}).listen(3000);