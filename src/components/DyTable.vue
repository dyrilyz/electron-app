<template>
  <div>
    <el-table v-bind="$attrs" v-on="$listeners" size="mini">
      <el-table-column v-for="(item,key) in columns" :key="key" v-bind="item">
        <template v-if="item.slotName" v-slot="scope">
          <slot :name="item.slotName" :scope="scope"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "DyTable",
    props: {
      columns: {
        type: Array,
        required: true
      }
    },
    created() {
    },
  }
</script>
