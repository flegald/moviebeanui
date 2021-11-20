import Vue from 'vue'
import App from './App.vue'
import { store } from '@/state/state'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import router from '@/router'

Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  router,
  data: { ...store },
  render: h => h(App)
}).$mount('#app')
