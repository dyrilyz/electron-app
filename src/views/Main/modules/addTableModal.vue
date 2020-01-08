<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    title="添加表"
    width="550px">
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="表名">
        <el-input v-model="form.tableName" placeholder="请输入"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="mini" type="app" @click="handleBtnClick('ok')">确定</el-button>
      <el-button size="mini" @click="handleBtnClick('cancel')">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "addTableModal",
    data() {
      return {
        form: {
          tableName: ''
        }
      }
    },
    methods: {
      handleBtnClick(target) {
        this.$emit(target, this.checked)
      },
    }
  }
</script>

<style scoped lang="scss">
</style>