// import api from 'src/assets/js/api'
import router from 'src/router'

const state = {
  // 用户信息
  userInfo: {}
}

const getters = {
  // 用户信息
  userInfo: state => state.userInfo
}

const actions = {
  // 登录
  login ({ commit }, key) {
    commit('login', key)
  },

  // 退出
  exit ({ commit }) {
    commit('exit')
  },

  // 获取用户信息
  getUserInfo ({ commit }) {
    commit('getUserInfo')
  }
}

const mutations = {
  // 登录
  login (state, key) {
    state.userInfo = {
      name: '小明',
      user_id: 1
    }
    // 存储用户信息
    this._vm.VueCookie.set('USER', state.userInfo)
    // 登录跳转
    router.push('/home')

    let nowMsg = {
      code: 200,
      info: '登录成功'
    }
    this.dispatch('showMessage', nowMsg)
  },

  // 退出
  exit (state) {
    state.userInfo = {}
    state.MenuList = []
    state.tabPageList = []
    state.tabPageActive = null

    let list = this._vm.VueCookie.keys()

    if (list) {
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        this._vm.VueCookie.remove(element)
      }
    }
    sessionStorage.clear()
    router.replace('/login')
  },

  // 获取用户信息
  getUserInfo (state) {
    state.userInfo = this._vm.VueCookie.get('USER')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
