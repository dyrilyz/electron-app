<template>
  <div class="nav">
    <dl class="root-nav" v-for="(item,key) in list" :key="key">
      <dt v-text="item.top"/>
      <dd v-for="(router,index) in item.routers" :key="index">
        <router-link class="router-link" :to="{name:router.name}" v-text="router.meta.title"/>
      </dd>
    </dl>
  </div>
</template>

<script>
  import {mainRouter} from "@/router"
  import {copy} from "@/util"

  // 侧边导航栏
  export default {
    name: "Nav",
    data() {
      return {
        list: []
      }
    },
    mounted() {
      const menu = copy(mainRouter.children)
      const tops = Object.assign({}, ...(menu.map(({meta}) => ({[meta.topTitle]: []}))))
      menu.forEach(item => tops[item.meta.topTitle].push(item))
      for (const key in tops) {
        this.list.push({top: key, routers: tops[key]})
      }
    }
  }
</script>

<style scoped lang="scss">
  .nav {
    .root-nav {
      margin: 0;

      dt {
        padding: 10px 10px 3px;
        font-size: 12px;
        min-height: 20px;
      }

      dd {
        margin: 0;

        .router-link {
          display: block;
          border-left: 3px solid transparent;
          padding: 0 20px;
          line-height: 30px;
          color: #000;
          text-decoration: none;

          &.router-link-active {
            background-color: #e6e7ea;
          }
        }
      }
    }
  }
</style>
