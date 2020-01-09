import {configAction} from "@/database-api"
import {KEY_THEME} from "@/constant"
import {ipcRenderer, remote} from "electron"

const win = remote.getCurrentWindow()

export default {
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