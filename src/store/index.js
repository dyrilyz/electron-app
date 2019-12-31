import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer, remote} from 'electron'

const win = remote.getCurrentWindow()
const themeKey = '__theme_style'
console.log(win.id, win.isModal())

const state = {
  theme: 'theme-red',
  winId: -1,
  isMaximize: false,
  isAlwaysOnTop: win.isAlwaysOnTop()
}

const getters = {
  getTheme(state) {
    const theme = localStorage.getItem(themeKey)
    if (theme) {
      state.theme = theme
    }
    return state.theme
  },
  getIsMaximize: state => state.isMaximize,
  getIsAlwaysOnTop: state => state.isAlwaysOnTop
}

const mutations = {
  setTheme(state, theme) {
    if (theme) {
      localStorage.setItem(themeKey, theme)
      state.theme = theme
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
ipcRenderer.on('win-maximize', (e, data) => {
  store.commit('setMaximize', data)
})

ipcRenderer.on('sync-store', (e, {state}) => {
  Object.assign(store.state, state)
})

export default store
