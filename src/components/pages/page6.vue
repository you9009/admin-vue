<template>
  <div class="online">
    <Card class="card" v-for="(item, index) in canvasList" :key="index">
      <div class="title" slot="title">{{item.name}}</div>
      <canvas class="canvas" :id="item.id"></canvas>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'page6',
  data () {
    return {
      canvasList: [
        {
          name: '线',
          id: 'line'
        },
        {
          name: '圆',
          id: 'circle'
        },
        {
          name: '文本',
          id: 'text'
        },
        {
          name: '渐变',
          id: 'gradual'
        },
        {
          name: '图片',
          id: 'image'
        }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
    }
  }
}
</script>

<style lang="scss" scoped>
.online{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  .card{
    width: 48%;
    margin-bottom: 20px;
    .title{
      font-weight: bold;
      font-size: 16px;
    }
    .canvas{
      width: 100%;
      height: 400px;
      background-color: #fc0;
    }
  }
}
</style>
