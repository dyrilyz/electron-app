import {ipcRenderer, remote} from 'electron'

const namespace = 'tableModal'
const win = remote.getCurrentWindow()

ipcRenderer.on(`${namespace}/ok`, (e, data) => {
  console.log(e, data, this)
})

export default {
  namespaced: true,
  state: {
    // tableList:
  },
  getters: {},
  mutations: {},
  actions: {
    openSettings(__, {url, width, height}) {
      width = width || 600
      height = height || 500
      const opt = {
        modal: true,
        width: width,
        minWidth: width,
        maxWidth: width,
        height: height,
        minHeight: height,
        maxHeight: height,
      }
      const data = {url, opt, parentId: win.id}
      ipcRenderer.send('open-window', data)
    },
    notify(__, {eName, data}) {
      eName = `${namespace}/${eName}`
      ipcRenderer.send('notify', {eName, data})
      win.close()
    }
  },
}