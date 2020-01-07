<template>
  <div class="theme-modal">
    <el-dialog v-bind="$attrs"
               title="选择主题"
               width="550px"
               v-on="$listeners"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :modal="false"
               :show-close="false">
      <div class="theme-list-wrapper">
        <div class="theme-block" v-for="theme in themeList" :key="theme.value">
          <label class="theme-radio" :class="radioClassList(theme)">
            <input type="radio" v-model="checked" :value="theme.value"/>
            <span class="xv" v-text="theme.title"/>
            <i class="marker">
              <i class="el-icon-check"/>
            </i>
          </label>
        </div>
      </div>
      <div slot="footer">
        <el-button size="mini" type="app" @click="handleBtnClick('ok')">确定</el-button>
        <el-button size="mini" @click="handleBtnClick('cancel')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {configAction} from '@/database-api'
  import {THEME_KEY} from "@/constant"

  export default {
    data() {
      return {
        checked: this.$store.getters.getTheme,
        themeList: [
          {title: '中国红', value: 'theme-red'},
          {title: '炫酷黑', value: 'theme-dark'},
          {title: '清新绿', value: 'theme-green'},
          {title: '活力橙', value: 'theme-orange'},
          {title: '明亮蓝', value: 'theme-blue'},
          {title: '基佬紫', value: 'theme-purple'},
        ]
      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        const theme = await configAction.getConfig(THEME_KEY)
        if (theme) {
          this.checked = theme.value
        }
      },
      radioClassList(theme) {
        const arr = [theme.value]
        if (this.checked === theme.value) {
          arr.push('active')
        }
        return arr
      },
      handleBtnClick(target) {
        this.$emit(target, this.checked)
      },
    }
  }
</script>

<style scoped lang="scss">

  .theme-modal {
    .theme-list-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .theme-block {
        display: flex;
        flex: 1;
        padding: 5px;
        justify-content: center;
      }

      .theme-radio {
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 80px;
        position: relative;
        cursor: pointer;
        user-select: none;
        color: #fff;
        letter-spacing: 3px;
        font-size: 18px;
        box-shadow: 0 0 4px #8c8c8c;
        overflow: hidden;

        &.active {
          .marker {
            display: block;
          }
        }

        input[type=radio] {
          position: absolute;
          opacity: 0;
        }

        .marker {
          display: none;
          position: absolute;
          right: 0;
          bottom: 0;
          border-bottom-width: 35px;
          border-bottom-style: solid;
          border-left: 35px solid transparent;
          font-size: 20px;

          .el-icon-check {
            position: absolute;
            color: #fff;
            right: -1px;
            bottom: -34px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>