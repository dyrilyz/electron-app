<template>
  <div class="file" v-on="$listeners" :class="{'active':fileObj.active}">
    <div class="icon_and_name">
      <i class="iconfont " :class="[fileIcon]"/>
      <span class="file-name">{{fileObj.name}}</span>
    </div>
    <div class="fun-wrapper">
      <el-button v-for="(btn,index) in funcGroup"
                 v-bind="btn.attr"
                 @click="funClick($event, btn.eventName)"
                 :key="index">{{btn.text}}
      </el-button>
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
      },
      funcGroup: {
        type: Array
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
    methods: {
      funClick(e, eventName) {
        this.$emit(eventName, e)
      }
    },
  }
</script>

<style scoped lang="scss">
  $animTime: .2s;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .file {
    font-size: 12px;
    padding: 0 10px 0 28px;
    // transition: all $animTime;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 26px;

    .icon_and_name {
      display: flex;
      align-items: center;
    }

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
      background-color: #2364db;
      color: #fff;

      .fun-wrapper {
        animation: fade-in $animTime;
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
