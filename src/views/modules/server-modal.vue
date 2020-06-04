<template>
  <el-dialog :title="title" :visible.sync="show" width="500">
    <el-form :model="model" label-width="100px">
      <el-form-item label="server name">
        <el-input v-model="model.server_name" placeholder="server name"/>
      </el-form-item>
      <el-form-item label="local path">
        <el-input v-model="model.local_path" placeholder="http://example.com"/>
      </el-form-item>
      <el-form-item label="origin path">
        <el-input v-model="model.origin_path" placeholder="http://example.com"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="app" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addServer, editServer} from '@/util/api'

  export default {
    name: 'server-modal',
    data() {
      return {
        title: '新建',
        show: false,
        type: 'add',
        model: {},
      }
    },
    mounted() {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.model = record
        this.show = true
      },
      close() {
        this.model = {}
        this.show = false
      },
      handleOk() {
        console.log(this.model)
        if (this.type === 'add') {
          addServer(this.model)
        } else if (this.type === 'edit') {
          editServer(this.model)
        }
        this.$emit('modal-ok')
        this.close()
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
