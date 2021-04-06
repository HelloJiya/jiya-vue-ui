import Vue from 'vue'
import IcsUI from 'main/index.js'
import App from './index.vue'
import 'packages/theme-chalk/src/index.scss'

Vue.use(IcsUI)

new Vue({// eslint-disable-line
  el: '#app',
  render: h => h(App)
})
