'use strict';
class IndexPage {
    constructor(name){
        this.name = name;
    }
    
    _render(){
        return this.name;
    }
}

module.exports = IndexPage;