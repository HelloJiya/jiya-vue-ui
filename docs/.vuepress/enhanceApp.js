import IcsUI from '../../src/index.js'
import Element from 'element-ui';
import "../../packages/theme-chalk/src/index.scss"
// import 'element-ui/lib/theme-chalk/index.css'
// import IcsUI from '../../lib/index'
// import '../../lib/theme-chalk/index.css'

export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(IcsUI)
  Vue.use(Element)
}
