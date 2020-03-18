<template>
  <div class="home">
    <div class="connect-form">
      <el-form class="form" inline>
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
          <el-button size="mini" type="app" @click="connect">连接</el-button>
          <el-button size="mini" type="danger" @click="disconnect">断开</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="preivew-list">

      <!-- 本地目录 Remote Dir-->
      <div class="local" v-loading="localLoading">
        <div class="current-path">当前路径：{{pathList.join('')}}</div>
        <ul class="file_list">
          <li v-show="pathList.length > 1">
            <file :file-obj="{name: '返回上一级', type: 2}" @dblclick="goToPrev"></file>
          </li>
          <li v-for="(item,index) in currentDir" :key="item.key">
            <file :file-obj="item" @click.right="popupMenu(0, index)" @dblclick="intoDir(index)"/>
          </li>
        </ul>
      </div>

      <!-- 远程目录 Remote Dir-->
      <div class="remote" v-loading="remoteLoading">
        <div class="current-path">当前路径：{{remotePathList.join('')}}</div>
        <ul class="file_list">
          <li v-show="remotePathList.length>1">
            <file :file-obj="{name: '返回上一级', type: 2}" @dblclick="goToRemotePrev"></file>
          </li>
          <li v-for="(item,index) in remoteCurrentDir" :key="item.key">
            <file :file-obj="item" @click.right="popupMenu(1, index)" @dblclick="intoRemoteDir(index)"/>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import {getLocalDirList} from "@/util"
  import SFTPUtil from "@/util/SFTPUtil"
  import File from "@/components/file"
  import {remote} from 'electron'
  import {isWin} from "@/util/_base_fun"

  let client = null
  const {Menu, MenuItem} = remote

  function createMenuList(arr) {
    return arr.map(opt => new MenuItem(opt))
  }

  export default {
    name: 'home',
    data() {
      return {
        localLoading: false,
        remoteLoading: false,
        currentDir: [],
        pathList: ['/',],
        remoteCurrentDir: [],
        remotePathList: ['/'],
        serverConfig: {
          host: '192.168.31.200',
          port: 22,
          username: 'pi',
          password: 'zhangxin123',
        },
        remoteMenu: new Menu(),
        local: {
          currentFileName: '',
          menu: new Menu(),
        },
        remote: {
          currentFileName: '',
          menu: new Menu(),
        }
      }
    },
    components: {File},
    created() {
      isWin && (this.pathList[0] = '')
      this.getRootDir()
      const _this = this

      // 初始化本地文件列表的弹出菜单
      const localMenuItem = createMenuList([
        {label: '上传', click: () => _this.uploadMethod()},
        // {type: 'separator'},
        // {label: '刷新文件列表'},
      ])
      localMenuItem.forEach(item => this.local.menu.append(item))

      // 初始化远程文件列表的弹出菜单
      const remoteMenuItem = createMenuList([
        {label: '下载', click: () => _this.downloadMethod()},
        // {type: 'separator'},
        // {label: '刷新文件列表'},
      ])
      remoteMenuItem.forEach(item => this.remote.menu.append(item))
    },
    methods: {
      popupMenu(type, index) {
        if (type === 0) {
          // 本地菜单弹出
          this.local.currentFileName = this.currentDir[index].name
          if (this.currentDir[index].type !== 0) return
          this.local.menu.popup()
        } else if (type === 1) {
          // 远程菜单弹出
          this.remote.currentFileName = this.remoteCurrentDir[index].name
          if (this.remoteCurrentDir[index].type !== 0) return
          this.remote.menu.popup()
        }
      },

      // 下载文件
      async downloadMethod() {
        let to = this.pathList.join('') + this.remote.currentFileName
        let from = this.remotePathList.join('') + this.remote.currentFileName
        try {
          await client.download(from, to)
          await this.getRootDir()
          this.$message({
            type: 'success',
            offset: 80,
            message: '下载成功！'
          })
        } catch (e) {
          console.log(e)
        }
        this.remote.currentFileName
      },

      // 上传文件
      async uploadMethod() {
        let to = this.remotePathList.join('') + this.local.currentFileName
        let from = this.pathList.join('') + this.local.currentFileName
        try {
          await client.upload(from, to)
          await this.getRemoteDir()
          this.$message({
            type: 'success',
            offset: 80,
            message: '上传成功！'
          })
        } catch (e) {
          console.log(e)
        }
        this.local.currentFileName = ''
      },

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

      // 进入远程目录
      intoRemoteDir(i) {
        const file = this.remoteCurrentDir[i]
        if (file.type === 1) {
          this.remotePathList.push(file.name + '/')
          this.getRemoteDir()
        }
      },

      // 远程目录返回上一级
      goToRemotePrev() {
        this.remotePathList.pop()
        this.getRemoteDir()
      },

      // 连接 sftp
      async connect() {
        this.remoteLoading = true
        this.serverConfig.port *= 1
        client = new SFTPUtil(this.serverConfig)
        try {
          await client.connect()
          this.getRemoteDir()
        } catch {
          this.remoteLoading = false
        }
      },

      // 关闭 sftp
      async disconnect() {
        if (client) {
          await client.end()
          client = null
          this.$message({
            type: 'primary',
            offset: 80,
            message: '连接已断开！'
          })
        }
        this.remoteCurrentDir.splice(0, this.remoteCurrentDir.length)
        this.remotePathList.splice(0, this.remotePathList.length, '/')
        this.remoteLoading = false
      }
    }
  }
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .form {
      .el-input input {
        line-height: 24px;
        height: 24px;
        border-radius: 0;
      }
    }

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

      .file_list {
        list-style: none;
        padding: 0;
        margin: 0;
        flex: 1;
        overflow-x: auto;
        height: 100%;

        li {
          &:nth-child(2n) {
            background-color: #ededed;
          }
        }
      }
    }

    .local {
      border-right: 1px solid #ccc;
    }

    .current-path {
      padding: 3px 10px;
      background-color: #fff;
      box-shadow: 0 3px 3px #ccc;
    }
  }
</style>
