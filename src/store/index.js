import Vue from 'vue'
import Vuex from 'vuex'
import {remote} from 'electron'
import getters from "@/store/getters"
import mutations from "@/store/mutations"
import actions from "@/store/actions"
import ipcListener from "@/store/ipcListener"
import tableModal from "@/store/modules/tableModal"
import {configAction} from '@/database-api'
import {KEY_THEME} from "@/constant"

const win = remote.getCurrentWindow()
const modules = {
  tableModal,
}
const state = {
  theme: 'theme-red',
  winId: -1,
  isMaximize: false,
  isAlwaysOnTop: win.isAlwaysOnTop(),
  platform: process.platform,
}

Vue.use(Vuex)

const store = new Vuex.Store({state, getters, mutations, actions, modules})

async function init() {
  const themeObj = await configAction.getConfig(KEY_THEME)
  if (themeObj) {
    await store.commit('setTheme', themeObj.value)
  }
}

init()

ipcListener(store)

export default store
