// 获取全局应用程序实例对象
// const app = getApp()
var Zan = require('../../components/zanUI/index');
// 创建页面实例对象
Page(Object.assign({}, Zan.Tab, {
  /**
   * 页面的初始数据
   */
  data: {
    title: 'find',
    tab3: {
      list: [{
        id: 'music',
        title: '音乐'
      }, {
        id: 'video',
        title: '视频'
      }, {
        id: 'radio',
        title: '电台'
      }],
      selectedId: 'music',
      scroll: false,
      // height: 45
    },
    slider: [
      {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512407672880&di=c4b61281bbb875d282baa4235426be73&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1307%2Fntk-1307-6459.jpg'
      },
      {
        picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2222457580,3572532973&fm=27&gp=0.jpg'
      },
      {
        picUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1639473443,2804235162&fm=27&gp=0.jpg'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
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
  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
}))
