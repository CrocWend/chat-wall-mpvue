'use strict';

// 引入抽象类
var AbstractPage = require('./AbstractPage');

// 继承抽象类
class AddPage extends AbstractPage{

    constructor(error){
        super();
        // 保存错误信息
        this.error = error || {};
    }
    
    _render(){
        // 缓存对应错误信息
        let titleError = this.error.title || '';
        let bodyError = this.error.body || '';
        
        return `
        <form action='/add' method='post'>
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="标题">
                <p>${titleError}</p>
            </div>
            <div class="form-group">
                <label for="body">内容</label>
                <textarea class="form-control" name="body" id="body" placeholder="内容"></textarea>
                <p>${bodyError}</p>
            </div>
            
            <button type="submit" class="btn btn-default">添加</button>
            </form>
        `;
    }
}

module.exports = AddPage;