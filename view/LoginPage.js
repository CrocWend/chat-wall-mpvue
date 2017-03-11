'use strict';

// 引入自定义抽象类
let AbstractPage = require('./AbstractPage');

// 继承抽象类
class LoginPage extends AbstractPage{

    constructor(error,isLogined){
        super(isLogined);
        this.error = error || '';
    }
    
    _render(){
        let time = Date.now();
        // 缓存对应错误信息
        let titleError = this.error.title || '';
        let bodyError = this.error.body || '';
        
        return `
        <form action='/login' method='post'>
            <div>${this.error}</div>
            <div class="form-group">
                <label for="loginname">登录名称</label>
                <input type="text" class="form-control" name="loginname" id="loginname" placeholder="登录名称">
            </div>

            <div class="form-group">
                <label for="loginname">登录密码</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="登录密码">
            </div>

            <div class="form-group">
                <label for="vnum">验证码 <img src="/vnum?${time}" /></label>
                <input type="text" class="form-control" name="vnum" id="vnum" placeholder="验证码">
                
            </div>
            
            
            <button type="submit" class="btn btn-default">登录</button>
        </form>
        `;
    }
}

module.exports = LoginPage;