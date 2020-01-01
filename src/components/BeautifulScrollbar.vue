<template>
  <div class="beautiful-scrollbar">
    <div ref="container" class="scroll-container">
      <slot/>
    </div>
  </div>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar'

  /**
   * 滚动条组件
   * 包装自perfect-scrollbar
   * @props: option参数查阅 https://github.com/mdbootstrap/perfect-scrollbar#options
   * @methods: update 内容或高度改变时调用该方法
   */
  export default {
    name: "BeautifulScrollbar",
    props: ['option'],
    data() {
      return {
        scrollInstance: null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const option = {}
        if (this.option) {
          Object.assign(option, this.option)
        }
        this.scrollInstance = new PerfectScrollbar(this.$refs['container'], option)
      },
      update() {
        this.scrollInstance.update()
      }
    },
    destroyed() {
      if(this.scrollInstance) {
        this.scrollInstance.destroy()
        this.scrollInstance = null
      }
    }
  }
</script>

<style scoped lang="scss">
  .beautiful-scrollbar {
    .scroll-container {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
</style>