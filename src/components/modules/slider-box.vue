<template>
  <div class="slider" :class="{'online':vertical}" :style="sliderStyle" ref="slider">
    <div class="process" :style="processStyle"></div>
    <div class="thunk" ref="trunk" :style="thunkStyle">
      <div class="block"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'slider-box',
  props: {
    value: {
      type: [String, Number], // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      required: true
    },
    min: {
      type: Number, // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      default: 0
    },
    max: {
      type: Number, // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      default: 100
    },
    size: {
      type: [Number, String], // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      default: 10
    },
    vertical: {
      type: Boolean, // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      default: false
    }
  },
  data () {
    return {
      slider: null,
      thunk: null,
      per: this.value
    }
  },
  // 渲染到页面的时候
  mounted () {
    this.slider = this.$refs.slider
    this.thunk = this.$refs.trunk
    let _this = this
    let scale = null
    let isBool = this.vertical

    this.thunk.onmousedown = function (e) {
      let width = parseInt(_this.processStyle.width)
      let height = parseInt(_this.processStyle.height)
      let disX = e.clientX
      let disY = e.clientY
      document.onmousemove = function (e) {
        if (isBool) {
          let newHeight = disY + height - e.clientY
          scale = newHeight / _this.slider.offsetHeight
        } else {
          let newWidth = e.clientX - disX + width
          scale = newWidth / _this.slider.offsetWidth
        }

        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
        _this.per = Math.max(_this.per, _this.min)
        _this.per = Math.min(_this.per, _this.max)
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
      return false
    }
  },
  computed: {
    scale () {
      let scaleNum = 0
      if (this.per) {
        scaleNum = (this.per - this.min) / (this.max - this.min)
      }
      this.per = (scaleNum * 100).toFixed(0)
      this.$emit('input', this.per)

      return scaleNum
    },
    processStyle () {
      let style = {}
      if (this.slider) {
        if (this.vertical) {
          style.height = this.slider.offsetHeight * this.scale + 'px'
        } else {
          style.width = this.slider.offsetWidth * this.scale + 'px'
        }
      }
      return style
    },
    sliderStyle () {
      let style = {}
      if (this.vertical) {
        style.width = this.size + 'px'
      } else {
        style.height = this.size + 'px'
      }

      return style
    },
    thunkStyle () {
      let style = {}
      if (this.slider) {
        let size = this.size * 2
        let nowSize = size > 14 ? size : 14
        if (this.vertical) {
          style.left = -(nowSize - this.size) / 2 + 'px'
          style.bottom = (this.slider.offsetHeight * this.scale) - (this.size / 2) + 'px'
        } else {
          style.left = (this.slider.offsetWidth * this.scale) - (this.thunk.offsetWidth / 2) + 'px'
          style.top = -(nowSize - this.size) / 2 + 'px'
        }
        style.width = nowSize + 'px'
        style.height = nowSize + 'px'
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  background: #e4e7ed;
  .process {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background: #409eff;
  }
  .thunk {
    position: absolute;
    overflow: hidden;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &:hover {
      box-shadow: 0 1px 4px 0 #b2b3b7;
      .block {
        transform: scale(1.4);
      }
    }
    .block {
      width: 100%;
      height: 100%;
      transition: .2s all;
      border-width: 4px;
      border-style: solid;
      border-color: #409eff;
      border-radius: 50%;
      background-color: #e4e7ed;
    }
  }
}
.online {
  display: inline-block;
  height: 100%;
}
</style>
