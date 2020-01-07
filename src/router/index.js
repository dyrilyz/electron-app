import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/windows/Main'
import Setting from '@/windows/Setting'

Vue.use(VueRouter)

const mainRouter = {
  path: '/main',
  name: 'main',
  component: Main,
  redirect: '/main/home',
  children: [{
    path: 'home',
    name: 'home',
    meta: {topTitle: '应用', title: '首页'},
    component: () => import('@/views/Main/Home')
  }, {
    path: 'pms',
    name: 'pms',
    meta: {topTitle: '应用', title: '禅道'},
    component: () => import('@/views/Main/PMS')
  }, {
    path: 'setting',
    name: 'setting',
    meta: {topTitle: '应用', title: '设置'},
    component: () => import('@/views/Main/Settings')
  }]
}

const settingRouter = {
  path: '/setting-win',
  name: 'setting-win',
  component: Setting
}

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  mainRouter,
  settingRouter
]

const router = new VueRouter({routes})

export default router
export {
  mainRouter,
  settingRouter
}
