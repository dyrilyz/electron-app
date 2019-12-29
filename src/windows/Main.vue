<template>
  <div class="main">
    <app-header/>
    <div>this is main window</div>
    <div><router-link :to="{name:'setting'}">setting</router-link></div>
  </div>
</template>

<script>
  import AppHeader from "@/components/AppHeader";

  export default {
    components: {
      AppHeader,
    }
  }
</script>

<style lang="scss" scoped>
  .main {
  }
</style>