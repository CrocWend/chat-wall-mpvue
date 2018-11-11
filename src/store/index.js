import Vue from 'vue';
import Vuex from 'vuex'
import AppIMDelegate from "../delegate/app-im-delegate";
import config from '@/config/config'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  appInfo: {},
  setting: {},
  systemInfo: {},
  count: 0,
  appIMDelegate: new AppIMDelegate(),
  bcgImgIndex: 0,
  bcgImg: "https://s1.ax1x.com/2018/11/09/iHLlPf.jpg",
  barBgColor: "#393836",
  bcgImgList: [
    {
      src: "https://s1.ax1x.com/2018/11/09/iHLlPf.jpg",
      barBgColor: "#393836"
    },
    {
      src: "https://s1.ax1x.com/2018/11/09/iHL3RS.jpg",
      barBgColor: "#b8bab9"
    },
    {
      src: "https://s1.ax1x.com/2018/11/09/iHLMIP.jpg",
      barBgColor: "#ffa5bc"
    }
  ],
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
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
    console.log('----------state')
    console.log(config)
    Object.keys(config).map((item, key) => {
      state[item] = config[item]
    })
  },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  update: ({ commit }, config) => {
    commit('update', config);

  },
  incrementIfOdd({ commit, state }) {
    console.log(111)
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync({ commit }) {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        commit('increment')
        reslove()
      }, 1000)
    })
  },
  /**
   * 解密信息
   * 使用保存的session 和返回的详细信息
   */
  getEncryptData({ commit, state }, detail) {
    return new Promise((reslove, reject) => {
      let session_key;
      try {
        session_key = wx.getStorageSync("session_key");
      } catch (e) { }
      wx.request({
        url: config.apiUrl + "/encryptWxData",
        data: {
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          session_key: session_key
        },
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        success: function (res) {
          reslove(res.data);
        },
        fail: function(res) {
          reject(res);
        }
      });
    })
  },
  getUserList({ commit, state }, openId) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: config.apiUrl + "/userList",
        data: {
          openId
        },
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        success: function (res) {
          var data = res.data;
          console.log('store getuserList')
          console.log(res)
          reslove(data);
        },
        fail: function(res) {
          reject(res);
        }
      });
    })
  },
  initSetting ({ commit, state }) {
    wx.getStorage({
      key: 'setting',
      success: (res) => {
        let setting = res.data || {}
        commit('update', {setting});
        actions.checkUpdate(setting);
      },
      fail: () => {
        commit('update', {setting: {}});
      },
    })
  },
  checkUpdate (setting) {
    // 兼容低版本
    if (!setting.forceUpdate || !wx.getUpdateManager) {
      return
    }
    let updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      console.error(res)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已下载完成，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
}


// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}


// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
