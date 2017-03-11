'use strict';

// 引入自定义抽象类
let AbstractPage = require('./AbstractPage');

// 继承抽象类
class IndexPage extends AbstractPage{

    constructor(articleList,isLogined){
        super(isLogined);
        this.list = articleList;
        this.isLogined = isLogined;
    }
    
    _render(){
        // 定义列表 利用map方法遍历 然后拼接成字符串
        let listDOMString = this.list.map( (article,index) => `
        <li class="list-group-item">
            <h3>${article.title}</h3>
            <p>${article.body}</p>
            <div class="${this.isLogined ? '' : 'hidden'}">
                <a href="/del?id=${index}">删除</a>
                <a href="/update?id=${index}">编辑</a>
            </div>
        </li>`).join('');
        return `
            <ul class="list-group">
                ${listDOMString}
            </ul>
        `;
    }
}

module.exports = IndexPage;