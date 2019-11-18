import modules from 'components/modules'

const VueModule = {
  install: function (Vue) {
    for (const key in modules) {
      if (modules.hasOwnProperty(key)) {
        const element = modules[key]
        Vue.component(key, () => import('components/modules/' + element))
      }
    }
  }
}
export default VueModule
