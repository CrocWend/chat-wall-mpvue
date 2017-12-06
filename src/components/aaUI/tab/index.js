var Tab = {
    
    _tabClick(e) {
        console.log(e)
        var data = {
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        };

        if (this.tabClick) {
            this.tabClick(data);
        } else {
            console.warn('页面缺少 tabClick 回调函数');
        }
    }
};

module.exports = Tab;