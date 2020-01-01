<template>
  <div class="layout">
    <navigation class="layout-left"/>
    <div class="layout-right">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navigation from "@/views/Main/modules/Navigation"

  export default {
    name: "Layout",
    components: {Navigation}
  }
</script>

<style scoped lang="scss">
  .layout {
    display: flex;

    .layout-left {
      width: 180px;
      overflow-x: hidden;
      overflow-y: auto;
      border-right: 1px solid #e1e1e2;
      background-color: #f5f5f7;
    }

    .layout-right {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>