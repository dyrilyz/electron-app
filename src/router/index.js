import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/windows/Main'
import Setting from '@/windows/Setting'
import Modal from "@/windows/Modal"

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
    meta: {topTitle: '设置', title: '系统设置'},
    component: () => import('@/views/Main/Settings')
  }, {
    path: 'table',
    name: 'table',
    meta: {topTitle: '设置', title: '数据库设计'},
    redirect: {name: 'tableList'},
    component: () => import('@/components/Pages'),
    children: [{
      path: 'list',
      name: 'tableList',
      component: () => import('@/views/Main/Tables')
    }]
  }]
}

const settingRouter = {
  path: '/setting-win',
  name: 'setting-win',
  component: Setting
}

const modalRouter = {
  path: '/modal-win',
  name: 'modal-win',
  component: Modal,
  children: [{
    path: 'table-modal',
    name: 'table-modal',
    component: () => import('@/views/Modal/TableModal')
  }, {
    path: 'table-field-modal',
    name: 'table-field-modal',
    component: () => import('@/views/Modal/FieldModal')
  }]
}

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  mainRouter,
  settingRouter,
  modalRouter,
]

const router = new VueRouter({routes})

export default router
export {
  mainRouter,
  settingRouter
}
