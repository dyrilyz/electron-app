<template>
  <div class="main">
    <app-header/>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import AppHeader from "@/components/AppHeader"

  export default {
    components: {
      AppHeader,
    },
  }
</script>

<style lang="scss" scoped>
  .main {
    .main-container {
      overflow: auto;
    }
  }
</style>
