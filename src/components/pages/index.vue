<template>
  <div class="wrap">
    <h1>构成：vue + vue-router + vuex + axios + iviewUI </h1>
    <h2>优化：前端代码压缩 + cdn资源加速 + 服务端启用nginx压缩</h2>
    <List item-layout="vertical">
      <ListItem v-for="(item, index) in tipsList" :key="index">
        <ListItemMeta :title="index+1+'.'+item.title"  />
        <ul>
          <li v-for="(li, inx) in item.children" :key="inx">{{li}}</li>
        </ul>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  name: 'page-index',
  data () {
    return {
      tipsList: [
        {
          title: '自定义组件：',
          children: [
            'Tab分页切换组件：联动右侧导航',
            '树形表格：数据来自右侧导航',
            '封装的echarts类型：百度Echarts',
            '城市联动选择器：iview/Cascader 级联选择',
            '日历：右键可添加删除日程',
            '分页：简单的分页组件'
          ]
        },
        {
          title: '多层嵌套导航'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 14px;
  ul {
    margin-left: 20px;
    margin-top: -20px;
    li {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
