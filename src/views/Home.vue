<template>
  <div class="home">
    <div class="connect-form">
      <el-form inline>
        <el-form-item>
          <el-input size="mini" placeholder="主机" v-model="serverConfig.host"/>
        </el-form-item>
        <el-form-item>
          <el-input size="mini" placeholder="端口号" v-model="serverConfig.port"/>
        </el-form-item>
        <el-form-item>
          <el-input size="mini" placeholder="用户" v-model="serverConfig.username"/>
        </el-form-item>
        <el-form-item>
          <el-input size="mini" placeholder="密码" v-model="serverConfig.password" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="connect">连接</el-button>
          <el-button size="mini" type="danger" @click="disconnect">断开</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="preivew-list">

      <!-- 本地目录 Remote Dir-->
      <div class="local" v-loading="localLoading">
        <div class="current-local-path">当前路径：{{pathList.join('')}}</div>
        <ul class="local-file_list">
          <li v-show="pathList.length>1">
            <file :file-obj="{name: '返回上一级', type: 2}"
                  :allow-upload="false"
                  @dblclick="goToPrev"></file>
          </li>
          <li v-for="(item,index) in currentDir" :key="item.key">
            <file :file-obj="item" @dblclick="intoDir(index)"/>
          </li>
        </ul>
      </div>

      <!-- 远程目录 Remote Dir-->
      <div class="remote" v-loading="remoteLoading">
        <div class="current-local-path">当前路径：{{remotePathList.join('')}}</div>
        <ul class="local-file_list">
          <li v-show="remotePathList.length>1">
            <file :file-obj="{name: '返回上一级', type: 2}"
                  :allow-upload="false"
                  @dblclick="goToRemotePrev"></file>
          </li>
          <li v-for="(item,index) in remoteCurrentDir" :key="item.key">
            <file :file-obj="item" @dblclick="intoRemoteDir(index)"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLocalDirList, SFTPUtil} from "@/util"
  import File from "@/components/file"

  let client = null

  export default {
    name: 'home',
    data() {
      return {
        localLoading: false,
        remoteLoading: false,
        currentDir: [],
        pathList: ['/'],
        remoteCurrentDir: [],
        remotePathList: ['/'],
        serverConfig: {
        },
      }
    },
    components: {File},
    mounted() {
      this.getRootDir()
    },
    methods: {
      // 获取本地目录内容
      async getRootDir() {
        this.localLoading = true
        let filePath = this.pathList.join('')
        if (filePath.length !== 1 && filePath[filePath.length - 1] === '/') {
          filePath = filePath.substring(0, filePath.length - 1)
        }
        try {
          const dirs = await getLocalDirList(filePath)
          this.currentDir.splice(0, this.currentDir.length, ...dirs.map(item => ({...item, active: false})))
        } catch (e) {
          this.pathList.pop()
          this.$message({
            type: 'error',
            offset: 80,
            message: '无法打开该目录！'
          })
        }
        this.localLoading = false
      },

      // 获取远程目录内容
      async getRemoteDir() {
        this.remoteLoading = true
        let filePath = this.remotePathList.join('')
        if (filePath.length !== 1 && filePath[filePath.length - 1] === '/') {
          filePath = filePath.substring(0, filePath.length - 1)
        }
        try {
          const dirs = await client.getRemoteFiles(filePath)
          this.remoteCurrentDir.splice(0, this.remoteCurrentDir.length, ...dirs.map(item => ({...item, active: false})))
        } catch (e) {
          this.remotePathList.pop()
          this.$message({
            type: 'error',
            offset: 80,
            message: '无法打开该目录！'
          })
        }
        this.remoteLoading = false
      },

      // 进入本地目录
      intoDir(i) {
        const file = this.currentDir[i]
        if (file.type === 1) {
          this.pathList.push(file.name + '/')
          this.getRootDir()
        }
      },

      // 本地目录返回上一级
      goToPrev() {
        this.pathList.pop()
        this.getRootDir()
      },

      // 进入本地目录
      intoRemoteDir(i) {
        const file = this.remoteCurrentDir[i]
        if (file.type === 1) {
          this.remotePathList.push(file.name + '/')
          this.getRemoteDir()
        }
      },

      // 本地目录返回上一级
      goToRemotePrev() {
        this.remotePathList.pop()
        this.getRemoteDir()
      },

      // 连接 sftp
      async connect() {
        this.serverConfig.port *= 1
        client = new SFTPUtil(this.serverConfig)
        await client.connect()
        this.getRemoteDir()
      },

      // 关闭 sftp
      async disconnect() {
        if (client) {
          await client.end()
          client = null
        }
        this.remoteCurrentDir.splice(0, this.remoteCurrentDir.length)
        this.remotePathList.splice(0, this.remotePathList.length, '/')
        this.$message({
          type: 'primary',
          offset: 80,
          message: '连接已断开！'
        })
        this.remoteLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .connect-form {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
    }

    .preivew-list {
      display: flex;
      flex: 1;
      height: 100%;
    }

    .local, .remote {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;

      &-file_list {
        list-style: none;
        padding: 0;
        margin: 0;
        flex: 1;
        overflow-x: auto;
        height: 100%;
      }
    }

    .local {
      border-right: 1px solid #ccc;
    }

    .current-local-path {
      padding: 3px 10px;
      background-color: #fff;
      box-shadow: 0 3px 3px #ccc;
    }
  }
</style>
