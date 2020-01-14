# vue-admin

```
let key = {
  link: '链接',
  name: '路由名字，需要和页面名称对应',
  label: '标签名',
  active: '所在导航'
}
this.Utils.addPageTab(key)
```

  <!-- import stylesheet -->
  <link rel="stylesheet" href="//unpkg.com/view-design/dist/styles/iview.css">
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
  <!-- import iView -->
  <script src="//unpkg.com/view-design/dist/iview.min.js"></script>

externals: {
vue: 'Vue',
vuex: 'Vuex',
axios: 'Axios',

<!-- echarts: 'echarts', -->

'vue-router': 'VueRouter',

<!-- iview: 'iview' -->

}
