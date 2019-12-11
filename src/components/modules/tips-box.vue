<template>
  <div class="tips-box" @mouseout="showCont(false)" @mouseover="showCont(true)">
    <div class="tooltip-label" ref="tipsLabel"><slot></slot></div>
    <div class="tooltip-content" v-if="showTxt">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: 'tips-box',
  props: {
    content: {
      type: String // 类型：Array,String,Number,Object,Boolean,Function,Symbol
    },
    placement: {
      type: String, // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      default: 'top'
    }
  },
  data () {
    return {
      showTxt: true
    }
  },
  methods: {
    showCont (type) {
      if (type) {
        if (this.$refs.tipsLabel.clientWidth > this.content.length * 14) {
          this.showTxt = false
        } else {
          this.showTxt = true
        }
      } else {
        this.showTxt = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-box {
  position: relative;
  display: inline-block;
  &:hover {
    .tooltip-content {
      display: block;
    }
  }
  .tooltip-label {
    position: relative;
    overflow: hidden;
    width: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tooltip-label ,.tooltip-content {
    font-size: 14px;
  }
  .tooltip-content {
    position: absolute;
    z-index: 1;
    top: 30px;
    display: none;
    width: auto;
    margin: 0 auto;
    padding: 6px 10px;
    color: #fff;
    border-radius: 4px;
    background-color: #585e6b;

    will-change: top, left;
    &::before {
      position: absolute;
      top: -14px;
      left: 50%;
      width: 0;
      height: 0;
      margin-left: -8px;
      content: '';
      border-top: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #585e6b;
      border-left: 8px solid transparent;
    }
  }
}
</style>
