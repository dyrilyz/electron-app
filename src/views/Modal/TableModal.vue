<template>
  <div class="table-modal">
    <beautiful-scrollbar class="table-modal-content">
      <el-form class="form" ref="form" label-width="80px" size="mini">
        <el-form-item label="表名">
          <el-input v-model="form.tableName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="注释">
          <el-input
            type="textarea"
            v-model="form.tableName"
            resize="none"
            :rows="5"
            placeholder="请输入"/>
        </el-form-item>
      </el-form>
    </beautiful-scrollbar>
    <div class="table-modal-footer">
      <el-button size="mini" type="app" @click="handleBtnClick('ok')">确定</el-button>
      <el-button size="mini" @click="handleBtnClick('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script>
  import BeautifulScrollbar from "@/components/BeautifulScrollbar"

  export default {
    name: "TableModal",
    components: {BeautifulScrollbar},
    data() {
      return {
        form: {
          tableName: ''
        }
      }
    },
    methods: {
      handleBtnClick(target) {
        this.$store.dispatch('tableModal/notify', {eName: target, data: ''})
      },
    }
  }
</script>

<style scoped lang="scss">
  .table-modal {
    height: 100%;
    display: flex;
    flex-direction: column;

    .table-modal-content {
      height: calc(100vh - 70px);

      .form {
        margin: auto;
        width: 80%;
        max-width: 400px;
        padding: 20px 0 10px;
      }
    }

    .table-modal-footer {
      text-align: right;
      padding: 5px 10px;
    }
  }
</style>