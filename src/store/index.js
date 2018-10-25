import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    chat: [],
  },
  mutations: {
    /**
     * 在main.js例引入
     * import store from './store/index'
     * 把store挂载到全局
     * Vue.prototype.$store = store;
     */

    /**
     * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
     * 使用方法 例:
     * this.$store.update({"cityName":"北京"})
     * 
     *  config需要传入对象
     * @param {*} state 
     * @param {*Object} config 
     */
    update(state, config) {
      Object.keys(config).map((item, key) => {
        state[item] = config[item]
      })
    },
    // 设置
    setChat(state, newVal) {
      state.chat.push(newVal);
      console.warn(newVal)
      console.error(state)
    },
    // 获取用户信息-已经授权
    getUserInfo(state, success, error) {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称 显示不同页面
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                console.log('已经授权');
                state.userInfo = res.userInfo
                success && success();
              }
            })
          } else {
            // 未授权
            console.log('未授权')
            error && error();
          }
        }
      })
    }
  }
})

export default store;