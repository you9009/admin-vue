<template>
  <div class="table-wrap">
    <div class="table-spin-box" v-if="loading"><Spin size="large" fix></Spin></div>
    <div class="table-box" :class="{'table-box-border':border}" v-else>
      <div class="table-header">
        <table>
          <colgroup><col v-for="(item,index) in columns" :key="index" :width="item.width"></colgroup>
          <thead>
            <tr>
              <th :class="item.align?'table-line-'+item.align:''" v-for="(item,index) in columns" :key="index">
                <div class="table-tr-children table-tr-text">{{item.title}}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <tree-body :columns="columns" :data="dataList"></tree-body>
      <table v-if="!dataList.length">
        <tr><td class="table-line-center">暂无数据</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-table',
  provide () {
    return {
      tableRoot: this
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  components: {
    treeBody: () => import('./tree-body')
  },
  computed: {
    dataList: {
      get () {
        let list = JSON.parse(JSON.stringify(this.data))
        let data = this.loopData(list, 0)
        return data
      },
      set () {}
    }
  },
  methods: {
    loopData (data, index) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        element.expand = true
        element.level = index
        if (element.children) {
          this.loopData(element.children, index + 1)
        }
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  font-size: 0;
  position: relative;
  border: 1px solid #dcdee2;
  border-right: 0;
  border-bottom: 0;
  .table-spin-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100px;
    border: 1px solid #dcdee2;
    border-top: none;
    border-left: none;
  }
  .table-box {
    font-size: 12px;
    box-sizing: border-box;
    width: inherit;
    max-width: 100%;
    height: 100%;
    color: #515a6e;
    background-color: #fff;
  }
  .table-box-border {
    td ,th {
      border-right: 1px solid #e8eaec;
    }
  }
  .table-header {
    font-weight: bold;
    background-color: #f8f8f9;
  }
  .table-tr-children {
    box-sizing: border-box;
    padding-right: 10px;
    padding-left: 10px;
    word-break: break-all;
  }
  .table-tr-text {
    font-size: 14px;
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-bottom: 1px solid #e8eaec;
    tr {
      td ,th {
        box-sizing: border-box;
        min-width: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: left;
        vertical-align: middle;
        text-overflow: ellipsis;
      }
    }
  }
  .table-line-left {
    text-align: left;
  }
  .table-line-right {
    text-align: right;
  }
  .table-line-center {
    text-align: center;
  }
}
</style>
