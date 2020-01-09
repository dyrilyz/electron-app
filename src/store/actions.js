import {ipcRenderer} from "electron"

export default {
  syncWindow({state}) {
    ipcRenderer.send('notify', {eName: 'sync-store', data: {state}})
  }
}