<template>
  <div class="main">
    <app-header/>
    <layout class="main-container"/>
  </div>
</template>

<script>
  import AppHeader from "@/components/AppHeader"
  import Layout from "@/views/Main/Layout"

  export default {
    components: {
      AppHeader,
      Layout
    },
    data() {
      return {
        platform: this.$store.getters.platform
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
  }
</style>
