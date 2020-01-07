<template>
  <div class="page-container settings">
    <el-form class="form" ref="form" label-width="120px" size="mini">
      <el-form-item label="Chrome路径">
        <div class="form-control">
          <el-input :placeholder="'例：'+chromePlaceholder" v-model="configModel.chromePath"/>
          <input type="file" title @change="pathChangeHandle">
        </div>
        <a class="el-icon-delete" @click="configModel.chromePath=''"> 清空</a>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="app" @click="handleSave">保存</el-button>
        <el-button size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {CHROME_PATH_MAC, CHROME_PATH_WIN, CHROME_PATH_KEY} from "@/constant"
  import {configAction} from '@/database-api'

  export default {
    name: "Settings",
    data() {
      return {
        configModel: {
          chromePath: '',
        },
        chromePlaceholder: ''
      }
    },
    created() {
      const cPath = {
        'win32': CHROME_PATH_WIN,
        'darwin': CHROME_PATH_MAC,
      }
      this.chromePlaceholder = cPath[process.platform]
      this.getConfig()
    },
    mounted() {
    },
    methods: {
      async getConfig() {
        const chromePath = await configAction.getConfig(CHROME_PATH_KEY)
        if (chromePath && chromePath.value) {
          this.configModel.chromePath = chromePath.value
        }
      },
      pathChangeHandle(e) {
        if (e.target.files.length) {
          this.configModel.chromePath = e.target.files[0].path
        }
      },
      handleSave() {
        configAction.setConfig(CHROME_PATH_KEY, this.configModel.chromePath)
      }
    },
  }
</script>

<style scoped lang="scss">
  .settings {
    .form {
      width: 650px;
      margin: 0 auto;

      .form-control {
        position: relative;
        width: 430px;
        display: inline-block;
        margin-right: 10px;

        input[type=file] {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
</style>