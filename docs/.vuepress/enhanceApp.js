import Element from 'element-ui';
import IcsUI from '../../src/index.js'
import "../../packages/theme-chalk/src/index.scss"
// import 'element-ui/lib/theme-chalk/index.css'
// import IcsUI from '../../lib/index'
// import '../../lib/theme-chalk/index.css'
import pageComponents from '@internal/page-components'

export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(Element)
  Vue.use(IcsUI)
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
