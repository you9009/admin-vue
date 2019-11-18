// import api from 'assets/js/api'

export default {
  state: {
    alertMessage: {}
  },

  getters: {
    alertMessage: state => state.alertMessage
  },

  actions: {
    showMessage ({ commit }, key) {
      commit('showMessage', key)
    }
  },

  mutations: {
    showMessage (state, data) {
      state.alertMessage = {}
      state.alertMessage = data
    }
  }
}
