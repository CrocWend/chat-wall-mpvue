import Vue from 'vue';
import Vuex from 'vuex'
import AppIMDelegate from "../delegate/app-im-delegate";

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  appInfo: {},
  count: 0,
  appIMDelegate: new AppIMDelegate(),
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
    Object.keys(config).map((item, key) => {
      state[item] = config[item]
    })
  },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  update: ({ commit }, config) => {
    console.log(config)
    commit('update', config);

  },
  incrementIfOdd({ commit, state }) {
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
  }
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
