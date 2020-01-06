import './action'
import Actions from "./action/BaseAction"

console.log(Actions)

const databaseApi = {
  async get(name, params) {
    console.log(params)
  },
  async post(name, params) {
    console.log(params)
  },
  async update(name, params) {
    console.log(params)
  },
  async delete(name, params) {
    console.log(params)
  },
}

export default databaseApi