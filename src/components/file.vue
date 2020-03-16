<template>
  <div
      class="file"
      v-on="$listeners"
      :class="{'active':fileObj.active}">
    <div>
      <i class="iconfont " :class="[fileIcon]"/>
      <span class="file-name">{{fileObj.name}}</span>
    </div>
    <div class="fun-wrapper">
      <el-button v-show="allowUpload" type="primary" size="mini" plain>上传</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "file",
    props: {
      fileObj: [Object],
      allowUpload: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      fileIcon() {
        let type = ''
        switch (this.fileObj.type) {
          case 0:
            type = 'icon-file'
            break
          case 1:
            type = 'icon-wenjianjia'
            break
          case 2:
            type = 'icon-wenjianjia back'
            break
        }
        return type
      },
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  .file {
    /*display: inline-block;*/
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 3px;
    transition: all .2s;
    user-select: none;
    margin-bottom: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;

    .fun-wrapper {
      display: none;
    }

    &.active {
      background-color: rgba(148, 213, 233, 0.55);

      &:hover {
        background-color: rgba(148, 213, 233, 0.55);
      }
    }

    &:hover {
      background-color: rgba(148, 213, 233, 0.28);

      .fun-wrapper {
        display: block;
      }
    }

    .file-name {
      margin-left: 8px;
    }

    .icon-file {
      color: #73a67b;
      font-size: 20px;
    }

    .icon-wenjianjia {
      color: #88ccf0;

      &.back {
        color: #ffcc8b;
      }
    }
  }
</style>
