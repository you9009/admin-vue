<template>
  <div class="breadcrumb-wrap">
    <ul>
      <li><Icon type="md-home" size="18" style="margin-right:6px"></Icon>Home</li>
      <li v-for="(item, index) in data" :key="index" :class="{'blod-item':index==data.length-1}">
        <span class="gap">/</span>
        <span>{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb-wrap',
  props: {
    data: {
      type: Array, // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-wrap {
  ul {
    display: flex;
    flex-direction: row;

    align-items: center;
    li {
      font-size: 14px;
      color: #999;
      .gap {
        margin: 0 8px;
        color: #dcdee2;
      }
    }
    .blod-item {
      font-weight: bold;
      color: #2c3e50;
    }
  }
}
</style>
