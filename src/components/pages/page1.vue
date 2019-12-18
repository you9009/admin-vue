<template>
  <div class="page">
    <ul>
      <li v-for="(item, index) in tipsList" :key="index">{{item}}</li>
    </ul>
    <table-tree :loading="loading" border :columns="columns" :data="HomeMenuList">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="submit(row)">按钮</Button>
      </template>
    </table-tree>

    <Modal
        title="内容"
        v-model="modal.show"
        :mask-closable="false">
        {{modal.main.label}}
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'page3',
  data () {
    return {
      loading: false,
      columns: [
        {
          width: 200,
          title: '名称',
          key: 'label'
        },
        {
          title: '路由',
          key: 'link'
        },
        {
          title: '说明',
          key: 'dec',
          tooltip: true
        },
        {
          width: 80,
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      modal: {
        show: false,
        main: {}
      },
      tipsList: [
        '展开关闭树形表格',
        '可异步加载子节点',
        '根据需求添加展示字段',
        '根据相关属性选择是否显示长文本',
        'slot插槽 - 按钮事件'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'HomeMenuList'
    ])
  },
  methods: {
    submit (e) {
      this.modal = {
        show: true,
        main: e
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  font-size: 14px;
  ul {
    margin-bottom: 20px;
    li {
      margin-left: 20px;
      list-style-type: initial;
    }
  }
}
</style>
