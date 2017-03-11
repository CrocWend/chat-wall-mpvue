'use strict';

var AbstractPage = require('./AbstractPage');

class IndexPage extends AbstractPage{

    constructor(articleList){
        super();
        this.list = articleList;
    }
    
    _render(){
        let listDOMString = this.list.map( article => `<li class="list-group-item"><h3>${article.title}</h3><p>${article.body}</p></li>`).join('');
        return `
            <ul class="list-group">
                ${listDOMString}
            </ul>
        `;
    }
}

module.exports = IndexPage;