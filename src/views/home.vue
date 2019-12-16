<template>
  <Layout class="Home">
    <Sider class="Sider" ref="HomeSide" width="300">
      <div ref="HomeLogo" class="Logo"><p @click="goHome">管理平台</p></div>

      <div class="Menu">
        <Menu ref="HomeMenu" theme="dark" accordion width="auto" class="Menu-box" :active-name="HomeMenuActive" :open-names="HomeMenuOpen" @on-select="HomeMenuSelect">
          <span v-for="(item, index) in HomeMenuList" :key="index">
            <Submenu :name="index" v-if="item.children">
              <template slot="title"><Icon :type="item.icon" />{{item.label}}</template>

              <span v-for="(li, indx) in item.children" :key="indx">
                <Submenu :name="index+'-'+indx" v-if="li.children">
                  <template slot="title"><Icon :type="li.icon" />{{li.label}}</template>

                  <span v-for="(i, iv) in li.children" :key="iv">
                    <Submenu :name="index+'-'+indx+'-'+iv" v-if="i.children">
                      <template slot="title"><Icon :type="i.icon" />{{i.label}}</template>

                      <span v-for="(j, jv) in i.children" :key="jv">
                        <Submenu :name="index+'-'+indx+'-'+iv+'-'+jv" v-if="j.children">
                          <template slot="title"><Icon :type="j.icon" />{{j.label}}</template>
                          <MenuItem :name="index+'-'+indx+'-'+iv+'-'+jv+'-'+kv" v-for="(k, kv) in j.children" :key="kv"><Icon :type="k.icon" />{{k.label}}</MenuItem>
                        </Submenu>
                        <MenuItem :name="index+'-'+indx+'-'+iv+'-'+jv" :to="j.link" v-else><Icon :type="j.icon" />{{j.label}}</MenuItem>
                      </span>

                    </Submenu>
                    <MenuItem :name="index+'-'+indx+'-'+iv" :to="i.link" v-else><Icon :type="i.icon" />{{i.label}}</MenuItem>
                  </span>

                </Submenu>
                <MenuItem :name="index+'-'+indx" :to="li.link" v-else><Icon :type="li.icon" />{{li.label}}</MenuItem>
              </span>

            </Submenu>
            <MenuItem :name="index" :to="item.link" v-else><Icon :type="item.icon" />{{item.label}}</MenuItem>
          </span>
        </Menu>
      </div>
    </Sider>

    <Layout class="Layout">
      <Header class="Header" ref="HomeHeader">
        <div class="Header-box">
          <Breadcrumb>
            <BreadcrumbItem><Icon type="md-home" size="18" style="margin-right:6px"></Icon>Home</BreadcrumbItem>
            <BreadcrumbItem v-for="(item, index) in BreadcrumbList" :key="index">{{item.label}}</BreadcrumbItem>
          </Breadcrumb>
          <Poptip placement="bottom">
            <div class="Badge"><Avatar shape="square" icon="ios-person" /><span class="name">{{userInfo.name}}</span></div>
            <ul slot="content" class="user-handle">
              <li class="red" @click="Exit">退出</li>
            </ul>
          </Poptip>
        </div>
        <label-tab :data="tabPageList" :active="tabPageActive" @on-click="addTab" @on-close="closeTab"></label-tab>
      </Header>

      <Content class="Content">
        <div class="content-box">
          <keep-alive :include="keepList">
            <router-view/>
          </keep-alive>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      // 面包屑
      BreadcrumbList: [],
      // 导航选中
      HomeMenuActive: null,
      // 导航展开
      HomeMenuOpen: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'HomeMenuList',
      'tabPageList',
      'tabPageActive',
      'keepList'
    ])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'exit',
      'getUserInfo',
      'addPageTab',
      'delPageTab',
      'getDefaultTabList'
    ]),
    // 默认事件
    init () {
      this.getUserInfo()

      // 登录后默认导航设置
      let list = this.VueCookie.get('TABPAGELIST')
      let active = this.VueCookie.get('MENU')
      this.getDefaultTabList({ list, active })

      let key = this.VueCookie.get('HomeMenuActive')
      if (key) {
        this.HomeMenuSelect(key)
      } else {
        this.HomeMenuSelect(0)
      }
    },

    // 导航选择
    HomeMenuSelect (name) {
      let list = name.length > 1 ? name.split('-') : [name]
      let active = name.length > 1 ? name : Number(name)
      this.VueCookie.set('HomeMenuActive', name)

      let open = []
      open.length = list.length - 1
      for (let i = 0; i < open.length; i++) {
        let open1 = list[0]
        if (open1) {
          open[0] = Number(open1)
          let open2 = open1 + '-' + list[1]
          if (open2 && list[1] !== undefined) {
            open[1] = open2
            let open3 = open2 + '-' + list[2]
            if (open3 && list[2] !== undefined) {
              open[2] = open3
              let open4 = open3 + '-' + list[3]
              if (open4 && list[3] !== undefined) {
                open[3] = open4
                let open5 = open4 + '-' + list[4]
                if (open5 && list[4] !== undefined) {
                  open[4] = open5
                }
              }
            }
          }
        }
      }

      let bread = []
      for (let i = 0; i < list.length; i++) {
        let bread1 = this.HomeMenuList[list[0]]
        if (bread1) {
          bread[0] = bread1
          let bread2 = bread1.children ? bread1.children[list[1]] : undefined
          if (bread2) {
            bread[1] = bread2
            let bread3 = bread2.children ? bread2.children[list[2]] : undefined
            if (bread3) {
              bread[2] = bread3
              let bread4 = bread3.children ? bread3.children[list[3]] : undefined
              if (bread4) {
                bread[3] = bread4
                let bread5 = bread4.children ? bread4.children[list[4]] : undefined
                if (bread5) {
                  bread[4] = bread5
                }
              }
            }
          }
        }
      }

      this.HomeMenuActive = active
      this.HomeMenuOpen = open
      this.BreadcrumbList = bread

      let tablen = bread.length
      if (tablen) {
        let key = bread[tablen - 1]
        key.active = active
        this.addPageTab(key)
      }

      this.updatePage()
    },

    // tab切换
    addTab (data) {
      this.addPageTab(data)
      this.HomeMenuSelect(data.active)
    },

    // tab关闭
    closeTab (data) {
      this.delPageTab(data)
      if (!data.length) {
        this.goHome()
      } else {
        this.HomeMenuSelect(data[data.length - 1].active)
      }
    },

    // 跳转首页
    goHome () {
      this.VueCookie.remove('HomeMenuActive')

      this.HomeMenuActive = null
      this.HomeMenuOpen = []
      this.BreadcrumbList = []

      this.delPageTab([])
      this.updatePage()

      this.$router.push('/home')
    },

    // 退出
    Exit () {
      this.goHome()
      this.closeTab([])
      this.exit()
    },

    // 刷新页面
    updatePage () {
      if (this.$refs.HomeMenu) {
        this.$nextTick(() => {
          this.$refs.HomeMenu.updateOpened()
          this.$refs.HomeMenu.updateActiveName()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Home {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.Sider {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #363e4f;
  .Logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 20px 0;
    p {
      font-size: 20px;
      font-weight: bold;
      overflow: hidden;
      width: 80%;
      margin: 0 auto;
      padding: 10px 0;
      cursor: pointer;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      background-color: #5b6270;
    }
  }
  .Menu {
    overflow: hidden;
    height: 88%;
    margin-top: 88px;
    .Menu-box {
      overflow-y: auto;
      height: 100%;
      background-color: #363e4f;
    }
  }
}
.Layout {
  position: relative;
  .Header {
    position: absolute;
    z-index: 2;
    width: 100%;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    .Header-box {
      display: flex;
      flex-direction: row;
      padding-right: 30px;
      padding-left: 20px;

      justify-content: space-between;
      align-items: center;
      .ivu-breadcrumb {
        width: 80%;
      }
      .ivu-poptip {
        line-height: 1;
        width: 20%;
        text-align: right;
      }
      .user-handle {
        li {
          font-size: 14px;
          padding: 2px 0;
          cursor: pointer;
          text-align: center;
        }
      }
      .Badge {
        cursor: pointer;
      }
      .name {
        font-size: 14px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
  .Content {
    overflow-y: auto;
    margin-top: 110px;
    margin-bottom: 10px;
    .content-box {
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      min-height: 100%;
      margin: 0 10px;
      padding: 20px;
      border: 1px solid #e8eaec;
      background-color: #fff;
    }
  }
}
</style>
