/* */
import Demo from '../packages/demo/index.js'
import Layout from '../packages/layout/index.js'

const components = [
  Demo,
  Layout
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  install,
  Demo,
  Layout
}
