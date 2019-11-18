<template>
  <div class="not-found">
    <div class="box">
      <img :src="notfound" alt="">
      <Button size="large" type="primary" shape="circle" @click="goHome">返回首页</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      notfound: require('assets/img/notfound.png')
    }
  },
  methods: {
    goHome () {
      sessionStorage.removeItem('HomeMenuActive')

      this.HomeMenuActive = null
      this.HomeMenuOpen = []
      this.BreadcrumbList = []

      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #5c5e64;

  align-items: center;
  justify-content: center;
  .box {
    display: flex;
    flex-direction: column;
    margin-top: -100px;

    align-items: center;
    justify-content: center;
    a {
      color: #fff;
    }
  }
}
</style>
