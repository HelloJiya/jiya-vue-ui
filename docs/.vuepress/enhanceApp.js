import Element from 'element-ui';
// import IcsUI from '../../src/index.js'
import "../../packages/theme-chalk/src/index.scss"
// import IcsUI from '../../lib/index'
// import '../../lib/theme-chalk/index.css'
import pageComponents from '@internal/page-components'

export default async ({
  Vue,
  options,
  router,
  isServer
}) => {
  Vue.use(Element)
  // Vue.use(IcsUI)
  if(!isServer){
    await import('../../src/index.js').then(module=>{
      Vue.use(module.default)
    })
  }
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
