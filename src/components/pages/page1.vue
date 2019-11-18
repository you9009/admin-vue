<template>
  <div class="page">
    <table-tree :loading="loading" border :columns="columns" :data="HomeMenuList">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="submit(row)">按钮</Button>
      </template>
    </table-tree>
    <div class="page-box">
      <page-box :total="100" @on-change="changePage"></page-box>
    </div>
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
      ]
    }
  },
  computed: {
    ...mapGetters([
      'HomeMenuList'
    ])
  },
  methods: {
    changePage (e) {
      console.log(e)
    },
    submit (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  font-size: 20px;
  .page-box {
    padding-top: 20px;
    text-align: center;
  }
}
</style>
