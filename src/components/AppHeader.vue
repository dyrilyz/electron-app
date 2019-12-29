<template>
  <div class="app-header">
    <div class="content-wrapper">
      <div class="logo">
        <span>这里是个logo</span>
      </div>
      <div class="window-ctrl">
        <div class="app-ctrl">
          <i class="no-drag btn-margin iconfont icontheme" @click="themeModalVisible=!themeModalVisible"/>
          <i class="no-drag btn-margin el-icon-setting"/>
        </div>
        <div class="sys-ctrl">
          <i class="no-drag btn-margin el-icon-remove-outline" @click="minimize"/>
          <i class="no-drag btn-margin el-icon-circle-plus-outline" @click="maximize"/>
          <i class="no-drag btn-margin el-icon-circle-close" @click="close"/>
        </div>
      </div>
    </div>

    <theme-modal :visible.sync="themeModalVisible" @ok="handleOk" @cancel="handleCancel"/>
  </div>
</template>

<script>
  // import {ipcRenderer} from 'electron'
  import ThemeModal from "@/components/ThemeModal";

  export default {
    name: "AppHeader",
    components: {ThemeModal},
    data() {
      return {
        themeModalVisible: false
      }
    },
    methods: {
      close() {
        this.$store.commit('close')
      },
      minimize() {
        this.$store.commit('minimize')
      },
      maximize() {
        this.$store.commit('maximize')
      },
      setTheme(theme) {
        this.$store.commit('setTheme', theme)
      },
      handleOk(theme) {
        if (theme) {
          this.setTheme(theme)
        }
        this.themeModalVisible = false
      },
      handleCancel() {
        this.themeModalVisible = false
      },
    },
  }
</script>

<style scoped lang="scss">
  .app-header {
    .content-wrapper {
      transition: background-color .5s;
      width: 100%;
      height: 50px;
      -webkit-app-region: drag;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
    }

    .no-drag {
      -webkit-app-region: none;
    }

    .window-ctrl {
      display: flex;
      flex-direction: row;

      .iconfont {
        font-size: 18px;
      }

      .app-ctrl {
        .theme-list {

        }
      }

      .sys-ctrl {
        margin-left: 20px;
        display: flex;
        align-items: center;

        &:before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 20px;
          margin-right: 20px;
        }
      }

      .btn-margin {
        + .btn-margin {
          margin-left: 10px;
        }
      }

      .no-drag {
        outline: none;
        font-size: 18px;
        transition: color .2s;
        user-select: none;
      }
    }
  }
</style>