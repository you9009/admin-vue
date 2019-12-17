<template>
  <div class="online">
    <h2>默认选中当前日期</h2>
    <h2>左右切换月份</h2>
    <h2>可右键添加删除事件</h2>
    <calendar-box :data="list1" @on-add="addItem" @on-remove="removeItem"></calendar-box>
  </div>
</template>

<script>
export default {
  name: 'page4',
  data () {
    return {
      list1: [
        {
          time: '2019-09-2',
          title: '标题1',
          content: '内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1'
        },
        {
          time: '2019-10-4',
          title: '标题2',
          content: '内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2'
        },
        {
          time: '2019-11-6',
          title: '标题3',
          content: '内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3内容3'
        },
        {
          time: '2019-12-8',
          title: '标题4',
          content: '内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4'
        },
        {
          time: '2020-1-10',
          title: '标题5',
          content: '内容5内容5内容5内容5内容5内容5内容5内容5内容5内容5内容5内容5内容5'
        }
      ]
    }
  },
  methods: {
    addItem (data) {
      let list = this.list1
      list.push(data)
      this.$forceUpdate()
    },
    removeItem (data) {
      let len = null
      let list = this.list1
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        if (element.time == data.remove) {
          len = i
        }
      }
      this.list1.splice(len, 1)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.online {
  width: 500px;
  font-size: 14px;
  margin: 0 auto;
}
</style>
