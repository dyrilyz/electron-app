<template>
  <div class="home">
    <div class="page-title">Proxy Servers</div>
    <div class="page-content">
      <el-row :gutter="15">
        <el-col v-bind="cardLayout" v-for="item in list">
          <div class="server-card entity">
            <div class="card-title">{{item.server_name}}</div>
            <div>local path: {{item.local_path}}</div>
            <div>origin path: {{item.origin_path}}</div>

            <div class="actions">
              <a class="action-link">start</a>
              <a class="action-link" @click="handleEdit(item)">edit</a>
              <a class="action-link" @click="handleRemove(item.id)">remove</a>
            </div>
          </div>
        </el-col>
        <el-col v-bind="cardLayout">
          <div class="server-card new-proxy" @click="handleAdd"><i class="iconfont icon-jia"/></div>
        </el-col>
      </el-row>
    </div>
    <server-modal ref="modalForm" @modal-ok="handleModalOk"/>
  </div>
</template>

<script>
  import express from 'express'
  import {createProxyMiddleware} from 'http-proxy-middleware'
  import ServerModal from '@/views/modules/server-modal'
  import {getServerList, removeServer} from '@/util/api'

  export default {
    name: 'home',
    components: {ServerModal},
    data() {
      return {
        list: [],
        app: null,
        cardLayout: {
          span: 8,
        },
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.list = getServerList()
      },
      handleAdd() {
        this.$refs.modalForm.title = 'add'
        this.$refs.modalForm.type = 'add'
        this.$refs.modalForm.add()
      },
      handleEdit(record) {
        this.$refs.modalForm.title = 'edit'
        this.$refs.modalForm.type = 'edit'
        this.$refs.modalForm.edit(JSON.parse(JSON.stringify(record)))
      },
      handleModalOk() {
        this.loadData()
      },
      handleRemove(id) {
        removeServer(id)
        this.loadData()
      },
      handleStart() {
        if (!this.app) {
          this.app = express()
          this.app.use('/api', createProxyMiddleware({target: 'http://www.example.org', changeOrigin: true}))
          this.app.listen(80)
          console.log('start')
        }
      },
      handleStop() {
      },
    },
  }
</script>
<style lang="scss">
  .home {
    padding: 20px;

    .page-title {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .new-proxy {
      justify-content: center;
      cursor: pointer;
      align-items: center;
      flex-direction: row;

      .iconfont {
        font-size: 40px;
      }
    }

    .server-card {
      background-color: #eee;
      border-radius: 3px;
      box-shadow: 0 0 3px #bbb;
      padding: 8px;
      height: 180px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .card-title {
      margin-bottom: 10px;
      font-size: 20px;
    }

    .actions {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 5px;
      background-color: rgba(0, 0, 0, .6);
      display: flex;
      justify-content: space-around;

      .action-link {
        color: #ccc;
        cursor: pointer;
        transition: all .2s;

        &:hover {
          color: #fff;
        }
      }
    }
  }
</style>
