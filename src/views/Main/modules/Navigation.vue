<template>
  <div class="nav">
    <dl class="root-nav">
      <dt>应用</dt>
      <dd>我的应用</dd>
      <dd class="active">所有应用</dd>
      <dd>小说</dd>
      <dd>音乐</dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: "Nav"
  }
</script>

<style scoped lang="scss">
  .nav {
    .root-nav {
      margin: 0;

      dt {
        padding: 0 10px;
        font-size: 12px;
      }

      dd {
        margin: 0;
        padding: 0 20px;
        border-left: 3px solid transparent;
        line-height: 30px;

        &.active {
          background-color: #e6e7ea;
        }
      }
    }
  }
</style>