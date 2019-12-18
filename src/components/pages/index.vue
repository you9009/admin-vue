<template>
  <div class="wrap">
    <div class="tips" v-for="(item, index) in tipsList" :key="index">
      <h2>{{item.title}}</h2>
      <div class="children">
        <div v-for="(li, inx) in item.children" :key="inx">
          <h3>{{li}}</h3>
        </div>
      </div>
    </div>
    <button @click="goPage">page3</button>
  </div>
</template>

<script>
export default {
  name: 'page-index',
  data () {
    return {
      tipsList: [
        {
          title: '构成：vue + vue-router + vuex + axios + iviewUI'
        },
        {
          title: '优化：前端代码压缩 + cdn资源加速 + 服务端启用nginx压缩'
        },
        {
          title: '页面实行了缓存机制，页面内的操作可保留至下次刷新页面'
        },
        {
          title: '自定义组件：',
          children: [
            'Tab分页切换组件：联动右侧导航(面包屑和页面之间的部分就是)',
            '树形表格：数据来自右侧导航',
            '封装的echarts类型：百度Echarts',
            '日历：右键可添加删除日程',
            '分页：简单的分页组件'
          ]
        },
        {
          title: '多层嵌套导航'
        }
      ]
    }
  },
  methods: {
    goPage () {
      let key = {
        link: '/page3',
        name: 'page3',
        label: 'page3',
        active: 0
      }
      this.Utils.addPageTab(key)
    }
  }
}
</script>

<style lang="scss">
.wrap {
  font-size: 14px;
  h2 {
    margin-bottom: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .children {
    margin-left: 20px;
  }
}
</style>
