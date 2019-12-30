import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer, remote} from 'electron'

const win = remote.getCurrentWindow()
const themeKey = '__theme_style'

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
  close(state) {
    ipcRenderer.send('notify', {eName: 'refresh-store', data: {state}})
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
      modal: true,
      winId: win.id,
      width: 600,
      height: 650,
      minWidth: 600,
      minHeight: 650,
    }
    ipcRenderer.send('open-window', data)
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({state, getters, mutations})

ipcRenderer.on('win-maximize', (e, data) => {
  store.commit('setMaximize', data)
})

ipcRenderer.on('refresh-store', (e, {state}) => {
  Object.assign(store.state, state)
})

export default store
