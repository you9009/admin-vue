<template>
  <div class="wrap">
    <card-wrap>
      <div slot="title">卡片组件</div>
      <p>卡片内容插槽，可自定义内容</p>
    </card-wrap>
    <card-wrap dis-hover class="margin-Top">
      <div slot="title">这里是标题可用<code>title</code>属性，或者<code>title</code>插槽</div>
      <p><code>dis-hover</code>属性控制是否显示鼠标滑过效果</p>
    </card-wrap>
  </div>
</template>

<script>
export default {
  name: 'page3',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 14px;
  code{
    color: #f00;
    margin: 0 4px;
  }
}
.margin-Top{
  margin-top: 20px;
}
</style>
