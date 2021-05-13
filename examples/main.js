import Vue from 'vue'
import App from './index.vue'
import Element from 'element-ui'
import IcsUI from 'main/index.js'
import 'packages/theme-chalk/src/index.scss'

Vue.use(Element)
Vue.use(IcsUI)

new Vue({// eslint-disable-line
  el: '#app',
  render: h => h(App)
})
