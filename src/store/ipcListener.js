import {ipcRenderer} from "electron"

export default function ipcListener(store) {

  ipcRenderer.on('sync-store', (e, {state}) => {
    Object.assign(store.state, state)
  })

  ipcRenderer.on('win-maximize', (e, data) => {
    store.commit('setMaximize', data)
  })

  ipcRenderer.on(`tableModal/ok`, (e, data) => {
    console.log(e, data, store)
    store.dispatch('tableModal/getTableList')
  })
}