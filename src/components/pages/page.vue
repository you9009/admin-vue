<template>
  <div class="wrap">{{page}}</div>
</template>

<script>
export default {
  name: 'page',
  computed: {
    page () {
      let route = this.$route
      return route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 20px;
}
</style>
