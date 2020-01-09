import {
  addTable,
  updateTableById,
  removeTableById,
  findTables,
  findTableById
} from "@/database-api/service/tableService"

// 虚拟表配置

export default {
  async createTable(doc) {
    return addTable(doc)
  },
  async updateTable(id, $set) {
    return updateTableById(id, $set)
  },
  async deleteTable(_id) {
    return removeTableById(_id)
  },
  async getTableList() {
    const tableList =  await findTables()
    return tableList.map(item => {
      item.id=item._id
      delete item._id
      return item
    })
  },
  async getTableById(id) {
    return findTableById(id)
  },
}