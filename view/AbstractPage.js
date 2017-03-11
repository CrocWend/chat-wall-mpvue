'use strict';

// 定义抽象类
class AbstractPage{

    constructor(){

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
                ${this._render()}
            </body>
        </html>
    `
    }
}

module.exports = AbstractPage;