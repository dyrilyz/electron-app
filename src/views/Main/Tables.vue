<template>
  <div class="page-container tables">
    <div class="search-wrapper">
      <el-button size="mini" type="app" icon="el-icon-plus" @click="openModal('添加表')">添加表</el-button>
    </div>
    <dy-table :columns="columns" :data="tableList">
      <template v-slot:ctrl="{scope}">
        <i class="table-control theme-color el-icon-edit" @click="openModal('编辑表')"/>
        <pop-confirm class="table-control" title="确定要删除这张表吗？" @on-confirm="deleteTable(scope)">
          <i slot="reference" class="theme-color el-icon-delete"/>
        </pop-confirm>
      </template>
    </dy-table>
  </div>
</template>

<script>
  import DyTable from "@/components/DyTable"
  import {dateTime, urlResolver} from "@/util"
  import PopConfirm from "@/components/PopConfirm"

  function timeFilter({createTime}) {
    if (createTime) {
      return dateTime(createTime)
    }
    return createTime
  }

  export default {
    name: "Tables",
    components: {PopConfirm, DyTable},
    computed: {
      tableList() {
        return this.$store.getters['tableModal/getTableList']
      }
    },
    data() {
      return {
        columns: [
          {label: 'id', prop: 'id'},
          {label: '表名', prop: 'tableName'},
          {label: '创建时间', prop: 'createTime', filter: timeFilter},
          {label: '注释', prop: 'tableComment'},
          {label: '操作', slotName: 'ctrl', align: 'center'},
        ],
        addModalVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      openModal(title) {
        const route = {name: 'table-modal', query: {title}}
        const url = urlResolver(this, route)
        this.$store.dispatch('tableModal/openSettings', {url})
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

      + .table-control {
        margin-left: 15px;
      }
    }
  }
</style>