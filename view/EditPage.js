'use strict';

// 引入自定义抽象类
let AbstractPage = require('./AbstractPage');

// 继承抽象类
class EditPage extends AbstractPage{

    constructor(id,article,error,isLogined){
        super(isLogined);
        this.id = id;
        this.article = article;
        this.error = error;
    }
    
    _render(){
        // 缓存对应错误信息
        let titleError = this.error.title || '';
        let bodyError = this.error.body || '';
        
        return `
        <form action='/update' method='post'>
            <input type="hidden" name="id" value="${this.id}" />
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" class="form-control" value="${this.article.title}" name="title" id="title" placeholder="标题">
                <p>${titleError}</p>
            </div>
            <div class="form-group">
                <label for="body">内容</label>
                <textarea class="form-control" name="body" id="body" placeholder="内容">${this.article.body}</textarea>
                <p>${bodyError}</p>
            </div>
            
            <button type="submit" class="btn btn-default">更改</button>
            </form>
        `;
    }
}

module.exports = EditPage;