<template>
  <div class="wrap">
    <select-city v-model="value"></select-city>
    <div class="name">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: 'page3',
  data () {
    return {
      value: [ '上海', '市辖区', '普陀区' ]
    }
  }
}
</script>

<style lang="scss" scoped>
.name{
  font-size: 14px;
}
</style>
