'use strict';

const http = require('http');
const url = require('url');
let actionRepos = {};

// handleRepos['/add'] = require('./actions/add');
// handleRepos['/del'] = require('./actions/del');
// handleRepos['/update'] = require('./actions/update');
actionRepos['/'] = require('./actions/index');

// 当客户端访问时调用
http.createServer(function(request,response) {
   let pathname = url.parse(request.url).pathname;
   let action = actionRepos[pathname];
   if(action) {
       action(request, response);
   }else{
       response.writeHead(404);
       response.end();
   }
}).listen(3000);