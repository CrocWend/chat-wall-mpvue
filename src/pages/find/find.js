// 获取全局应用程序实例对象
// const app = getApp()
var aaUI = require('../../components/aaUI/index');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// 创建页面实例对象
Page(Object.assign({}, aaUI.Tab, {
  /**
   * 页面的初始数据
   */
  data: {
    title: 'find',
    tabs: ["选项一", "选项二", "选项三"],
    windowWidth: 0,
    tabsOpt: {
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    my.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          tabsOpt: {
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          }
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      tabsOpt: {
        sliderOffset: this.data.windowWidth / this.data.tabs.length * e.activeIndex,
        activeIndex: e.activeIndex
      }
    });
  },
  test: function (e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
}))
