<template>
  <div class="online">
    <Card class="card" v-for="(item, index) in canvasList" :key="index">
      <div class="title" slot="title">{{item.name}}</div>
      <canvas class="canvas" :id="item.id">Your browser does not support the canvas element.</canvas>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'page6',
  computed: {
    canvasList () {
      let data = [
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
        },
        {
          name: '多啦A梦',
          id: 'duola'
        }
      ]
      return data
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let list = this.canvasList
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        let cvsCtx = document.getElementById(element.id).getContext('2d')
        switch (i) {
          case 0:
            cvsCtx.moveTo(0, 0)
            cvsCtx.lineTo(200, 100)
            cvsCtx.stroke()
            break

          case 1:
            cvsCtx.beginPath()
            cvsCtx.arc(50, 50, 40, 0, 2 * Math.PI)
            cvsCtx.stroke()
            break

          case 2:
            cvsCtx.font = '30px bold'
            cvsCtx.fillText('Hello World', 10, 30)
            break

          case 3:
            let style = cvsCtx.createLinearGradient(0, 0, 200, 0)
            style.addColorStop(0, '#fc0')
            style.addColorStop(1, '#fff')
            cvsCtx.fillStyle = style
            cvsCtx.fillRect(0, 0, 200, 80)
            break

          case 4:
            let img = new Image()
            img.src = require('assets/img/notfound.png')
            let wid = (img.width / 3).toFixed()
            let hei = (img.height / 3).toFixed()
            img.onload = () => {
              setTimeout(() => {
                cvsCtx.drawImage(img, 0, 0, wid, hei)
                this.$forceUpdate()
              }, 200)
            }
            break

          case 5:
            console.log(1)
            break

          default:
            break
        }
      }
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
    }
  }
}
</style>
