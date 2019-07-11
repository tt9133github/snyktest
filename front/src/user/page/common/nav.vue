<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="path in paths">
      {{path}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "nav",
    data() {
      return {
        paths: ['首页','搜索','Spring']
      }
    }
  }
</script>

<style scoped>

</style>
