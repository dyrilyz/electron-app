<template>
  <div class="setting">
    <app-header/>
    <div>this is setting window</div>
    <div><router-link :to="{name:'main'}">main</router-link></div>
  </div>
</template>

<script>
  import AppHeader from "@/components/AppHeader";

  export default {
    name: "Setting",
    components: {AppHeader}
  }
</script>

<style scoped lang="scss">
  .setting {
  }
</style>