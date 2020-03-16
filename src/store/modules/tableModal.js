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
  async notify(__, {eName, data, type}) {
    eName = `tableModal/${eName}`
    if (type === 'add') {
      await tableAction.createTable(data)
    } else if (type === 'edit') {
      await tableAction.updateTable(data.id, data)
    }
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
