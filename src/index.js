/* */
import Demo from '../packages/demo/index.js'
import Layout from '../packages/layout/index.js'
import Table from '../packages/table/index.js'
import SearchForm from '../packages/search-form/index.js'

const components = [
  Demo,
  Layout,
  Table,
  SearchForm
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
  Layout,
  Table,
  SearchForm
}
