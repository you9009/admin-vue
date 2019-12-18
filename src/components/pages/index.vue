<template>
  <div class="wrap">
    <div class="tips" v-for="(item, index) in tipsList" :key="index">
      <h2>{{item.title}}：</h2>
      <div class="children">
        <div v-for="(li, inx) in item.children" :key="inx">
          <h3>{{li}}</h3>
        </div>
      </div>
    </div>
     <Divider />
    <h2>其他</h2>
    <Button type="primary" @click="goPage">新建页面（自定义组件 / 组件管理目录下）</Button>
  </div>
</template>

<script>
export default {
  name: 'page-index',
  data () {
    return {
      tipsList: [
        {
          title: '说明',
          children: [
            '构成：vue + vue-router + vuex + axios + iviewUI',
            '优化：前端代码压缩 + CDN资源加速 + 服务端启用Nginx压缩',
            '页面实行了缓存机制，页面内的操作可保留至下次刷新页面'
          ]
        },
        {
          title: '自定义组件',
          children: [
            '分页切换组件：联动右侧导航(面包屑和页面之间的部分就是)',
            '树形表格组件：数据来自右侧导航',
            'Echarts组件：百度Echarts',
            '日历组件：右键可添加删除日程',
            '分页组件：简单的分页组件'
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
        label: '卡片组件(名字很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长)',
        active: '1'
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
    margin-bottom: 15px;
  }
  h3 {
    margin-top: 10px;
  }
  .children {
    margin-bottom: 30px;
    margin-left: 20px;
  }
}
</style>
