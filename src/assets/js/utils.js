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
    for (const k in key) {
      if (key.hasOwnProperty(k)) {
        const element = key[k]
        if (k === 'active') {
          key[k] = element + '-'
        }
      }
    }
    store.dispatch('addPageTab', key)
    store.dispatch('HomeMenuSelect', key.active)
  }
}
