<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'alertMessage'
    ])
  },
  methods: {
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
#app {
  font-size: 0;
  line-height: 1.4;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  color: #2c3e50;
}
</style>
