'use strict';

class AbstractPage{
    constructor(){

    }
    _render(){
        throw new Error('子类必须实现');
    }
    render(){
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <link rel='stylesheet' href='//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js'/>
            </head>
            <body>
                ${this._render()}
            </body>
        </html>
    `
    }
}