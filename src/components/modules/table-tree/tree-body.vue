<template>
  <ul class="table-body">
    <li v-for="(item,index) in data" :key="index">
      <table>
        <colgroup><col v-for="(li,val) in columns" :key="val" :width="li.width"></colgroup>
        <tbody v-if="treeStart">
          <tr>
            <td :class="[li.align ? 'table-line-' + li.align : '' , val == 0 ? 'table-level-' + item.level : '']" v-for="(li,val) in columnsList" :key=" val">
              <div class="table-tr-children table-tr-text">
                <table-slot v-if="li.typeKey=='slot'" :row="item" :column="li" :index="index"></table-slot>
                <table-expand v-if="li.typeKey=='render'" :row="item" :column="li" :index="index" :render="li.render"></table-expand>
                <template v-if="li.typeKey=='normal'">
                  <div class="table-tr-tooltip" v-if="li.tooltip">
                    <tips-box :content="item[li.key]">{{item[li.key]}}</tips-box>
                  </div>
                  <template v-else>
                    <Icon :type="item.expand ?'ios-arrow-down':'ios-arrow-forward'" class="table-tr-children-icon" v-if="val==0&&item.children" @click="reversal(item)" />
                    <span :class="{'none-icon':val==0&&!item.children}">{{item[li.key]}}</span>
                  </template>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <tree-body :columns="columnsList" :data="item.children" v-if="item.expand"></tree-body>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'tree-body',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
      treeStart: true
    }
  },
  computed: {
    columnsList () {
      let data = this.columns
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        element.typeKey = 'normal'
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            if (key == 'render') {
              element.typeKey = 'render'
            }
            if (key == 'slot') {
              element.typeKey = 'slot'
            }
          }
        }
      }
      return data
    }
  },
  components: {
    TableExpand: () => import('./expand'),
    TableSlot: () => import('./slot')
  },
  methods: {
    reversal (item) {
      this.treeStart = false
      this.$nextTick(() => {
        this.treeStart = true
        item.expand = !item.expand
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-bottom: 1px solid #e8eaec;
  tr {
    td {
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
.table-body {
  tr {
    &:hover {
      background-color: #ebf7ff;
    }
  }
}
.table-box-border {
  td ,th {
    border-right: 1px solid #e8eaec;
  }
}
.table-tr-children {
  box-sizing: border-box;
  padding-right: 10px;
  padding-left: 10px;
  word-break: break-all;
}
.table-tr-children-icon {
  margin-right: 4px;
  cursor: pointer;
}
.table-tr-text {
  font-size: 14px;
}
.none-icon {
  padding-left: 16px;
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
@for $n from 0 through 10 {
  .table-level-#{$n} {
    box-sizing: border-box;
    padding-left: 18px * $n;
  }
}
.table-tr-tooltip {
  width: 100%;
  .tips-box {
    width: 100%;
  }
}
</style>
