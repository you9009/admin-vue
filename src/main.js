import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex
import store from 'assets/js/store.js'
// 引入echarts
import echarts from 'echarts'
// 引入存储组件
import VueCookies from 'vue-cookies'
// 引入UI组件库
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
// 重置全局样式
import 'assets/css/reset.css'
// 全局事件
import utils from 'assets/js/utils.js'
// 全局引用自定义模板
import VueModule from 'assets/js/modules.js'

Vue.use(iView)
Vue.use(VueModule)

Vue.config.productionTip = false
Vue.prototype.Utils = utils
Vue.prototype.Echarts = echarts
Vue.prototype.VueCookie = VueCookies

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(() => {
  iView.LoadingBar.finish()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
