<template>
  <div class="pms">
    <div>PMS</div>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'
  import {PMS_URL_KEY, CHROME_PATH_KEY} from "@/constant"
  import {configAction} from '@/database-api'

  export default {
    data() {
      return {
        pmsUrl: '',
      }
    },
    created() {
      this.init()
    },
    mounted() {
    },
    methods: {
      async init() {
        const chromePath = await configAction.getConfig(CHROME_PATH_KEY)
        if (!chromePath || !chromePath.value) {
          await this.$alert('chrome路径为配置', '提示', {showClose: false, confirmButtonText: '确定'})
          this.$router.replace({name: 'setting'})
          return
        }

        const pmsUrl = await configAction.getConfig(PMS_URL_KEY)
        if (pmsUrl && pmsUrl.value) {
          this.pmsUrl = pmsUrl.value
        } else {
          return
        }
      },
      async login() {
        ipcRenderer.send('pms-login', {url: ''})
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
