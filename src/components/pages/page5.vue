<template>
  <div class="page-box">
    <page-box :total="100" @on-change="changePage"></page-box>
  </div>
</template>

<script>
export default {
  name: 'page5',
  methods: {
    changePage (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  padding-top: 20px;
  text-align: center;
}
</style>
