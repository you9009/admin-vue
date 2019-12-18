// import api from 'assets/js/api'
import router from 'src/router'

const state = {
  // 导航
  HomeMenuList: [
    {
      label: '说明',
      icon: 'ios-basketball',
      link: '/page-index',
      dec: '文字文字文字文字文字文字文字文字',
      name: 'page'
    },
    {
      label: '组件管理',
      icon: 'ios-baseball',
      dec: '文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字',
      children: [
        {
          label: '树形表格组件',
          link: '/page1',
          name: 'page1'
        },
        {
          label: 'Echarts组件',
          link: '/page2',
          name: 'page2'
        },
        {
          label: '日历组件',
          link: '/page4',
          name: 'page4'
        },
        {
          label: '分页组件',
          link: '/page5',
          name: 'page5'
        }
      ]
    },
    {
      label: '多嵌套导航',
      icon: 'md-baseball',
      children: [
        {
          label: '使用',
          icon: 'ios-basketball',
          children: [
            {
              label: '新增和启动',
              icon: 'md-basketball',
              children: [
                {
                  label: '新增',
                  link: '/page/4',
                  name: 'page'
                },
                {
                  label: '启动',
                  icon: 'ios-baseball',
                  children: [
                    {
                      label: '准备',
                      link: '/page/5',
                      name: 'page'
                    }
                  ]
                }
              ]
            },
            {
              label: '活跃分析',
              link: '/page/6',
              name: 'page'
            },
            {
              label: '时段分析',
              link: '/page/7',
              name: 'page'
            }
          ]
        },
        {
          label: '留存',
          icon: 'md-basketball',
          children: [
            {
              label: '用户留存',
              link: '/page/8',
              name: 'page'
            },
            {
              label: '流失用户',
              link: '/page/9',
              name: 'page'
            }
          ]
        },
        {
          icon: 'ios-basketball',
          label: '新增',
          link: '/page/10',
          name: 'page'
        }
      ]
    }
  ],
  keepList: [],
  tabPageList: [],
  tabPageActive: null,
  // 面包屑
  BreadcrumbList: [],
  // 导航选中
  HomeMenuActive: null,
  // 导航展开
  HomeMenuOpen: []
}

const getters = {
  HomeMenuList: state => state.HomeMenuList,
  keepList: state => state.keepList,
  tabPageList: state => state.tabPageList,
  tabPageActive: state => state.tabPageActive,
  BreadcrumbList: state => state.BreadcrumbList,
  HomeMenuActive: state => state.HomeMenuActive,
  HomeMenuOpen: state => state.HomeMenuOpen
}

const actions = {
// tab导航添加
  addPageTab ({ commit }, key) {
    commit('addPageTab', key)
  },
  // tab导航关闭
  delPageTab ({ commit }, key) {
    commit('delPageTab', key)
  },
  // 获取tab导航列表
  getDefaultTabList ({ commit }, key) {
    commit('getDefaultTabList', key)
  },
  // 跳转首页
  goHome ({ commit }) {
    commit('goHome')
  },
  // 导航选择
  HomeMenuSelect ({ commit }, key) {
    commit('HomeMenuSelect', key)
  }
}

const mutations = {
  addPageTab (state, key) {
    if (key.link) {
      let list = state.tabPageList
      if (list.length) {
        let isBool = true
        for (let i = 0; i < list.length; i++) {
          const element = list[i]
          if (element.link == key.link) {
            isBool = false
          }
        }

        if (isBool) {
          list.push(key)
        }
      } else {
        list = [key]
      }

      state.tabPageList = list
      state.tabPageActive = key.link
      this._vm.VueCookie.set('MENU', key)
      this._vm.VueCookie.set('TABPAGELIST', JSON.stringify(list))
      // 页面缓存
      let keepList = []
      for (let i = 0; i < list.length; i++) {
        const element = list[i]
        keepList.push(element.name)
      }
      state.keepList = keepList

      // 页面跳转
      router.replace(key.link)
    }
  },

  delPageTab (state, key) {
    let list = []
    state.tabPageList = key
    if (key.length) {
      let isBool = true
      for (let i = 0; i < key.length; i++) {
        const element = key[i]
        list.push(element.name)

        if (element.link == state.tabPageActive) {
          isBool = false
        }
      }
      if (isBool) {
        let item = key[key.length - 1]
        this.dispatch('addPageTab', item)
      }
      this._vm.VueCookie.set('TABPAGELIST', JSON.stringify(state.tabPageList))
    } else {
      state.tabPageActive = null
      this._vm.VueCookie.remove('TABPAGELIST')
      this._vm.VueCookie.remove('MENU')

      router.replace('/home')
    }
    // 页面缓存
    state.keepList = list
  },

  getDefaultTabList (state, key) {
    let list = key.list
    let active = key.active
    if (list) {
      state.tabPageList = JSON.parse(list)
      this.dispatch('addPageTab', active)
    }
  },

  goHome (state) {
    this._vm.VueCookie.remove('HomeMenuActive')

    state.HomeMenuActive = null
    state.HomeMenuOpen = []
    state.BreadcrumbList = []

    this.dispatch('delPageTab', [])

    router.push('/home')
  },

  HomeMenuSelect (state, name) {
    let list = name.length > 1 ? name.split('-') : [name]
    let active = name.length > 1 ? name : Number(name)
    this._vm.VueCookie.set('HomeMenuActive', name)

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
      let bread1 = state.HomeMenuList[list[0]]
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

    state.HomeMenuActive = active
    state.HomeMenuOpen = open
    state.BreadcrumbList = bread

    let tablen = bread.length
    if (tablen) {
      let key = bread[tablen - 1]
      key.active = active
      this.dispatch('addPageTab', key)
    }
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
