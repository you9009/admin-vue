<template>
  <div id="app" :style="{minWidth:Wid}">
    <router-view v-if="webPC" />
    <div class="tips" v-else>
      <p>当前页面为后台管理品台</p>
      <p>请使用电脑浏览</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'alertMessage',
      'webPC'
    ]),
    Wid () {
      let wid = '1100px'
      if (this.webPC) {
        wid = '1100px'
      } else {
        wid = '100vw'
      }
      return wid
    }
  },
  mounted () {
    this.judge()
    window.addEventListener('resize', this.judge)
  },
  methods: {
    ...mapActions([
      'judge'
    ]),
    changeMsg (val) {
      if (val.code) {
        if (val.code === 200) {
          this.$Message.success({
            content: val.info,
            duration: 2
          })
        } else {
          this.$Message.error({
            content: val.info,
            duration: 2
          })
        }
      }
    }
  },
  watch: {
    alertMessage: {
      handler: 'changeMsg',
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  font-size: 8vw;
  text-align: center;
}
</style>
