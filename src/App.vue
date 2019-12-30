<template>
  <div id="app" class="app" :class="[theme]">
    <router-view/>
  </div>
</template>
<script>

  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      theme() {
        return this.$store.getters.getTheme
      }
    },
  }
</script>

<style lang="scss">
  @import "./assets/style/theme";
  @import "./assets/style/global";
</style>

