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
  @import "./assets/theme";
  @import "./assets/global";
</style>

