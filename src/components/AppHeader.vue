<template>
  <div class="app-header">
    <div class="content-wrapper">
      <div class="logo">
        <span class="xv">Electron App</span>
      </div>
      <div class="window-ctrl">
        <div class="app-ctrl">
          <i class="no-drag btn-margin iconfont icontheme" @click="themeModalVisible=!themeModalVisible"/>
          <i class="no-drag btn-margin el-icon-setting" @click="openSetting"/>
          <i class="no-drag btn-margin iconfont iconguding1" @click="alwaysOnTop" :class="{active: isAlwaysOnTop}"/>
        </div>
        <div class="sys-ctrl">
          <i class="no-drag btn-margin iconfont iconzuixiaohua2" @click="minimize"/>
          <i class="no-drag btn-margin iconfont iconzuixiaohua" @click="unmaximize" v-if="isMaximize"/>
          <i class="no-drag btn-margin iconfont iconquanpingzuidahua" @click="maximize" v-else/>
          <i class="no-drag btn-margin iconfont iconClose" @click="close"/>
        </div>
      </div>
    </div>

    <theme-modal :visible.sync="themeModalVisible" @ok="handleOk" @cancel="handleCancel"/>
  </div>
</template>

<script>
  import ThemeModal from "@/components/ThemeModal";
  import {urlResolver} from "@/util";

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
      close() {
        this.$store.commit('close')
      },
      alwaysOnTop() {
        this.$store.commit('alwaysOnTop')
      },
      minimize() {
        this.$store.commit('minimize')
      },
      unmaximize() {
        this.$store.commit('unmaximize')
      },
      maximize() {
        this.$store.commit('maximize')
      },
      setTheme(theme) {
        this.$store.commit('setTheme', theme)
      },
      openSetting() {
        const url = urlResolver(this, {name: 'setting'})
        this.$store.commit('openSetting', url)
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
  @import "../assets/style/constant";

  .app-header {
    user-select: none;
    -webkit-app-region: drag;

    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      letter-spacing: 2px;
      transform: scale(1.25) translate(20px, 0);
      font-style: italic;
    }

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
