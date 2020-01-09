<template>
  <div class="common-modal">
    <other-header :title="title"/>
    <div class="modal-page-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import OtherHeader from "@/components/OtherHeader"

  export default {
    components: {OtherHeader},
    data() {
      return {
        title: '添加表'
      }
    },
    created() {
      const {title} = this.$route.query
      if (title) {
        this.title = title
      }
    },
  }
</script>

<style scoped lang="scss">
  .common-modal {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .modal-page-container {
      flex: 1;
      background-color: #fff;
    }
  }
</style>