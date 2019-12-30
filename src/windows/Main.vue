<template>
  <div class="main">
    <app-header/>
    <div class="app-container">
      这是主窗口
    </div>
    <router-view/>
  </div>
</template>

<script>
  import AppHeader from "@/components/AppHeader";

  export default {
    components: {
      AppHeader,
    },
  }
</script>

<style lang="scss" scoped>
  .main {
  }
</style>
