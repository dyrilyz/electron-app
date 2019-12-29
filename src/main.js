import Vue from 'vue'
import store from '@/store'
import App from './App.vue'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
