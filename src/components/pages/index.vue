<template>
  <div class="wrap">
    <h1>构成：vue2.6.10 + view-design4.0.0 + vuex3.0.1</h1>
    <h2>1.自定义组件：</h2>
    <h2>
      <ul>
        <li>Tab分页切换组件：联动右侧导航</li>
        <li>树形表格+分页：数据来自右侧导航</li>
        <li>封装的echarts类型：百度Echarts</li>
        <li>城市联动选择器：iview/Cascader 级联选择</li>
      </ul>
    </h2>
    <h2>2.多层嵌套导航</h2>
  </div>
</template>

<script>
export default {
  name: 'page-index'
}
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 14px;
  h2 {
    margin-top: 20px;
  }
  ul {
    margin-left: 20px;
    li {
      margin-bottom: 10px;
    }
  }
}
</style>
