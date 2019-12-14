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
