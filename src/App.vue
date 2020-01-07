<template>
  <div id="app" class="app" :class="[theme]">
    <router-view/>
  </div>
</template>
<script>
  export default {
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
