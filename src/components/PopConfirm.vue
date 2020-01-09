<template>
  <el-popover placement="bottom" trigger="click" class="pop-confirm" v-model="visible">
    <div class="pop-confirm-wrapper app" :class="[theme]">
      <div class="pop-content">
        <i class="theme-color el-icon-question" :style="{color:icon}"/>
        {{title}}
      </div>
      <div class="pop-footer">
        <el-button size="mini" type="default" @click="handleClick('on-cancel')">取消</el-button>
        <el-button size="mini" type="app" @click="handleClick('on-confirm')">确定</el-button>
      </div>
    </div>
    <slot name="reference" slot="reference"/>
  </el-popover>
</template>

<script>
  /**
   * @prop title 描述
   * @prop 描述前图标颜色Hex值
   * @event on-cancel 取消事件
   * @event on-confirm 确定事件
   */
  export default {
    name: "PopConfirm",
    props: {
      title: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        default: '#f90'
      }
    },
    computed: {
      theme() {
        return this.$store.getters.getTheme
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      handleClick(eName) {
        this.visible = false
        this.$emit(eName)
      }
    },
  }
</script>

<style scoped lang="scss">
  .pop-confirm-wrapper {
    .pop-content {
      padding: 5px 0;
    }

    .pop-footer {
      text-align: right;
      margin-top: 5px;
    }
  }
</style>