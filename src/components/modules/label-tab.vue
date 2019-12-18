<template>
  <div class="tab-main" @mouseleave="closeshow=false">
    <div class="direction" @click="prev"><Icon type="ios-arrow-back" /></div>
    <div class="nav-list" id="navbox">
      <div class="item-box" :style="{marginLeft:mleft+'px'}" id="tabbox">
        <div class="item" v-for="(li,index) in tabList" :key="index" :class="{active:li.link===active}">
          <div class="box" @click="linkTab(li)">
            <span></span>
            <div class="label-name" @mouseover="showTitle(true,li)" @mouseleave="showTitle(false,li)">{{li.label}}</div>
          </div>
          <div class="label-show" v-if="li.show">
            <div class="t-bold">{{li.label}}</div>
          </div>
          <Icon class="remove" type="ios-close" @click="removeTab(li)" />
        </div>
      </div>
    </div>
    <div class="close-box">
      <div class="direction" @click="next"><Icon type="ios-arrow-forward" /></div>
      <Icon class="direction icon" type="ios-close-circle" @click="showBox" />
      <div class="btn" v-if="closeshow" @click="hideBox">
        <p @click="closeAll">关闭所有</p>
        <p @click="closeOther">关闭其他</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'label-tab',
  props: {
    data: {
      type: Array, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: null
    },
    active: {
      type: String, // String, Number, Boolean, Function, Object, Array
      default: null
    }
  },
  data () {
    return {
      here: 0,
      multiple: 200,
      mleft: 0,
      closeshow: false
    }
  },
  computed: {
    tabList: {
      get () {
        let list = JSON.parse(JSON.stringify(this.data))
        for (let i = 0; i < list.length; i++) {
          const element = list[i]
          element.show = false
        }
        return list
      },
      set () {}
    }
  },
  methods: {
    // 失去焦点隐藏
    hideBox () {
      this.closeshow = false
    },
    // 关闭按钮
    showBox () {
      this.closeshow = true
    },
    // 左右切换
    prev () {
      if (this.here > 1) {
        this.here--
      } else {
        this.here = 0
      }

      this.mleft = -this.here * this.multiple
    },
    next () {
      let wid = document.getElementById('navbox').offsetWidth
      let all = document.getElementById('tabbox').offsetWidth + 50

      let len = (all - wid) / this.multiple

      if (this.here < len - 1) {
        this.here++
      } else {
        if (len > 0) {
          this.here = len
        } else {
          this.here = 0
        }
      }
      this.mleft = -this.here * this.multiple
    },
    // 切换tab
    linkTab (key) {
      this.$emit('on-click', key)
    },
    // 关闭其他
    closeOther () {
      let now = []
      let active = this.active
      let list = this.tabList
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          const element = list[key]
          if (element.link === active) {
            now[0] = element
          }
        }
      }
      this.$emit('on-close', now)
    },
    // 关闭全部
    closeAll () {
      this.mleft = 0
      let now = []
      this.$emit('on-close', now)
    },
    // 删除tab
    removeTab (now) {
      let nowList = []
      let active = now.link
      let list = this.tabList
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          const element = list[key]
          if (element.link !== active) {
            nowList.push(element)
          }
        }
      }
      if (nowList.length) {
        this.$emit('on-close', nowList)
      } else {
        this.closeAll()
      }
    },
    showTitle (type, item) {
      let list = this.tabList
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        element.show = false
      }
      if (type) {
        item.show = true
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-main {
  font-size: 0;
  line-height: 1.4;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  border-top: 1px solid #dcdee2;
  border-bottom: 1px solid #dcdee2;
  background-color: #e3e3e3;

  align-items: center;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  flex-direction: row;
  width: 100%;

  align-items: center;
  .item-box {
    display: flex;
    flex-direction: row;
    padding-right: 30px;

    align-items: center;
  }
  .item {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin: 4px;
    padding: 2px 0;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;

    align-items: center;
    .box {
      display: flex;
      flex-direction: row;
      height: 22px;

      align-items: center;
      span {
        display: flex;
        width: 12px;
        height: 12px;
        margin: 0 10px;
        border-radius: 100%;
        background-color: #e3e3e3;
      }
      .label-name {
        font-size: 14px;
        overflow: hidden;
        max-width: 200px;
        margin-right: 5px;
        white-space: nowrap;
        word-spacing: nowrap;
        text-overflow: ellipsis;
      }
    }
    .label-show {
      font-size: 12px;
      position: absolute;
      z-index: 2;
      top: 30px;
      left: 0;
      width: 100%;
      padding: 10px;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);

      .t-bold {
        font-size: 14px;
        font-weight: bold;
        color: #2c3e50;
      }
    }
    .remove {
      font-size: 22px;
      margin-right: 6px;
      &:hover {
        font-weight: bold;
        color: #ed4014;
      }
    }
  }
  .active {
    color: #2d8cf0;
    .box {
      span {
        background-color: #2d8cf0;
      }
    }
    .icon {
      color: #666;
    }
  }
}

.direction {
  font-size: 20px;
  position: relative;
  z-index: 2;
  display: flex;
  box-sizing: border-box;
  height: 34px;
  padding: 0 10px;
  cursor: pointer;
  background-color: #fff;

  align-items: center;
  justify-content: center;
}

.close-box {
  position: absolute;
  right: 0;
  display: flex;

  align-items: center;
  .icon {
    border-left: 1px solid #f5f5f5;
  }
  .btn {
    line-height: 1.4;
    position: absolute;
    z-index: 1;
    top: 34px;
    right: 0;
    width: 81px;
    padding: 5px 0;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    p {
      font-size: 14px;
      margin-top: 5px;
      padding: 0 12px;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
