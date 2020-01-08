import {
  addTable,
  updateTableById,
  removeTableById,
  findTables,
  findTableById
} from "@/database-api/service/tableService"

// 虚拟表配置
export async function createTable(doc) {
  return addTable(doc)
}

export async function updateTable(id, $set) {
  return updateTableById(id, $set)
}

export async function deleteTable(id) {
  return removeTableById(id)
}

export async function getTableList() {
  return findTables()
}

export async function getTableById(id) {
  return findTableById(id)
}