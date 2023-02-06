<template>
  <main id="admin-main-box">
    <Nav />
    <router-view />
  </main>
</template>
<script>
import Nav from "./Nav";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { Nav },
};
</script>
<style scoped lang="less">

</style>
