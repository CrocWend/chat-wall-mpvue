'use strict';

// 定义抽象类
class AbstractPage{

    constructor(isLogined){
        this.isLogined = isLogined;
    }
    
    // 抽象方法
    _render(){
        throw new Error('子类必须实现');
    }

    // 渲染方法 返回基本页面,内容根据子类的实现展示
    render(){
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8' />
                <link rel='stylesheet' href='//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css'/>
            </head>
            <body class='container'>

                <div>
                    <a href="/login" class="${this.isLogined ? 'hidden' : ''} btn btn-success">登录</a>
                    <a href="/logout" class="${this.isLogined ? '' : 'hidden'} btn btn-success">退出</a>
                    <a href="/add" class="${this.isLogined ? '' : 'hidden'} btn btn-success">添加</a>
                </div>

                ${this._render()}
            </body>
        </html>
    `
    }
}

module.exports = AbstractPage;