<template>
  <div class="page-container tables">
    <div class="search-wrapper">
      <el-button size="mini" type="app" icon="el-icon-plus" @click="add">添加</el-button>
    </div>
    <dy-table :columns="columns" :data="tableList">
      <template v-slot:ctrl="{scope}">
        <a class="table-control theme-color" @click="edit(scope)"><i class="el-icon-edit"/> 编辑</a>
        <a class="table-control theme-color"><i class="el-icon-document"/> 设计</a>
        <pop-confirm class="table-control" title="确定要删除这张表吗？" @on-confirm="deleteTable(scope)">
          <template v-slot:reference>
            <a class="table-control theme-color"><i class="el-icon-delete"/> 删除</a>
          </template>
        </pop-confirm>
      </template>
    </dy-table>
  </div>
</template>

<script>
  import DyTable from "@/components/DyTable"
  import {copy, dateTime, urlResolver} from "@/util"
  import PopConfirm from "@/components/PopConfirm"

  function timeFilter({createTime}) {
    return createTime ? dateTime(createTime) : createTime
  }

  export default {
    name: "Tables",
    components: {PopConfirm, DyTable},
    computed: {
      tableList() {
        // return this.$store.getters['tableModal/getTableList']
        return [{}]
      }
    },
    data() {
      return {
        columns: [
          {label: 'id', prop: 'id', width: '100'},
          {label: '表名', prop: 'tableName', width: '120'},
          {label: '创建时间', prop: 'createTime', width: '150', align: 'center', filter: timeFilter},
          {label: '注释', prop: 'tableComment'},
          {label: '操作', width: '200', slotName: 'ctrl', align: 'center'},
        ],
        addModalVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      add() {
        this.openModal('添加')
      },
      edit({row}) {
        this.openModal('编辑', copy(row))
      },
      openModal(title, row) {
        const route = {name: 'table-modal', query: {title, type: 'add'}}
        row && Object.assign(route.query, {model: JSON.stringify(row), type: 'edit'})
        const url = urlResolver(this, route)
        const data = {
          url,
          opt: {width: 600, height: 600}
        }
        this.$store.dispatch('openModalWindow', data)
      },
      async getList() {
        this.$store.dispatch('tableModal/getTableList')
      },
      async deleteTable({row}) {
        this.$store.dispatch('tableModal/removeTable', row.id)
      },
    }
  }
</script>

<style lang="scss">
  .tables {
    .table-control {
      cursor: pointer;
      text-decoration: none;

      + .table-control {
        margin-left: 18px;
      }
    }
  }
</style>