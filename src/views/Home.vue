<template>
  <div class="home">
    <div class="page-title">代理实例</div>
    <div class="page-content">
      <el-row :gutter="15" type="flex">
        <el-col v-bind="cardLayout">
          <div class="server-card">
            <div class="card-title">实例A</div>
            <div>本地服务</div>
            <div>代理服务</div>
          </div>
        </el-col>
        <el-col v-bind="cardLayout">
          <div class="server-card">1</div>
        </el-col>
        <el-col v-bind="cardLayout">
          <div class="server-card">1</div>
        </el-col>
        <el-col v-bind="cardLayout">
          <div class="server-card new-proxy"><i class="iconfont icon-jia"/></div>
        </el-col>
      </el-row>
    </div>
    <!--<el-row type="flex" class="row-bg">
      <el-col :span="12" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="访问路径">
            <el-input v-model="form.url"/>
          </el-form-item>
          <el-form-item label="本地路径">
            <el-input v-model="form.target"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleStart">启动</el-button>
            <el-button type="danger" @click="handleStop">停止</el-button>
            <el-button @click="handleStop">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  import express from 'express'
  import {createProxyMiddleware} from 'http-proxy-middleware'

  export default {
    name: 'home',
    components: {},
    data() {
      return {
        form: {},
        app: null,
        cardLayout: {
          span: 6
        }
      }
    },
    methods: {
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
    }
  }
</script>
<style lang="scss">
  .home {
    padding: 20px;

    .page-title {
      font-size: 22px;
      font-weight: 600;
    }

    .new-proxy {
      justify-content: center;
      cursor: pointer;
      align-items: center;
      flex-direction: row;

      .iconfont {
        font-size: 30px;
      }
    }

    .server-card {
      background-color: #eee;
      border-radius: 3px;
      box-shadow: 0 0 3px #bbb;
      padding: 8px;
      height: 120px;
      display: flex;
      flex-direction: column;
    }

    .card-title {
      font-size: 20px;
    }
  }
</style>
