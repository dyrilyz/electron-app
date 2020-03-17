<template>
  <div class="app-header">
    <div class="content-wrapper">
      <div class="logo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--qingwa"></use>
        </svg>
        <span class="xb" style="margin-left: 10px;">Drog FTP</span>
        <span style="font-style: initial; font-size: 10px;letter-spacing: 0;margin-left: 10px;">免费的sftp工具</span>
      </div>
      <div class="window-ctrl">
        <div class="app-ctrl">
          <i class="no-drag btn-margin iconfont icontheme" @click="openThemeModal"/>
          <i class="no-drag btn-margin el-icon-setting" @click="openSetting"/>
          <i class="no-drag btn-margin iconfont iconguding1" @click="windowCtrl('alwaysOnTop')"
             :class="{active: isAlwaysOnTop}"/>
        </div>
        <div class="sys-ctrl">
          <i class="no-drag btn-margin iconfont iconzuixiaohua2" @click="windowCtrl('minimize')"/>
          <i class="no-drag btn-margin iconfont iconzuixiaohua" @click="windowCtrl('unmaximize')" v-if="isMaximize"/>
          <i class="no-drag btn-margin iconfont iconquanpingzuidahua" @click="windowCtrl('maximize')" v-else/>
          <i class="no-drag btn-margin iconfont iconClose" @click="windowCtrl('close')"/>
        </div>
      </div>
    </div>

    <theme-modal :visible.sync="themeModalVisible" @ok="handleOk" @cancel="themeModalVisible = false"/>
  </div>
</template>

<script>
  import ThemeModal from "@/components/ThemeModal"
  import {urlResolver} from "@/util"

  export default {
    name: "AppHeader",
    components: {ThemeModal},
    computed: {
      isMaximize() {
        return this.$store.getters.getIsMaximize
      },
      isAlwaysOnTop() {
        return this.$store.getters.getIsAlwaysOnTop
      }
    },
    data() {
      return {
        themeModalVisible: false
      }
    },
    methods: {
      windowCtrl(...args) {
        this.$store.commit(...args)
        this.$store.dispatch('syncWindow')
      },
      openSetting() {
        const url = urlResolver(this, {name: 'setting'})
        this.windowCtrl('openSetting', url)
      },
      handleOk(theme) {
        theme && this.windowCtrl('setTheme', theme)
        this.themeModalVisible = false
      },
      openThemeModal() {
        this.themeModalVisible = true
      }
    },
  }
</script>


<style scoped lang="scss">
  @import "../assets/style/constant";

  .app-header {
    user-select: none;
    -webkit-app-region: drag;

    .content-wrapper {
      transition: background-color .5s;
      width: 100%;
      height: $MainHeaderHeight;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      overflow: hidden;
    }

    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      letter-spacing: 2px;
      transform: scale(1.25) translate(20px, 0);
      font-style: italic;
    }

    .no-drag {
      -webkit-app-region: no-drag;
    }

    .window-ctrl {
      display: flex;
      flex-direction: row;

      .iconfont {
        font-size: 18px;
      }

      .app-ctrl {
        .iconguding1 {
          &.active {
            color: #fff;
            display: inline-block;
            transform: rotate(-45deg);
          }
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
