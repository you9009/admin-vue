import store from './store.js'

let loopTime = null

export default {
  getApiUtils (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key]
        if (element == null || element == undefined || element == '') {
          delete data[key]
        }
      }
    }
    return data
  },

  beginTime (code, time = 1000) {
    loopTime = setInterval(code, time)
  },
  overTime () {
    clearInterval(loopTime)
  },

  addPageTab (key) {
    store.dispatch('addPageTab', key)
  }
}
