<template>
  <div class="page-container tables">
    <div class="search-wrapper">
      <el-button size="mini" type="app" icon="el-icon-plus" @click="addModalVisible=true">添加表</el-button>
    </div>

    <dy-table :columns="columns" :data="data">
      <template v-slot:ctrl="{scope}">
        <i class="table-control theme-color el-icon-edit"/>
        <i class="table-control theme-color el-icon-delete"/>
      </template>
    </dy-table>

    <add-table-modal :visible.sync="addModalVisible" @ok="handleOk" @cancel="handleCancel"/>
  </div>
</template>

<script>
  import DyTable from "@/components/DyTable"
  import {addTable, findTables} from "@/database-api/service/tableService"
  import AddTableModal from "@/views/Main/modules/addTableModal"

  export default {
    name: "Tables",
    components: {AddTableModal, DyTable},
    data() {
      return {
        data: [
          {_id: 1,},
          {_id: 2,},
          {_id: 2,},
        ],
        columns: [
          {label: 'id', prop: '_id'},
          {label: '操作', slotName: 'ctrl'},
        ],
        addModalVisible: false
      }
    },
    methods: {
      async getList() {
        await findTables()
      },
      async addTable() {
        await addTable()
      },
      handleOk() {
        this.close()
      },
      handleCancel() {
        this.close()
      },
      close() {
        this.addModalVisible = false
      }
    }
  }
</script>

<style lang="scss">
  .tables {
    .table-control {
      cursor: pointer;

      + .table-control {
        margin-left: 15px;
      }
    }
  }
</style>