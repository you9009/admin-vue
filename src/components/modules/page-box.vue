<template>
  <div class="page-wrap">
    <div class="page-item page-hover page-prev none" v-if="page == 1"><span></span></div>
    <div class="page-item page-hover page-prev" v-if="page > 1" @click="prevPage"><span></span></div>

    <div class="page-item page-hover" v-if="prevMore" @click="firstPage">1</div>
    <div class="page-lue" v-if="prevMore">&hellip;</div>
    <div v-for="li in sum" :key="li"  class="page-item page-hover" :class="{'active':page==li}" @click="selectPage(li)">{{li}}</div>
    <div class="page-lue" v-if="nextMore">&hellip;</div>
    <div class="page-item page-hover" v-if="nextMore" @click="LastPage">{{number}}</div>

    <div class="page-item page-hover page-next" v-if="page < number" @click="nextPage"><span></span></div>
    <div class="page-item page-hover page-next none" v-if="page == number"><span></span></div>

    <div class="page-options">
      <p>跳到</p>
      <input class="page-item" :value="page" type="text" @keyup.enter="jumpPage">
      <p>页面</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      max: 3,
      page: 1,
      number: 0,
      prevMore: false,
      nextMore: false
    }
  },
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  created () {
    let len = parseFloat(this.total) / 10
    this.number = Math.ceil(len)
    if (this.number > this.max) {
      this.nextMore = true
    }
  },
  computed: {
    sum () {
      let len = this.max
      let n = 1
      let list = this.number
      let num = []
      if (this.number >= len) {
        if (this.page > 2 && this.page < this.page - 1) {
          n = Number(this.page) - 1
          list = Number(this.page) + 1
        } else {
          if (this.page <= 2) {
            n = 1
            list = len
          } else if (this.page == list) {
            n = list - 2
            list = this.number
          } else {
            n = this.page - 1
            list = this.page + 1
          }
        }
      }

      while (n <= list) {
        num.push(n)
        n++
      }

      return num
    }
  },
  methods: {
    // 数字按钮
    selectPage (key) {
      this.page = key
      this.$emit('on-change', key)
    },
    // 输入框
    jumpPage (e) {
      let now = Number(e.target.value)
      if (now <= this.number) {
        this.selectPage(now)
      }
    },
    // 首页
    firstPage () {
      this.selectPage(1)
      if (this.number > this.max) {
        this.prevMore = false
        this.nextMore = true
      }
    },
    // 尾页
    LastPage () {
      this.selectPage(this.number)
      if (this.number > this.max) {
        this.prevMore = true
        this.nextMore = false
      }
    },
    // 上一个
    prevPage () {
      this.page--
      this.selectPage(this.page)
      if (this.page + 1 == this.number) {
        this.nextMore = false
      } else {
        this.nextMore = true
      }
      if (this.page + 1 == this.max) {
        this.prevMore = false
      }
    },
    // 下一个
    nextPage () {
      this.page++
      this.selectPage(this.page)
      if (this.page <= this.max) {
        this.nextMore = true
        this.prevMore = true
      }
      if (this.page + 1 == this.number) {
        this.nextMore = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  .page-lue {
    font-size: 14px;
    display: inline-block;
    margin: 0 8px;
    vertical-align: middle;
    color: #989898;
  }
  .page-item {
    font-size: 14px;
    line-height: 34px;
    display: inline-block;
    width: 34px;
    height: 34px;
    margin: 0 8px;
    cursor: pointer;
    user-select: none;
    text-align: center;
    vertical-align: middle;
    color: #989898;
    border-radius: 2px;
    background-color: #f8f8f8;
  }
  .page-box {
    width: 50px;
  }
  .page-next ,.page-prev {
    font-size: 0;
    span {
      width: 0;
      height: 0;
    }
  }
  .page-prev {
    span {
      border-top: 7px solid transparent;
      border-right: 6px solid #989898;
      border-bottom: 7px solid transparent;
    }
  }
  .page-next {
    span {
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 6px solid #989898;
    }
  }
  .page-options {
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
    p {
      font-size: 14px;
      display: inline-block;
      user-select: none;
      vertical-align: middle;
      color: #2d8cf0;
    }
    input {
      padding: 0 4px;
      cursor: auto;
      color: #454545;
      border: 1px solid #d4d5d7;
      background-color: #fff;
    }
  }
  .page-hover {
    &:hover {
      color: #fff;
      border-color: #2d8cf0;
      background-color: #2d8cf0;
      span {
        border-right-color: #fff;
        border-left-color: #fff;
      }
    }
  }
  .active {
    color: #fff;
    border-color: #2d8cf0;
    background-color: #2d8cf0;
  }
  .none {
    &:hover {
      cursor: not-allowed;
      color: #989898;
      border-color: #d4d5d7;
      background-color: #f8f8f8;
      span {
        border-right-color: #989898;
        border-left-color: #989898;
      }
    }
  }
}
</style>
