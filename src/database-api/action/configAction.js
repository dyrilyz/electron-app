import {
  findConfigByKey,
  findConfig, updateConfigByKey, insertConfig
} from "@/database-api/service/configService"

export default {
  async getConfig(key) {
    if (key) {
      return findConfigByKey(key)
    } else {
      return findConfig()
    }
  },

  async setConfig(key, value) {
    const config = await findConfigByKey(key)
    if (config) {
      Object.assign(config, {value})
      updateConfigByKey(key, config)
    } else {
      insertConfig({key, value})
    }
  }
}
