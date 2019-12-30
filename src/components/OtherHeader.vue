<template>
  <div class="app-header">
    <div class="content-wrapper">
      <div class="window-title" v-text="title || '其他窗口'"/>
      <div class="window-ctrl">
        <div class="sys-ctrl">
          <i class="no-drag btn-margin iconfont iconClose" @click="close"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['title'],
    methods: {
      close() {
        this.$store.commit('close')
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../assets/style/constant";

  .app-header {
    user-select: none;
    -webkit-app-region: drag;

    .window-title {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
    }

    .content-wrapper {
      transition: background-color .5s;
      width: 100%;
      height: $OtherHeaderHeight;
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

      .sys-ctrl {
        display: flex;
        align-items: center;
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
