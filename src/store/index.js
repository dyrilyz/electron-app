import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from 'electron'

const themeKey = '__theme_style'

Vue.use(Vuex)

function getWinId() {
  return new Promise(resolve => {
    ipcRenderer.once('reply-window-id', (e, id) => {
      resolve(id)
    })
    ipcRenderer.send('get-window-id')
  })
}

const store = new Vuex.Store({
  state: {
    theme: 'theme-red',
    winId: -1,
    isMaximize: false,
  },
  getters: {
    getTheme(state) {
      const theme = localStorage.getItem(themeKey)
      if (theme) {
        state.theme = theme
      }
      return state.theme
    },
    getIsMaximize: state => state.isMaximize
  },
  mutations: {
    setTheme(state, theme) {
      if (theme) {
        localStorage.setItem(themeKey, theme)
        state.theme = theme
      }
    },
    async minimize() {
      const id = await getWinId()
      ipcRenderer.send('win-minimize', id)
    },
    async maximize() {
      const id = await getWinId()
      ipcRenderer.send('win-maximize', id)
    },
    async unmaximize() {
      const id = await getWinId()
      ipcRenderer.send('win-unmaximize', id)
    },
    async close() {
      const id = await getWinId()
      ipcRenderer.send('win-close', id)
    },
    setMaximize(state, data) {
      if (state.isMaximize !== data) {
        state.isMaximize = data
      }
    }
  }
})

ipcRenderer.on('win-maximize', (e, data) => {
  store.commit('setMaximize', data)
})

export default store
