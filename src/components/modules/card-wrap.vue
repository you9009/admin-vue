<template>
  <div class="card-wrap" :class="{'card-content':!disHover}">
    <div class="card-header" v-if="showTitle">
      <slot name="title" v-if="!title"></slot>
      {{title}}
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-wrap',
  data () {
    return {
      showTitle: true
    }
  },
  props: {
    title: {
      type: String // 类型：Array,String,Number,Object,Boolean,Function,Symbol
    },
    disHover: {
      type: [Boolean, String], // 类型：Array,String,Number,Object,Boolean,Function,Symbol
      default: false
    }
  },
  mounted () {
    this.showTitle = this.$slots.title || this.title
  }
}
</script>

<style lang="scss" scoped>
.card-wrap {
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-color: #e8eaec;
  border-radius: 4px;
  background: #fff;
  .card-header {
    line-height: 1;
    padding: 14px 16px;
    border-bottom: 1px solid #e8eaec;
  }
  .card-body {
    padding: 16px;
  }
}
.card-content {
  position: relative;
  display: block;
  transition: all .2s ease-in-out;
  &:hover {
    border-color: #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }
}
</style>
