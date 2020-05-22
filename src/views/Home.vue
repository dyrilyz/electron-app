<template>
  <div class="home">
    <el-row type="flex" class="row-bg">
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
    </el-row>
  </div>
</template>

<script>
  // const express = require('express')
  // const {createProxyMiddleware} = require('http-proxy-middleware')

  export default {
    name: 'home',
    components: {},
    data() {
      return {
        form: {},
        app: null
      }
    },
    methods: {
      handleStart() {
        console.log(require('express'))
        if (!this.app) {
          // this.app = express()
          // this.app.use('/api', createProxyMiddleware({target: 'http://www.example.org', changeOrigin: true}))
          // this.app.listen(80)
        }
      },
      handleStop() {
      },
    }
  }
</script>
<style lang="scss">
  .home {
    padding: 20px 0;
  }
</style>
