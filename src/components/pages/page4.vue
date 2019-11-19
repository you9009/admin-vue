<template>
  <div class="online">
    <calendar-box :data="list1"></calendar-box>
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
  }
}
</script>

<style lang="scss" scoped>
.online {
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: center;
}
</style>
