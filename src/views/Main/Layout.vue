<template>
  <div class="layout">
    <beautiful-scrollbar class="layout-left">
      <navigation/>
    </beautiful-scrollbar>
    <beautiful-scrollbar class="layout-right">
      <router-view/>
    </beautiful-scrollbar>
  </div>
</template>

<script>
  import Navigation from "@/views/Main/modules/Navigation"
  import BeautifulScrollbar from "@/components/BeautifulScrollbar"

  export default {
    name: "Layout",
    components: {Navigation, BeautifulScrollbar},
  }
</script>

<style scoped lang="scss">
  .layout {
    display: flex;

    .layout-left {
      width: 180px;
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