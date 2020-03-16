import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/windows/Main'
import Setting from '@/windows/Setting'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/main',
}, {
  path: '/main',
  name: 'main',
  component: Main,
  redirect: '/main/home',
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/Home')
    }
  ],
}, {
  path: '/setting',
  name: 'setting',
  component: Setting
}]

const router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  console.log(to)
  next()
})
export default router
