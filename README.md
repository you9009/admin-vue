# vue-admin
```
key： {
  link:'链接',
  name:'路由名字，需要和页面名称对应',
  label:'标签名',
  active:'所在导航'
}
this.Utils.addPageTab(key)
```
    <!-- import echarts -->
    <script src="https://cdn.bootcss.com/echarts/4.4.0-rc.1/echarts.min.js"></script>
    <!-- import vue -->
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
    <!-- import vuex -->
    <script src="https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js"></script>
    <!-- import vue-router -->
    <script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
    <!-- import axios -->
    <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>

    "vue": "^2.6.11",
    "axios": "^0.19.0",
    "core-js": "^2.6.11",
    "echarts": "^4.5.0",
    "view-design": "^4.0.2",
    "vue-cookies": "^1.6.0",
    "vue-router": "^3.1.3",
    "vuex": "^3.1.2"

    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      axios: 'Axios',
      echarts: 'echarts',
      'vue-router': 'VueRouter'
    }
