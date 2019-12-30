import '@/assets/font/font-face.css'
import '@/assets/iconfont/iconfont.css'
import Vue from 'vue'
import store from '@/store'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
