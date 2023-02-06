<template>
  <main id="main-box">
    <header class="button">
      <button @click="audit()">审核信息</button>
      <button>管理用户</button>
      <button>删除课程</button>
    </header>
  </main>
</template>
<script>
export default {
  name: "User",
  data() {
    return {}
  },
  methods: {
    audit() {
      this.$router.push("/admin/user/audit")
    }
  }
}
</script>
<style scoped lang="less">

</style>