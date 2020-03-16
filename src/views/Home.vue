<template>
  <div class="home">
    <div class="local">
      <div class="current-local-path">当前路径：{{pathList.join('')}}</div>
      <ul class="local-file_list">
        <li>
          <file :file-obj="{name: '返回上一级', type: 2}"
                :allow-upload="false"
                v-show="pathList.length>1"
                @dblclick="goToPrev"></file>
        </li>
        <li v-for="(item,index) in currentDir" :key="item.key">
          <file :file-obj="item" @dblclick="intoDir(index)"/>
        </li>
      </ul>
    </div>
    <div class="remote"></div>
  </div>
</template>

<script>
  import {getLocalDirList} from "@/util"
  import File from "@/components/file"

  export default {
    name: 'home',
    data() {
      return {
        currentDir: [],
        pathList: [],
      }
    },
    components: {File},
    mounted() {
      this.pathList.push('/')
      this.getRootDir()
    },
    methods: {
      async getRootDir() {
        let filePath = this.pathList.join('')
        if (filePath.length !== 1 && filePath[filePath.length - 1] === '/') {
          filePath = filePath.substring(0, filePath.length - 1)
        }
        try {
          const dirs = await getLocalDirList(filePath)
          console.log(filePath, dirs)
          this.currentDir.splice(0, this.currentDir.length, ...dirs.map(item => ({...item, active: false})))
        } catch (e) {
          this.pathList.pop()
          this.$message({
            type: 'error',
            offset: 80,
            message: '无法打开该目录！'
          })
        }
      },
      intoDir(i) {
        const file = this.currentDir[i]
        if (file.type === 1) {
          this.pathList.push(file.name + '/')
          this.getRootDir()
        }
      },
      goToPrev() {
        this.pathList.pop()
        this.getRootDir()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    display: flex;

    .local, .remote {
      flex: 1;
      overflow-x: auto;

      &-file_list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }

    .local {
      border-right: 1px solid #ccc;
    }

    .current-local-path {
      padding: 3px 10px;
      position: sticky;
      top: 0;
      background-color: #fff;
      box-shadow: 0 3px 3px #ccc;
    }
  }
</style>
