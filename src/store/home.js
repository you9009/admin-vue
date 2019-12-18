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
          label: '树形表格',
          link: '/page1',
          name: 'page1'
        },
        {
          label: '自定义Echarts类型',
          link: '/page2',
          name: 'page2'
        },
        {
          label: '日历',
          link: '/page4',
          name: 'page4'
        },
        {
          label: '分页',
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
        }
      ]
    }
  ],
  keepList: [],
  tabPageList: [],
  tabPageActive: null
}

const getters = {
  HomeMenuList: state => state.HomeMenuList,
  keepList: state => state.keepList,
  tabPageList: state => state.tabPageList,
  tabPageActive: state => state.tabPageActive
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
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
