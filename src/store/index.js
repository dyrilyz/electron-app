import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer, remote} from 'electron'
import {configAction} from '@/database-api'
import {KEY_THEME} from "@/constant"

const win = remote.getCurrentWindow()
const state = {
  theme: 'theme-red',
  winId: -1,
  isMaximize: false,
  isAlwaysOnTop: win.isAlwaysOnTop(),
  platform: process.platform,
}

const getters = {
  getTheme: state => state.theme,
  getIsMaximize: state => state.isMaximize,
  getIsAlwaysOnTop: state => state.isAlwaysOnTop,
  getPlatform: state => state.platform
}

const mutations = {
  setTheme(state, theme) {
    if (theme) {
      state.theme = theme
      configAction.setConfig(KEY_THEME, theme)
    }
  },
  minimize() {
    win.minimize()
  },
  maximize() {
    win.maximize()
  },
  unmaximize() {
    win.unmaximize()
  },
  close() {
    win.close()
  },
  setMaximize(state, data) {
    if (state.isMaximize !== data) {
      state.isMaximize = data
    }
  },
  alwaysOnTop(state) {
    state.isAlwaysOnTop = !state.isAlwaysOnTop
    win.setAlwaysOnTop(state.isAlwaysOnTop)
  },
  openSetting(state, url) {
    const data = {
      url,
      opt: {
        modal: true,
        width: 600,
        height: 650,
        minWidth: 600,
        minHeight: 650,
        maxWidth: 600,
        maxHeight: 650,
      },
      parentId: win.id,
    }
    ipcRenderer.send('open-window', data)
  },
}

const actions = {
  syncWindow({state}) {
    ipcRenderer.send('notify', {eName: 'sync-store', data: {state}})
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({state, getters, mutations, actions})

async function init() {
  const themeObj = await configAction.getConfig(KEY_THEME)
  if (themeObj) {
    await store.commit('setTheme', themeObj.value)
  }
}

init()

ipcRenderer.on('win-maximize', (e, data) => {
  store.commit('setMaximize', data)
})

ipcRenderer.on('sync-store', (e, {state}) => {
  Object.assign(store.state, state)
})

export default store
