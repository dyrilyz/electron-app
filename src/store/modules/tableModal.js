import {ipcRenderer, remote} from 'electron'
import {tableAction} from '@/database-api'

const win = remote.getCurrentWindow()

const state = {
  tableList: [],
}

const getters = {
  getTableList: state => state.tableList,
}

const mutations = {
  setTableList(state, tableList) {
    if (tableList) {
      state.tableList = tableList
    }
  },
}

const actions = {
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
  async notify(__, {eName, data}) {
    eName = `tableModal/${eName}`
    await tableAction.createTable(data)
    ipcRenderer.send('notify', {eName, data})
    win.close()
  },
  async getTableList({commit}) {
    const tableList = await tableAction.getTableList()
    commit('setTableList', tableList)
  },
  addTableList({commit}, param) {
    console.log(tableAction, commit, param)
  },
  async removeTable({dispatch}, id) {
    console.log(id)
    await tableAction.deleteTable(id)
    dispatch('getTableList')
  }
}

export default {namespaced: true, state, getters, mutations, actions}