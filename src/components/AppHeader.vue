<template>
  <div class="app-header" :class="{mac:isMac}">
    <div class="content-wrapper">
      <div class="logo">
        <span class="xb" v-show="!isMac">Electron App</span>
      </div>
      <div class="window-ctrl">
        <div class="app-ctrl">
          <i class="no-drag btn-margin iconfont icontheme" @click="openThemeModal"/>
          <i class="no-drag btn-margin el-icon-setting" @click="openSetting"/>
          <i class="no-drag btn-margin iconfont iconguding1" @click="windowCtrl('alwaysOnTop')"
             :class="{active: isAlwaysOnTop}"/>
        </div>
        <div class="sys-ctrl" v-show="!isMac">
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
        themeModalVisible: false,
        isMac: this.$store.getters.getPlatform === 'darwin'
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
    box-sizing: border-box;
    user-select: none;
    height: $MainHeaderHeight;
    -webkit-app-region: drag;

    * {
      transition: all .2s;
    }

    &.mac {
      background-color: #f5f5f7;
      border-bottom: 1px solid #e1e1e2;
    }

    .content-wrapper {
      transition: background-color .5s;
      width: 100%;
      height: 100%;
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
      cursor: pointer;
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
