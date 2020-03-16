import {ipcRenderer, remote} from "electron"

const win = remote.getCurrentWindow()

function openWindow(data) {
  ipcRenderer.send('open-window', data)
}

export default {
  syncWindow({state}) {
    ipcRenderer.send('notify', {eName: 'sync-store', data: {state}})
  },
  openChildWindow(__, {url, opt = {}}) {
    openWindow({url, opt, parentId: win.id})
  },
  openModalWindow(__, {url, opt = {}}) {
    Object.assign(opt, {modal: true})
    openWindow({url, opt, parentId: win.id})
  },
}